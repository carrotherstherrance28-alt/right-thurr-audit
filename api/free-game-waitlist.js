const interestAreas = new Set(['AI tools', 'Fitness', 'Travel', 'Money', 'Content', 'Business', 'Network']);
const requiredFields = ['name', 'email', 'interest_area', 'put_on_request'];

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

function cleanText(value, maxLength = 500) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

function cleanEmail(value) {
  return cleanText(value, 254).toLowerCase();
}

function cleanPhone(value) {
  return String(value || '')
    .trim()
    .replace(/[^\d+().\-\s]/g, '')
    .slice(0, 32);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isChecked(value) {
  return value === true || value === 'true' || value === 'on' || value === '1' || value === 'yes';
}

function mapPayloadToRow(payload) {
  const phone = cleanPhone(payload.phone);
  const smsOptIn = isChecked(payload.sms_opt_in);

  return {
    name: cleanText(payload.name, 120),
    email: cleanEmail(payload.email),
    phone: phone && smsOptIn ? phone : null,
    sms_opt_in: Boolean(phone && smsOptIn),
    interest_area: cleanText(payload.interest_area, 80),
    put_on_request: cleanText(payload.put_on_request, 700),
    source: cleanText(payload.source, 120) || 'thurr-link-hub',
    page_path: cleanText(payload.page_path, 200),
    referrer: cleanText(payload.referrer, 500),
    status: 'new',
  };
}

async function postOwnerAlert({ webhookUrl, row, waitlistId }) {
  if (!webhookUrl) {
    return false;
  }

  const text = [
    'New Right Thurr Free Game waitlist signup',
    waitlistId ? `Waitlist ID: ${waitlistId}` : null,
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    `Interest: ${row.interest_area}`,
    `Put-on request: ${row.put_on_request}`,
    row.sms_opt_in ? 'SMS opt-in: yes' : 'SMS opt-in: no',
  ]
    .filter(Boolean)
    .join('\n');

  const webhookResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text, text }),
  });

  return webhookResponse.ok;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use POST to join the Free Game list.',
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

  if (cleanText(payload.company_website)) {
    sendJson(response, 201, {
      ok: true,
      status: 'queued',
      message: 'You are on the Free Game list.',
    });
    return;
  }

  const row = mapPayloadToRow(payload);
  const missingFields = requiredFields.filter((field) => !row[field]);

  if (missingFields.length > 0) {
    sendJson(response, 400, {
      ok: false,
      status: 'validation_error',
      message: 'Name, email, interest area, and put-on request are required.',
    });
    return;
  }

  if (!isValidEmail(row.email)) {
    sendJson(response, 400, {
      ok: false,
      status: 'invalid_email',
      message: 'Use a valid email address.',
    });
    return;
  }

  if (!interestAreas.has(row.interest_area)) {
    sendJson(response, 400, {
      ok: false,
      status: 'invalid_interest_area',
      message: 'Choose one Free Game lane.',
    });
    return;
  }

  if (cleanPhone(payload.phone) && !isChecked(payload.sms_opt_in)) {
    sendJson(response, 400, {
      ok: false,
      status: 'sms_consent_required',
      message: 'Check the text opt-in box before adding a phone number, or leave phone blank.',
    });
    return;
  }

  if (process.env.FREE_GAME_WAITLIST_DRY_RUN === 'true') {
    sendJson(response, 201, {
      ok: true,
      status: 'queued',
      message: 'Free Game waitlist signup validated.',
      dry_run: true,
    });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    sendJson(response, 500, {
      ok: false,
      status: 'missing_configuration',
      message: 'Free Game waitlist storage is not configured.',
    });
    return;
  }

  const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/free_game_waitlist`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
  });

  if (!supabaseResponse.ok) {
    const errorBody = await supabaseResponse.text().catch(() => '');
    console.error('Free Game waitlist Supabase insert failed', {
      status: supabaseResponse.status,
      body: errorBody.slice(0, 500),
    });

    sendJson(response, 502, {
      ok: false,
      status: 'supabase_error',
      message: 'Free Game waitlist signup could not be saved.',
    });
    return;
  }

  const savedRows = await supabaseResponse.json().catch(() => []);
  const savedRequest = Array.isArray(savedRows) ? savedRows[0] : null;
  const alertWebhook = process.env.FREE_GAME_WAITLIST_WEBHOOK_URL || process.env.DISCORD_OWNER_WEBHOOK_URL;
  const alerted = await postOwnerAlert({
    webhookUrl: alertWebhook,
    row,
    waitlistId: savedRequest?.id,
  }).catch(() => false);

  sendJson(response, 201, {
    ok: true,
    status: 'queued',
    message: 'You are on the Free Game list.',
    waitlist_id: savedRequest?.id,
    alerted,
  });
}
