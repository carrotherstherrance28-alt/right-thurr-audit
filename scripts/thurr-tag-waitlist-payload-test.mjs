import handler from '../api/thurr-tag-waitlist.js';

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

process.env.THURR_TAG_WAITLIST_DRY_RUN = 'true';

const validPayload = {
  name: 'Thurr Test',
  email: 'THURR.TAG@example.com',
  interest_type: 'Founders Edition',
  quantity_range: '1',
  founder_interest: true,
  source: 'automated-test',
  utm_source: 'linkedin',
  utm_medium: 'dm',
  utm_campaign: 'corporate_pilot',
  utm_content: 'message_a',
  audience_segment: 'corporate_buyer',
  outreach_type: 'direct_dm',
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
    request: { method: 'POST', body: JSON.stringify({}) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(result.parsed?.status === 'validation_error', `Expected validation_error, got ${result.parsed?.status}`);
    },
  },
  {
    name: 'email_only_valid_dry_run',
    request: { method: 'POST', body: JSON.stringify({ email: 'email.only@example.com' }) },
    assert(result) {
      assert(result.statusCode === 201, `Expected 201, got ${result.statusCode}`);
      assert(result.parsed?.status === 'queued', `Expected queued, got ${result.parsed?.status}`);
      assert(result.parsed?.dry_run === true, 'Expected dry_run true');
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
    name: 'invalid_interest_type',
    request: { method: 'POST', body: JSON.stringify({ ...validPayload, interest_type: 'Mystery Drop' }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(
        result.parsed?.status === 'invalid_interest_type',
        `Expected invalid_interest_type, got ${result.parsed?.status}`,
      );
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
    name: 'corporate_valid_dry_run',
    request: {
      method: 'POST',
      body: JSON.stringify({
        ...validPayload,
        interest_type: 'Corporate Gifting',
        quantity_range: '25+',
        corporate_interest: true,
        company: 'Example Co',
      }),
    },
    assert(result) {
      assert(result.statusCode === 201, `Expected 201, got ${result.statusCode}`);
      assert(result.parsed?.status === 'queued', `Expected queued, got ${result.parsed?.status}`);
      assert(result.parsed?.dry_run === true, 'Expected dry_run true');
    },
  },
  {
    name: 'personalized_valid_dry_run',
    request: {
      method: 'POST',
      body: JSON.stringify({
        ...validPayload,
        interest_type: 'Personalized',
        personalized_interest: true,
      }),
    },
    assert(result) {
      assert(result.statusCode === 201, `Expected 201, got ${result.statusCode}`);
      assert(result.parsed?.status === 'queued', `Expected queued, got ${result.parsed?.status}`);
      assert(result.parsed?.dry_run === true, 'Expected dry_run true');
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
  console.log(`OK ${testCase.name}`);
}

const originalFetch = globalThis.fetch;
let capturedSupabaseRow = null;

process.env.THURR_TAG_WAITLIST_DRY_RUN = 'false';
process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-test';
process.env.THURR_TAG_WAITLIST_WEBHOOK_URL = '';
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
  request: { method: 'POST', body: JSON.stringify(validPayload) },
});

assert(persistenceResult.statusCode === 201, `Expected 201, got ${persistenceResult.statusCode}`);
assert(capturedSupabaseRow?.utm_source === 'linkedin', 'Expected utm_source to be persisted');
assert(capturedSupabaseRow?.utm_medium === 'dm', 'Expected utm_medium to be persisted');
assert(capturedSupabaseRow?.utm_campaign === 'corporate_pilot', 'Expected utm_campaign to be persisted');
assert(capturedSupabaseRow?.utm_content === 'message_a', 'Expected utm_content to be persisted');
assert(capturedSupabaseRow?.audience_segment === 'corporate_buyer', 'Expected audience_segment to be persisted');
assert(capturedSupabaseRow?.outreach_type === 'direct_dm', 'Expected outreach_type to be persisted');
console.log('OK attribution_persistence_mapping');

globalThis.fetch = originalFetch;
process.env.THURR_TAG_WAITLIST_DRY_RUN = 'true';

console.log('Thurr Tag waitlist payload checks passed.');
