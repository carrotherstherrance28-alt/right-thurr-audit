const requiredFields = [
  ['lead', 'name'],
  ['lead', 'email'],
  ['intake', 'business_idea'],
  ['intake', 'industry'],
  ['intake', 'main_goal'],
];

function getNestedValue(source, path) {
  return path.reduce((value, key) => value?.[key], source);
}

function getPayload(request) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body);
  }

  return request.body || {};
}

function mapBuildoutPayloadToSupabaseRow(payload) {
  return {
    source: payload.source || 'right-thurr-buildout-page',
    brand: payload.brand || 'right-thurr',
    name: payload.lead.name,
    email: payload.lead.email,
    phone: payload.lead.phone,
    website_or_social: payload.lead.website_or_social,
    business_idea: payload.intake.business_idea,
    industry: payload.intake.industry,
    main_goal: payload.intake.main_goal,
    location: payload.intake.location,
    budget_level: payload.intake.budget_level,
    timeline: payload.intake.timeline,
    biggest_bottleneck: payload.intake.biggest_bottleneck,
    report_type: payload.routing?.report_type || 'right-thurr-autopilot-blueprint',
    status: 'requested',
  };
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use POST to submit a buildout request.',
    });
    return;
  }

  const payload = getPayload(request);
  const missingFields = requiredFields.filter((path) => !getNestedValue(payload, path));

  if (missingFields.length > 0) {
    sendJson(response, 400, {
      ok: false,
      status: 'validation_error',
      message: 'Name, email, business idea, industry, and main goal are required.',
    });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const supabaseElevatedKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  const supabaseServerKey = supabaseElevatedKey || supabaseAnonKey;
  const preferHeader = supabaseElevatedKey ? 'return=representation' : 'return=minimal';

  if (!supabaseUrl || !supabaseServerKey) {
    sendJson(response, 500, {
      ok: false,
      status: 'missing_configuration',
      message: 'Supabase intake is not configured.',
    });
    return;
  }

  const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/buildout_requests`, {
    method: 'POST',
    headers: {
      apikey: supabaseServerKey,
      Authorization: `Bearer ${supabaseServerKey}`,
      'Content-Type': 'application/json',
      Prefer: preferHeader,
    },
    body: JSON.stringify(mapBuildoutPayloadToSupabaseRow(payload)),
  });

  if (!supabaseResponse.ok) {
    sendJson(response, 502, {
      ok: false,
      status: 'supabase_error',
      message: 'Blueprint could not be queued.',
    });
    return;
  }

  const savedRows = supabaseElevatedKey ? await supabaseResponse.json() : [];
  const savedRequest = Array.isArray(savedRows) ? savedRows[0] : null;

  sendJson(response, 201, {
    ok: true,
    status: 'queued',
    message: 'Blueprint request saved.',
    buildout_request_id: savedRequest?.id,
  });
}
