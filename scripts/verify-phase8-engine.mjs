import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const thurrRoot = '/Users/thurr/Documents/ThurrSolutions';
const failures = [];

function readRequired(path) {
  if (!existsSync(path)) {
    failures.push(`Missing required file: ${path}`);
    return '';
  }

  return readFileSync(path, 'utf8');
}

function requireIncludes(content, marker, label) {
  if (!content.includes(marker)) {
    failures.push(`${label} missing marker: ${marker}`);
  }
}

function requireNoIncludes(content, marker, label) {
  if (content.includes(marker)) {
    failures.push(`${label} contains forbidden marker: ${marker}`);
  }
}

const productDir = join(thurrRoot, 'Products/Engine');
const productDocs = {
  'ENGINE-SPEC.md': ['GoHighLevel', 'Thurr equivalent', 'smart follow-up automation', 'SMS'],
  'RUNBOOK.md': ['activate one workflow', 'DISCORD_ENGINE_ALERTS_WEBHOOK_URL', 'Gmail OAuth2', 'Stripe restricted key'],
  'PITCH.md': ['$75/$125', 'engine behind the visuals', 'smart follow-up automation', 'Masoo'],
};

for (const [file, markers] of Object.entries(productDocs)) {
  const content = readRequired(join(productDir, file));
  for (const marker of markers) {
    requireIncludes(content, marker, file);
  }
  requireNoIncludes(content, 'kendalp02@icloud.com', file);
}

const workflowDir = join(thurrRoot, 'Thurnos/n8n-engine');
const expectedWorkflows = [
  'E1-lead-intake.json',
  'E2-nurture-sweep.json',
  'E3-booking-intake-calcom.json',
  'E3-booking-intake-google-calendar.json',
  'E4-proposal-accelerator.json',
  'E5-payment-watcher.json',
  'E6-onboarding-kick.json',
  'E7-retainer-monitor.json',
  'E8-review-requests.json',
];

for (const file of expectedWorkflows) {
  const workflowPath = join(workflowDir, file);
  const raw = readRequired(workflowPath);
  if (!raw) continue;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    failures.push(`${file} is not valid JSON: ${error.message}`);
    continue;
  }

  if (parsed.active !== false) {
    failures.push(`${file} must import inactive with active=false.`);
  }

  if (!Array.isArray(parsed.nodes) || parsed.nodes.length < 3) {
    failures.push(`${file} must contain at least three n8n nodes.`);
  }

  const nodeText = JSON.stringify(parsed.nodes);
  requireIncludes(nodeText, 'DISCORD_ENGINE_ALERTS_WEBHOOK_URL', file);
  requireNoIncludes(nodeText, 'https://discord.com/api/webhooks/', file);
  requireNoIncludes(nodeText, 'sk_live_', file);
  requireNoIncludes(nodeText, 'kendalp02@icloud.com', file);
}

const workflowReadme = readRequired(join(workflowDir, 'README.md'));
for (const marker of [
  'E1',
  'E8',
  'Imports inactive',
  'DISCORD_ENGINE_ALERTS_WEBHOOK_URL',
  'stripeReadOnly',
]) {
  requireIncludes(workflowReadme, marker, 'n8n-engine README.md');
}

const importScriptPath = join(workflowDir, 'import.sh');
const importScript = readRequired(importScriptPath);
if (importScript && (statSync(importScriptPath).mode & 0o111) === 0) {
  failures.push('import.sh should be executable.');
}
for (const file of expectedWorkflows) {
  requireIncludes(importScript, `n8n import:workflow --input="${file}"`, 'import.sh');
}

const srcMain = readRequired(join(repoRoot, 'src/main.jsx'));
requireIncludes(srcMain, 'NEXT_PUBLIC_ENGINE_WEBHOOK_URL', 'src/main.jsx');
requireIncludes(srcMain, 'submitEngineLeadIntake', 'src/main.jsx');
requireIncludes(srcMain, 'fallback-booking-cta', 'src/main.jsx');
requireIncludes(srcMain, 'what_do_you_need', 'src/main.jsx');
requireIncludes(srcMain, 'phone', 'src/main.jsx');
requireNoIncludes(srcMain, 'https://localhost:5678', 'src/main.jsx');
requireNoIncludes(srcMain, 'http://localhost:5678', 'src/main.jsx');

const viteConfig = readRequired(join(repoRoot, 'vite.config.js'));
requireIncludes(viteConfig, "envPrefix: ['VITE_', 'NEXT_PUBLIC_']", 'vite.config.js');

const envExample = readRequired(join(repoRoot, '.env.example'));
requireIncludes(envExample, 'NEXT_PUBLIC_ENGINE_WEBHOOK_URL=', '.env.example');
requireIncludes(envExample, 'VITE_ENGINE_WEBHOOK_URL=', '.env.example');

const phaseLog = readRequired(join(thurrRoot, '_ControlPlane/PHASELOG.md'));
requireIncludes(phaseLog, 'Phase 8 Engine', 'PHASELOG.md');
requireIncludes(phaseLog, 'Thurr Solutions automation', 'PHASELOG.md');
requireIncludes(phaseLog, 'smart follow-up automation', 'PHASELOG.md');

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Phase 8 engine artifacts verified.');
