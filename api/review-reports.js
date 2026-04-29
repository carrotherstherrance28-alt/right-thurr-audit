function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
    elevatedKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
  };
}

function getOwnerEmails() {
  return (process.env.OWNER_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function verifyOwner(request) {
  const { url, anonKey } = getSupabaseConfig();
  const ownerEmails = getOwnerEmails();
  const authorization = request.headers.authorization || '';

  if (!url || !anonKey || ownerEmails.length === 0) {
    return { ok: false, statusCode: 503, message: 'Owner report review is not configured.' };
  }

  if (!authorization.startsWith('Bearer ')) {
    return { ok: false, statusCode: 401, message: 'Missing owner session.' };
  }

  const userResponse = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: authorization,
    },
  });

  if (!userResponse.ok) {
    return { ok: false, statusCode: 401, message: 'Invalid owner session.' };
  }

  const user = await userResponse.json();
  const email = (user.email || '').toLowerCase();

  if (!ownerEmails.includes(email)) {
    return { ok: false, statusCode: 403, message: 'This account is not on the owner allowlist.' };
  }

  return { ok: true, email };
}

async function supabaseRequest(path, options = {}) {
  const { url, elevatedKey } = getSupabaseConfig();

  if (!url || !elevatedKey) {
    throw new Error('Supabase elevated-key persistence is not configured.');
  }

  const supabaseResponse = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: elevatedKey,
      Authorization: `Bearer ${elevatedKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!supabaseResponse.ok) {
    const detail = await supabaseResponse.text();
    throw new Error(`Supabase ${path} failed: ${supabaseResponse.status} ${detail}`);
  }

  return supabaseResponse.json();
}

async function getRowsByIds(table, ids, select = '*') {
  const cleanIds = [...new Set(ids.filter(Boolean))];

  if (cleanIds.length === 0) {
    return new Map();
  }

  const rows = await supabaseRequest(
    `${table}?id=in.(${cleanIds.map((id) => encodeURIComponent(id)).join(',')})&select=${encodeURIComponent(select)}`,
  );

  return new Map(rows.map((row) => [row.id, row]));
}

async function getBuildoutRequestRows(ids) {
  return getRowsByIds(
    'buildout_requests',
    ids,
    'id,name,email,industry,main_goal,status,lead_status,crm_tags,last_activity_at,created_at,updated_at',
  ).catch(() =>
    getRowsByIds(
      'buildout_requests',
      ids,
      'id,name,email,industry,main_goal,status,created_at,updated_at',
    ),
  );
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use GET to list reports waiting for operator review.',
    });
    return;
  }

  const owner = await verifyOwner(request);

  if (!owner.ok) {
    sendJson(response, owner.statusCode, {
      ok: false,
      status: 'unauthorized',
      message: owner.message,
    });
    return;
  }

  try {
    const reports = await supabaseRequest(
      'generated_reports?report_status=in.(needs_review,approved_for_delivery)&select=id,buildout_request_id,system_id,title,report_status,summary,created_by_agent,created_at,updated_at&order=updated_at.desc&limit=8',
    );
    const requestRows = await getBuildoutRequestRows(reports.map((report) => report.buildout_request_id));
    const systemRows = await getRowsByIds(
      'systems',
      reports.map((report) => report.system_id),
      'id,name,status,current_mission,next_move,build_progress',
    );

    sendJson(response, 200, {
      ok: true,
      reviewed_by: owner.email,
      reports: reports.map((report) => ({
        ...report,
        request: requestRows.get(report.buildout_request_id) || null,
        system: systemRows.get(report.system_id) || null,
      })),
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      status: 'review_reports_error',
      message: 'Review reports could not be loaded.',
      detail: error.message,
    });
  }
}
