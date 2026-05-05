import handler from '../api/buildout-request.js';

function createMockResponse() {
  const response = {
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

  return response;
}

async function runCase({ name, request }) {
  const response = createMockResponse();
  await handler(request, response);

  let parsed = null;
  try {
    parsed = response.body ? JSON.parse(response.body) : null;
  } catch (error) {
    parsed = null;
  }

  return {
    name,
    statusCode: response.statusCode,
    parsed,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const cases = [
  {
    name: 'invalid_json',
    request: { method: 'POST', body: '{"lead":' },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(result.parsed?.status === 'invalid_json', `Expected status invalid_json, got ${result.parsed?.status}`);
    },
  },
  {
    name: 'missing_fields',
    request: { method: 'POST', body: JSON.stringify({ lead: {}, intake: {} }) },
    assert(result) {
      assert(result.statusCode === 400, `Expected 400, got ${result.statusCode}`);
      assert(
        result.parsed?.status === 'validation_error',
        `Expected status validation_error, got ${result.parsed?.status}`,
      );
    },
  },
];

for (const testCase of cases) {
  const result = await runCase({ name: testCase.name, request: testCase.request });
  testCase.assert(result);
  console.log(`✓ ${testCase.name}`);
}

console.log('Buildout request payload parsing checks passed.');

