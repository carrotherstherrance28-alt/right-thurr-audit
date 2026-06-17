import handler from '../api/free-game-waitlist.js';

function createMockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(key, value) {
      this.headers[key.toLowerCase()] = value;
    },
    end(value) {
      this.body = value || '';
    },
  };
}

async function runCase({ request }) {
  const response = createMockResponse();
  await handler(request, response);

  let parsed = null;
  try {
    parsed = response.body ? JSON.parse(response.body) : null;
  } catch {
    parsed = null;
  }

  return {
    statusCode: response.statusCode,
    parsed,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

process.env.FREE_GAME_WAITLIST_DRY_RUN = 'true';

const validPayload = {
  name: 'Thurr Test',
  email: 'THURR.TEST@example.com',
  interest_area: 'AI tools',
  put_on_request: 'Show me the tools worth using for content and workflow automation.',
  source: 'automated-test',
};

const cases = [
  {
    name: 'invalid_json',
    request: { method: 'POST', body: '{"name":' },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(result.parsed?.status === 'invalid_json', `Expected invalid_json, got ${result.parsed?.status}`);
    },
  },
  {
    name: 'missing_fields',
    request: { method: 'POST', body: JSON.stringify({ email: 'test@example.com' }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(result.parsed?.status === 'validation_error', `Expected validation_error, got ${result.parsed?.status}`);
    },
  },
  {
    name: 'invalid_email',
    request: { method: 'POST', body: JSON.stringify({ ...validPayload, email: 'not-an-email' }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(result.parsed?.status === 'invalid_email', `Expected invalid_email, got ${result.parsed?.status}`);
    },
  },
  {
    name: 'sms_requires_consent',
    request: { method: 'POST', body: JSON.stringify({ ...validPayload, phone: '555-111-2222' }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(
        result.parsed?.status === 'sms_consent_required',
        `Expected sms_consent_required, got ${result.parsed?.status}`,
      );
    },
  },
  {
    name: 'invalid_interest_area',
    request: { method: 'POST', body: JSON.stringify({ ...validPayload, interest_area: 'Recipes' }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(
        result.parsed?.status === 'invalid_interest_area',
        `Expected invalid_interest_area, got ${result.parsed?.status}`,
      );
    },
  },
  {
    name: 'valid_dry_run',
    request: { method: 'POST', body: JSON.stringify(validPayload) },
    assert(result) {
      assert(result.statusCode === 201, `Expected 201, got ${result.statusCode}`);
      assert(result.parsed?.status === 'queued', `Expected queued, got ${result.parsed?.status}`);
      assert(result.parsed?.dry_run === true, 'Expected dry_run true');
    },
  },
];

for (const testCase of cases) {
  const result = await runCase({ request: testCase.request });
  testCase.assert(result);
  console.log(`✓ ${testCase.name}`);
}

const originalFetch = globalThis.fetch;
let capturedSupabaseRow = null;

process.env.FREE_GAME_WAITLIST_DRY_RUN = 'false';
process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-test';
process.env.FREE_GAME_WAITLIST_WEBHOOK_URL = '';
process.env.DISCORD_OWNER_WEBHOOK_URL = '';

globalThis.fetch = async (url, options) => {
  capturedSupabaseRow = JSON.parse(options.body);

  return {
    ok: true,
    async json() {
      return [{ id: '00000000-0000-0000-0000-000000000001' }];
    },
  };
};

const persistenceResult = await runCase({
  request: {
    method: 'POST',
    body: JSON.stringify({
      ...validPayload,
      phone: '(314) 817-7538',
      sms_opt_in: true,
      page_path: '/thurr/?utm_source=instagram',
      referrer: 'https://www.instagram.com/',
    }),
  },
});

assert(persistenceResult.statusCode === 201, `Expected 201, got ${persistenceResult.statusCode}`);
assert(capturedSupabaseRow?.name === 'Thurr Test', 'Expected name to be persisted');
assert(capturedSupabaseRow?.email === 'thurr.test@example.com', 'Expected lowercased email to be persisted');
assert(capturedSupabaseRow?.phone === '(314) 817-7538', 'Expected phone to be persisted with SMS opt-in');
assert(capturedSupabaseRow?.sms_opt_in === true, 'Expected SMS opt-in to be persisted');
assert(capturedSupabaseRow?.interest_area === 'AI tools', 'Expected interest area to be persisted');
assert(capturedSupabaseRow?.put_on_request === validPayload.put_on_request, 'Expected put-on request to be persisted');
assert(capturedSupabaseRow?.page_path === '/thurr/?utm_source=instagram', 'Expected page_path to be persisted');
assert(capturedSupabaseRow?.referrer === 'https://www.instagram.com/', 'Expected referrer to be persisted');
console.log('✓ persistence_mapping');

globalThis.fetch = originalFetch;
process.env.FREE_GAME_WAITLIST_DRY_RUN = 'true';

console.log('Free Game waitlist payload checks passed.');
