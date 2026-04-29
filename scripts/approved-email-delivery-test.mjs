import fs from 'node:fs/promises';

async function loadEnvFile(path) {
  try {
    const raw = await fs.readFile(path, 'utf8');

    for (const line of raw.split('\n')) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split('=');

      if (!process.env[key]) {
        process.env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

async function postJson(url, body, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const responseBody = await response.json().catch(async () => ({ raw: await response.text() }));

  if (!response.ok) {
    throw new Error(`${url} failed ${response.status}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody;
}

async function supabaseGet(path) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL/VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SECRET_KEY are required.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });
  const responseBody = await response.json().catch(async () => ({ raw: await response.text() }));

  if (!response.ok) {
    throw new Error(`Supabase ${path} failed ${response.status}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody;
}

function buildPayload({ testEmail }) {
  const stamp = Date.now();

  return {
    source: 'codex-approved-email-delivery-test',
    brand: 'thurr',
    lead: {
      name: 'QA Delivery Test',
      email: testEmail || `qa-delivery-${stamp}@example.com`,
      website_or_social: 'https://example.com',
    },
    intake: {
      business_idea: 'Mobile detailing service that needs lead capture, quotes, and automatic follow-up.',
      industry: 'Automotive services',
      main_goal: 'Book more detailing jobs from missed online leads',
      location: 'Dallas, TX',
      budget_level: 'starter',
      timeline: '30 days',
      biggest_bottleneck: 'Manual follow-up and no clear intake system',
    },
    routing: {
      report_type: 'right-thurr-autopilot-blueprint',
    },
  };
}

await loadEnvFile('.env.local');

const baseUrl = getArg('base-url', process.env.APP_BASE_URL || 'https://right-thurr-audit.vercel.app');
const testEmail = getArg('email', process.env.REPORT_TEST_EMAIL);
const sendEmail = hasFlag('send-email') || process.env.REPORT_TEST_SEND_EMAIL === 'true';
const thurnosSecret = process.env.THURNOS_SHARED_SECRET;
const approvalSecret = process.env.REPORT_APPROVAL_SECRET || process.env.THURNOS_SHARED_SECRET;

if (!thurnosSecret) {
  throw new Error('THURNOS_SHARED_SECRET is required to generate the QA blueprint.');
}

if (!approvalSecret) {
  throw new Error('REPORT_APPROVAL_SECRET or THURNOS_SHARED_SECRET is required to approve the QA report.');
}

if (sendEmail && !testEmail) {
  throw new Error('Use --email=you@example.com or REPORT_TEST_EMAIL before running with --send-email.');
}

const payload = buildPayload({ testEmail });
const intake = await postJson(`${baseUrl}/api/buildout-request`, payload);
const buildoutRequestId = intake.buildout_request_id;

if (!buildoutRequestId) {
  throw new Error(`Buildout request id missing: ${JSON.stringify(intake)}`);
}

const blueprint = await postJson(
  `${baseUrl}/api/thurnos-blueprint`,
  {
    buildout_request_id: buildoutRequestId,
    manual_review: true,
    payload,
  },
  {
    'x-thurnos-secret': thurnosSecret,
  },
);
const reportId = blueprint.persistence?.generated_report_id || blueprint.generated_report_id || blueprint.report_id;

if (!reportId) {
  throw new Error(`Generated report id missing: ${JSON.stringify(blueprint)}`);
}

const approval = await postJson(
  `${baseUrl}/api/approve-report`,
  {
    report_id: reportId,
    send_email: sendEmail,
  },
  {
    'x-report-approval-secret': approvalSecret,
    'x-thurnos-secret': thurnosSecret,
  },
);

const [requestRow] = await supabaseGet(
  `buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}&select=id,status,email`,
);
const [reportRow] = await supabaseGet(`generated_reports?id=eq.${encodeURIComponent(reportId)}&select=id,report_status`);
const activityRows = await supabaseGet(
  `activity_logs?buildout_request_id=eq.${encodeURIComponent(buildoutRequestId)}&select=action_type,status&order=created_at.asc`,
);

console.log(
  JSON.stringify(
    {
      ok: true,
      base_url: baseUrl,
      send_email: sendEmail,
      buildout_request_id: buildoutRequestId,
      generated_report_id: reportId,
      request_status: requestRow?.status,
      report_status: reportRow?.report_status,
      email_delivery_status: approval.email_delivery?.status,
      email_provider: approval.email_delivery?.provider,
      activity_actions: activityRows.map((row) => `${row.action_type}:${row.status}`),
    },
    null,
    2,
  ),
);
