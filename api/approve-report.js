import { postSlackAlert } from './_slack.js';

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function getPayload(request) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body);
  }

  return request.body || {};
}

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
    elevatedKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
  };
}

function getApprovalSecret() {
  return process.env.REPORT_APPROVAL_SECRET || process.env.THURNOS_SHARED_SECRET;
}

function getOwnerEmails() {
  return (process.env.OWNER_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getOwnerAuthMode() {
  return process.env.OWNER_AUTH_MODE || 'supabase';
}

function supabaseHeaders(elevatedKey, prefer = 'return=representation') {
  return {
    apikey: elevatedKey,
    Authorization: `Bearer ${elevatedKey}`,
    'Content-Type': 'application/json',
    Prefer: prefer,
  };
}

async function supabaseRequest(path, options = {}) {
  const { url, elevatedKey } = getSupabaseConfig();

  if (!url || !elevatedKey) {
    throw new Error('Supabase elevated-key persistence is not configured.');
  }

  const supabaseResponse = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...supabaseHeaders(elevatedKey, options.prefer),
      ...(options.headers || {}),
    },
  });

  if (!supabaseResponse.ok) {
    const detail = await supabaseResponse.text();
    throw new Error(`Supabase ${path} failed: ${supabaseResponse.status} ${detail}`);
  }

  if (options.prefer === 'return=minimal' || supabaseResponse.status === 204) {
    return null;
  }

  return supabaseResponse.json();
}

async function verifyOwner(request) {
  const { url, anonKey } = getSupabaseConfig();
  const ownerEmails = getOwnerEmails();
  const authorization = request.headers.authorization || '';

  if (getOwnerAuthMode() === 'preview') {
    return true;
  }

  if (!url || !anonKey || ownerEmails.length === 0) {
    return false;
  }

  if (!authorization.startsWith('Bearer ')) {
    return false;
  }

  const userResponse = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: authorization,
    },
  });

  if (!userResponse.ok) {
    return false;
  }

  const user = await userResponse.json();
  return ownerEmails.includes((user.email || '').toLowerCase());
}

async function getSingleRow(path, missingMessage) {
  const rows = await supabaseRequest(path, { method: 'GET' });
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row) {
    throw new Error(missingMessage);
  }

  return row;
}

async function patchRows(path, row) {
  await supabaseRequest(path, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: JSON.stringify({
      ...row,
      updated_at: new Date().toISOString(),
    }),
  });
}

async function patchCrmFields(buildoutRequestId, row) {
  await patchRows(`buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}`, {
    ...row,
    last_activity_at: new Date().toISOString(),
  }).catch(() => null);
}

async function insertActivityLog(row) {
  const rows = await supabaseRequest('activity_logs', {
    method: 'POST',
    body: JSON.stringify(row),
  });

  return Array.isArray(rows) ? rows[0] : null;
}

function buildEmail({ report, request }) {
  const firstName = String(request.name || 'there').split(' ')[0];
  const subject = 'Your Thurr Autopilot Blueprint is ready';
  const text = [
    `Hey ${firstName},`,
    '',
    'Your Thurr Autopilot Blueprint has been reviewed and is ready.',
    '',
    report.summary || 'The blueprint maps the first business system to build, the funnel path, automation needs, and the next execution step.',
    '',
    'The next move is execution. Reply to this email when you are ready to review the buildout path.',
    '',
    'We build. You profit.',
    '',
    'Thurr Solutions',
  ].join('\n');

  return { subject, text };
}

async function sendEmailWithResend({ report, request }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_EMAIL_FROM || process.env.FROM_EMAIL;
  const replyTo = process.env.REPORT_EMAIL_REPLY_TO || from;

  if (!apiKey || !from) {
    return {
      status: 'skipped_missing_email_configuration',
      provider: 'resend',
    };
  }

  const email = buildEmail({ report, request });
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: request.email,
      reply_to: replyTo,
      subject: email.subject,
      text: email.text,
    }),
  });

  const responseBody = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    return {
      status: 'email_failed',
      provider: 'resend',
      detail: responseBody.message || `Resend returned ${resendResponse.status}`,
    };
  }

  return {
    status: 'sent',
    provider: 'resend',
    message_id: responseBody.id,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use POST to approve and optionally deliver a report.',
    });
    return;
  }

  const approvalSecret = getApprovalSecret();
  const providedSecret = request.headers['x-report-approval-secret'] || request.headers['x-thurnos-secret'];
  const hasValidSecret = approvalSecret && providedSecret === approvalSecret;
  const hasOwnerAccess = hasValidSecret ? false : await verifyOwner(request);

  if (!hasValidSecret && !hasOwnerAccess) {
    sendJson(response, 401, {
      ok: false,
      status: 'unauthorized',
      message: 'Missing or invalid report approval secret.',
    });
    return;
  }

  try {
    const body = getPayload(request);
    const reportId = body.report_id || body.reportId || body.generated_report_id || body.generatedReportId;
    const sendEmail = body.send_email === true || body.sendEmail === true;

    if (!reportId) {
      sendJson(response, 400, {
        ok: false,
        status: 'validation_error',
        message: 'report_id is required.',
      });
      return;
    }

    const report = await getSingleRow(
      `generated_reports?id=eq.${encodeURIComponent(reportId)}&select=*`,
      'Generated report was not found.',
    );
    const buildoutRequestId = report.buildout_request_id;
    const requestRow = await getSingleRow(
      `buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}&select=*`,
      'Buildout request was not found.',
    );

    await patchRows(`generated_reports?id=eq.${encodeURIComponent(reportId)}`, {
      report_status: 'approved_for_delivery',
    });
    await patchRows(`buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}`, {
      status: 'approved_for_delivery',
    });
    await patchCrmFields(buildoutRequestId, {
      lead_status: sendEmail ? 'delivery_requested' : 'approved_for_follow_up',
      crm_tags: sendEmail
        ? ['blueprint-approved', 'delivery-requested']
        : ['blueprint-approved', 'approved-for-follow-up'],
    });

    await insertActivityLog({
      system_id: report.system_id,
      buildout_request_id: buildoutRequestId,
      agent_name: 'Operator Agent',
      action_type: 'report_approved_for_delivery',
      summary: sendEmail
        ? 'Blueprint report was approved and queued for email delivery.'
        : 'Blueprint report was approved for delivery. Email was not sent.',
      status: 'completed',
    });

    await insertActivityLog({
      system_id: report.system_id,
      buildout_request_id: buildoutRequestId,
      agent_name: 'CRM Agent',
      action_type: 'crm_tag_applied',
      summary: sendEmail
        ? 'Lead tagged: blueprint-approved, delivery-requested'
        : 'Lead tagged: blueprint-approved, approved-for-follow-up',
      status: 'completed',
    });

    await postSlackAlert({
      text: 'Blueprint approved.',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              '*Blueprint approved*',
              `Report ID: \`${reportId}\``,
              `Request ID: \`${buildoutRequestId}\``,
              `Delivery: \`${sendEmail ? 'send_requested' : 'approval_only'}\``,
            ].join('\n'),
          },
        },
      ],
    }).catch(() => null);

    const emailDelivery = sendEmail
      ? await sendEmailWithResend({ report, request: requestRow })
      : { status: 'not_requested' };

    if (sendEmail && emailDelivery.status === 'sent') {
      await patchRows(`generated_reports?id=eq.${encodeURIComponent(reportId)}`, {
        report_status: 'delivered',
      });
      await patchRows(`buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}`, {
        status: 'delivered',
      });
      await patchCrmFields(buildoutRequestId, {
        lead_status: 'report_delivered',
        crm_tags: ['report-delivered', 'follow-up-needed'],
      });

      await insertActivityLog({
        system_id: report.system_id,
        buildout_request_id: buildoutRequestId,
        agent_name: 'Delivery Agent',
        action_type: 'report_email_sent',
        summary: 'Approved blueprint report email was sent to the prospect.',
        status: 'completed',
      });
      await insertActivityLog({
        system_id: report.system_id,
        buildout_request_id: buildoutRequestId,
        agent_name: 'CRM Agent',
        action_type: 'crm_tag_applied',
        summary: 'Lead tagged: report-delivered, follow-up-needed',
        status: 'completed',
      });

      await postSlackAlert({
        text: 'Blueprint delivered.',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: ['*Blueprint delivered*', `Report ID: \`${reportId}\``, `Request ID: \`${buildoutRequestId}\``].join(
                '\n',
              ),
            },
          },
        ],
      }).catch(() => null);
    } else if (sendEmail) {
      await patchCrmFields(buildoutRequestId, {
        lead_status: 'delivery_needs_attention',
        crm_tags: ['delivery-needs-attention'],
      });
      await insertActivityLog({
        system_id: report.system_id,
        buildout_request_id: buildoutRequestId,
        agent_name: 'Delivery Agent',
        action_type: 'report_email_delivery_skipped',
        summary: emailDelivery.detail || 'Email delivery was requested but could not be completed.',
        status: 'needs_attention',
      });
    }

    sendJson(response, 200, {
      ok: true,
      status: sendEmail && emailDelivery.status === 'sent' ? 'approved_and_sent' : 'approved_for_delivery',
      report_id: reportId,
      buildout_request_id: buildoutRequestId,
      email_delivery: emailDelivery,
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      status: 'report_approval_error',
      message: 'Report could not be approved or delivered.',
      detail: error.message,
    });
  }
}
