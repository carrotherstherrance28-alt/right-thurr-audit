export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const ownerEmails = (process.env.OWNER_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const authorization = request.headers.authorization || '';

  if (!supabaseUrl || !supabaseAnonKey || ownerEmails.length === 0) {
    response.status(503).json({ allowed: false, error: 'Owner access is not configured.' });
    return;
  }

  if (!authorization.startsWith('Bearer ')) {
    response.status(401).json({ allowed: false, error: 'Missing owner session.' });
    return;
  }

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: authorization,
    },
  });

  if (!userResponse.ok) {
    response.status(401).json({ allowed: false, error: 'Invalid owner session.' });
    return;
  }

  const user = await userResponse.json();
  const email = (user.email || '').toLowerCase();
  const allowed = ownerEmails.includes(email);

  response.status(allowed ? 200 : 403).json({ allowed });
}
