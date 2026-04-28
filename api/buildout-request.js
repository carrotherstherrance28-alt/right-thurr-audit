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

function mapBuildoutPayloadToSupabaseRow(payload) {
  return {
    source: payload.source,
    brand: payload.brand,
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
    report_type: payload.routing.report_type,
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

  const payload = request.body;
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

  if (!supabaseUrl || !supabaseAnonKey) {
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
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
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

  sendJson(response, 201, {
    ok: true,
    status: 'queued',
    message: 'Blueprint request saved.',
  });
}
