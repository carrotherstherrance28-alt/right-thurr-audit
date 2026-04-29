import fs from 'node:fs/promises';
import handler from '../api/thurnos-blueprint.js';

async function loadEnvFile(path) {
  try {
    const raw = await fs.readFile(path, 'utf8');

    for (const line of raw.split('\n')) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split('=');

      if (!process.env[key]) {
        process.env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function readPayload() {
  const inputPath = process.argv[2] || 'docs/backend/sample-buildout-intake.json';
  return JSON.parse(await fs.readFile(inputPath, 'utf8'));
}

function createMockResponse() {
  const chunks = [];

  return {
    response: {
      statusCode: 0,
      headers: {},
      setHeader(name, value) {
        this.headers[name] = value;
      },
      end(chunk) {
        chunks.push(chunk);
      },
    },
    getBody() {
      return JSON.parse(chunks.join(''));
    },
  };
}

await loadEnvFile('.env.local');

if (!process.env.THURNOS_SHARED_SECRET) {
  throw new Error('THURNOS_SHARED_SECRET is required in .env.local for the dry-run bridge test.');
}

const payload = await readPayload();
const mock = createMockResponse();

await handler(
  {
    method: 'POST',
    headers: {
      'x-thurnos-secret': process.env.THURNOS_SHARED_SECRET,
    },
    body: {
      dry_run: true,
      payload,
    },
  },
  mock.response,
);

const body = mock.getBody();

if (!body.ok) {
  throw new Error(`${body.status}: ${body.detail || body.message || 'Bridge dry run failed.'}`);
}

console.log(
  JSON.stringify(
    {
      status_code: mock.response.statusCode,
      status: body.status,
      title: body.draft?.title,
      report_type: body.draft?.report_type,
      sections_ready: Object.values(body.draft?.sections || {}).filter(Boolean).length,
      launch_tasks: body.draft?.launch_tasks?.length || 0,
    },
    null,
    2,
  ),
);
