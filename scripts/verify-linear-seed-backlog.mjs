import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = path.join(repoRoot, 'scripts', 'linear-seed-backlog.mjs');
const csvPath = path.join(repoRoot, 'docs', 'project', 'linear-backlog-import.csv');

function fail(message) {
  console.error(`x ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`ok ${message}`);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
    return false;
  }

  ok(message);
  return true;
}

function parseCsvLine(line) {
  const values = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (quoted && character === '"' && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      quoted = !quoted;
      continue;
    }

    if (!quoted && character === ',') {
      values.push(value);
      value = '';
      continue;
    }

    value += character;
  }

  values.push(value);
  return values;
}

assert(fs.existsSync(scriptPath), 'linear seed script exists');

if (fs.existsSync(scriptPath)) {
  const output = execFileSync('node', [scriptPath], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env, LINEAR_API_KEY: '', LINEAR_WRITE_APPROVED: '' },
  });

  const result = JSON.parse(output);
  assert(result.mode === 'dry-run', 'default execution is dry-run mode');
  assert(result.source === 'docs/project/Codex-Ready-Backlog.md', 'dry-run reports backlog source');
  assert(result.csv === 'docs/project/linear-backlog-import.csv', 'dry-run reports CSV output path');
  assert(result.ticket_count > 0, 'dry-run parsed at least one ticket');
  assert(result.blocked_count > 0, 'dry-run preserves blocked decision tickets');
  assert(result.would_call_linear_api === false, 'dry-run does not call Linear API');
}

assert(fs.existsSync(csvPath), 'manual import CSV exists');

if (fs.existsSync(csvPath)) {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const lines = csv.trim().split('\n');
  const header = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map(parseCsvLine);
  const titleIndex = header.indexOf('Title');
  const bodyIndex = header.indexOf('Description');
  const statusIndex = header.indexOf('Status');

  assert(header.join(',') === 'Title,Description,Priority,Status,Labels', 'CSV header matches Linear import fields');
  assert(rows.length > 0, 'CSV includes backlog rows');
  assert(rows.some((row) => row[titleIndex] === 'WEB-001 — Replace Homepage Hero Positioning'), 'CSV includes WEB-001');
  assert(rows.some((row) => row[titleIndex] === 'LIN-002 — Create Linear Seed Script Or Manual Import File'), 'CSV includes LIN-002');
  assert(rows.some((row) => row[statusIndex] === 'Blocked'), 'CSV includes blocked status rows');
  assert(rows.every((row) => !/secret|token|api[_ -]?key/i.test(row[bodyIndex] || '')), 'CSV descriptions omit credential language');
}
