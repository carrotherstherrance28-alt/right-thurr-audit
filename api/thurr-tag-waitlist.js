const interestTypes = new Set([
  'Founders Edition',
  'Personalized',
  'Personalized Founders Edition',
  'Sticker Pack',
  'Corporate Gifting',
]);

const quantityRanges = new Set(['1', '2-5', '25+', '50+', '100+', 'Not sure']);
const requiredFields = ['email'];

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
  const interestType = cleanText(payload.interest_type, 80) || 'Founders Edition';
  const quantityRange = cleanText(payload.quantity_range, 40) || '1';

  return {
    name: cleanText(payload.name, 120) || 'Not provided',
    email: cleanEmail(payload.email),
    phone: phone && smsOptIn ? phone : null,
    sms_opt_in: Boolean(phone && smsOptIn),
    interest_type: interestType,
    founder_interest:
      isChecked(payload.founder_interest) ||
      interestType === 'Founders Edition' ||
      interestType === 'Personalized' ||
      interestType === 'Personalized Founders Edition',
    personalized_interest:
      isChecked(payload.personalized_interest) ||
      interestType === 'Personalized' ||
      interestType === 'Personalized Founders Edition',
    sticker_interest: isChecked(payload.sticker_interest) || interestType === 'Sticker Pack',
    corporate_interest: isChecked(payload.corporate_interest) || interestType === 'Corporate Gifting',
    company: cleanText(payload.company, 160) || null,
    quantity_range: quantityRange,
    notes: cleanText(payload.notes, 900),
    source: cleanText(payload.source, 120) || 'thurr-tag-page',
    utm_source: cleanText(payload.utm_source, 120) || null,
    utm_medium: cleanText(payload.utm_medium, 120) || null,
    utm_campaign: cleanText(payload.utm_campaign, 160) || null,
    utm_content: cleanText(payload.utm_content, 160) || null,
    audience_segment: cleanText(payload.audience_segment, 120) || null,
    outreach_type: cleanText(payload.outreach_type, 120) || null,
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
    'New Thurr Tag Founders List signup',
    waitlistId ? `Waitlist ID: ${waitlistId}` : null,
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    `Interest: ${row.interest_type}`,
    `Quantity: ${row.quantity_range}`,
    row.company ? `Company: ${row.company}` : null,
    row.notes ? `Notes: ${row.notes}` : null,
    row.utm_campaign ? `Campaign: ${row.utm_campaign}` : null,
    row.audience_segment ? `Segment: ${row.audience_segment}` : null,
    row.outreach_type ? `Outreach: ${row.outreach_type}` : null,
    row.sms_opt_in ? 'SMS opt-in: yes' : 'SMS opt-in: no',
    row.corporate_interest ? 'Corporate interest: yes' : 'Corporate interest: no',
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
      message: 'Use POST to join the Thurr Tag Founders List.',
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
      message: 'You are on the Thurr Tag Founders List.',
    });
    return;
  }

  const row = mapPayloadToRow(payload);
  const missingFields = requiredFields.filter((field) => !row[field]);

  if (missingFields.length > 0) {
    sendJson(response, 400, {
      ok: false,
      status: 'validation_error',
      message: 'Email is required to join the Thurr Tag Founders List.',
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

  if (!interestTypes.has(row.interest_type)) {
    sendJson(response, 400, {
      ok: false,
      status: 'invalid_interest_type',
      message: 'Choose one Thurr Tag interest type.',
    });
    return;
  }

  if (!quantityRanges.has(row.quantity_range)) {
    sendJson(response, 400, {
      ok: false,
      status: 'invalid_quantity_range',
      message: 'Choose a valid quantity range.',
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

  if (process.env.THURR_TAG_WAITLIST_DRY_RUN === 'true') {
    sendJson(response, 201, {
      ok: true,
      status: 'queued',
      message: 'Thurr Tag Founders List signup validated.',
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
      message: 'Thurr Tag waitlist storage is not configured.',
    });
    return;
  }

  const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/thurr_tag_waitlist`, {
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
      message: 'Thurr Tag Founders List signup could not be saved.',
    });
    return;
  }

  const savedRows = await supabaseResponse.json().catch(() => []);
  const savedRequest = Array.isArray(savedRows) ? savedRows[0] : null;
  const alertWebhook = process.env.THURR_TAG_WAITLIST_WEBHOOK_URL || process.env.DISCORD_OWNER_WEBHOOK_URL;
  const alerted = await postOwnerAlert({
    webhookUrl: alertWebhook,
    row,
    waitlistId: savedRequest?.id,
  }).catch(() => false);

  sendJson(response, 201, {
    ok: true,
    status: 'queued',
    message: 'You are on the Thurr Tag Founders List.',
    waitlist_id: savedRequest?.id,
    alerted,
  });
}
