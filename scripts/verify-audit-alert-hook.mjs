import { readFileSync } from 'node:fs';

const apiSource = readFileSync(new URL('../api/consultation-request.js', import.meta.url), 'utf8');
const legacyApiSource = readFileSync(new URL('../api/audit-request.js', import.meta.url), 'utf8');
const alertDoc = readFileSync(new URL('../docs/backend/Consultation-Request-Alert-Flow.md', import.meta.url), 'utf8');
const backlog = readFileSync(new URL('../docs/project/Codex-Ready-Backlog.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const failures = [];

const requiredApiMarkers = [
  'async function postOwnerAlert({ webhookUrl, row, requestId })',
  'if (!webhookUrl) {',
  'return false;',
  'process.env.CONSULTATION_REQUEST_WEBHOOK_URL',
  'process.env.AUDIT_REQUEST_WEBHOOK_URL',
  'process.env.DISCORD_OWNER_WEBHOOK_URL',
  'method: \'POST\'',
  'headers: { \'Content-Type\': \'application/json\' }',
  'Consultation request owner alert returned non-OK status.',
  'Consultation request owner alert failed.',
  'requestId: savedRequest?.id',
  'alerted,',
];

for (const marker of requiredApiMarkers) {
  if (!apiSource.includes(marker)) {
    failures.push(`Missing consultation alert API marker: ${marker}`);
  }
}

if (!legacyApiSource.includes("export { default } from './consultation-request.js';")) {
  failures.push('Legacy /api/audit-request endpoint must re-export the consultation request handler.');
}

const forbiddenHardcodedDestinations = [
  /https:\/\/discord\.com\/api\/webhooks\/(?!REPLACE_WITH_)/i,
  /https?:\/\/[^'"\s]*(?:n8n|webhook)[^'"\s]*/i,
  /@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
];

for (const pattern of forbiddenHardcodedDestinations) {
  if (pattern.test(apiSource)) {
    failures.push(`Consultation alert API appears to contain a hardcoded destination matching ${pattern}.`);
  }
}

const requiredDocMarkers = [
  'SUPABASE_URL=',
  'SUPABASE_SERVICE_ROLE_KEY=',
  'CONSULTATION_REQUEST_WEBHOOK_URL=',
  'AUDIT_REQUEST_WEBHOOK_URL=',
  'DISCORD_OWNER_WEBHOOK_URL=',
  'If neither alert variable exists, the request can still be saved.',
  'Do not send sensitive regulated details, credentials, or private client records through owner alerts.',
  'The final production destination is still a Thurr decision.',
];

for (const marker of requiredDocMarkers) {
  if (!alertDoc.includes(marker)) {
    failures.push(`Missing consultation alert doc marker: ${marker}`);
  }
}

if (packageJson.scripts?.['audit-alert:verify'] !== 'node scripts/verify-audit-alert-hook.mjs') {
  failures.push('package.json is missing audit-alert:verify script.');
}

if (packageJson.scripts?.['consultation-alert:verify'] !== 'node scripts/verify-audit-alert-hook.mjs') {
  failures.push('package.json is missing consultation-alert:verify script.');
}

if (!/TICKET: AUD-003[\s\S]*STATUS: DONE \(2026-05-17\)/.test(backlog)) {
  failures.push('AUD-003 is not marked DONE in the Codex-ready backlog.');
}

if (!/TICKET: DECISION BLOCKER — Audit Alert Destination[\s\S]*STATUS: BLOCKED/.test(backlog)) {
  failures.push('Consultation Alert Destination blocker must remain BLOCKED until Thurr chooses production routing.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Consultation request owner alert hook verified.');
