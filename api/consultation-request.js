const monthlyLeadOptions = new Set(['<25', '25–100', '100–500', '500+', 'Not sure']);
const requiredFields = [
  'business_name',
  'owner_name',
  'email',
  'business_url',
  'monthly_leads_estimate',
  'frustration_text',
];

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function getPayload(request) {
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body || '{}');
    } catch {
      return null;
    }
  }

  return request.body || {};
}

function cleanText(value) {
  return String(value || '').trim();
}

function mapPayloadToRow(payload) {
  return {
    business_name: cleanText(payload.business_name),
    owner_name: cleanText(payload.owner_name),
    email: cleanText(payload.email).toLowerCase(),
    business_url: cleanText(payload.business_url),
    monthly_leads_estimate: cleanText(payload.monthly_leads_estimate),
    frustration_text: cleanText(payload.frustration_text),
    status: 'new',
  };
}

async function postOwnerAlert({ webhookUrl, row, requestId }) {
  if (!webhookUrl) {
    return false;
  }

  const text = [
    'New Consultation Request',
    requestId ? `Request ID: ${requestId}` : null,
    `Business: ${row.business_name}`,
    `Owner: ${row.owner_name} <${row.email}>`,
    `URL: ${row.business_url}`,
    `Volume: ${row.monthly_leads_estimate}`,
    `Frustration: ${row.frustration_text}`,
  ]
    .filter(Boolean)
    .join('\n');

  const webhookResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text, text }),
  });

  if (!webhookResponse.ok) {
    console.warn('Consultation request owner alert returned non-OK status.', {
      requestId,
      status: webhookResponse.status,
    });
  }

  return webhookResponse.ok;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use POST to submit a consultation request.',
    });
    return;
  }

  const payload = getPayload(request);

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    sendJson(response, 400, {
      ok: false,
      status: 'invalid_json',
      message: 'Request body must be valid JSON.',
    });
    return;
  }

  const row = mapPayloadToRow(payload);
  const missingFields = requiredFields.filter((field) => !row[field]);

  if (missingFields.length > 0 || !monthlyLeadOptions.has(row.monthly_leads_estimate)) {
    sendJson(response, 400, {
      ok: false,
      status: 'validation_error',
      message: 'Business name, owner name, email, business URL, monthly lead volume, and lead-flow frustration are required.',
    });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    sendJson(response, 500, {
      ok: false,
      status: 'missing_configuration',
      message: 'Consultation request storage is not configured.',
    });
    return;
  }

  // The table name is legacy from the original offer. Rename only through a coordinated DB migration.
  const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/audit_requests`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      'Content-Profile': 'thurrsolutions',
      'Accept-Profile': 'thurrsolutions',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
  });

  if (!supabaseResponse.ok) {
    sendJson(response, 502, {
      ok: false,
      status: 'supabase_error',
      message: 'Consultation request could not be saved.',
    });
    return;
  }

  const savedRows = await supabaseResponse.json().catch(() => []);
  const savedRequest = Array.isArray(savedRows) ? savedRows[0] : null;
  const alertWebhook =
    process.env.CONSULTATION_REQUEST_WEBHOOK_URL ||
    process.env.AUDIT_REQUEST_WEBHOOK_URL ||
    process.env.DISCORD_OWNER_WEBHOOK_URL;
  const alerted = await postOwnerAlert({
    webhookUrl: alertWebhook,
    row,
    requestId: savedRequest?.id,
  }).catch((error) => {
    console.warn('Consultation request owner alert failed.', {
      requestId: savedRequest?.id,
      message: error instanceof Error ? error.message : 'Unknown alert error',
    });
    return false;
  });

  sendJson(response, 201, {
    ok: true,
    status: 'queued',
    message: 'Consultation request saved.',
    consultation_request_id: savedRequest?.id,
    audit_request_id: savedRequest?.id,
    alerted,
  });
}
