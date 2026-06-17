import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/app.css', import.meta.url), 'utf8');
const normalizedSource = source.replace(/\s+/g, ' ');
const failures = [];

const requiredLanes = [
  'Storm lead capture page',
  'Youth wellness MVP planning',
  'Insurance lead pipeline concept',
  'Contractor close system presentation',
];

if (!/function VisualActivePipeline\(\)[\s\S]*activePipelineLanes/.test(source)) {
  failures.push('Homepage is missing the VisualActivePipeline section backed by activePipelineLanes.');
}

if (!/function HomePage[\s\S]*<VisualSelectedWork \/>[\s\S]*<VisualActivePipeline \/>[\s\S]*<VisualComplianceGuardrail/.test(source)) {
  failures.push('Homepage does not render the active pipeline section between selected work and compliance guardrails.');
}

for (const lane of requiredLanes) {
  if (!normalizedSource.includes(lane)) {
    failures.push(`Missing public-safe active pipeline lane: ${lane}`);
  }
}

const bannedSensitivePhrases = [
  'deposit received',
  'private email',
  'payment details',
  'clinical promise',
  'patient',
  'PHI',
];

for (const phrase of bannedSensitivePhrases) {
  const activePipelineMatch = source.match(/const activePipelineLanes = \[[\s\S]*?\n\];/);
  if (activePipelineMatch?.[0]?.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`Active pipeline section includes sensitive or overclaiming language: ${phrase}`);
  }
}

if (!/\.active-pipeline-section[\s\S]*display:\s*grid/.test(css)) {
  failures.push('Active pipeline section CSS is missing a stable grid layout.');
}

if (!/\.active-pipeline-grid[\s\S]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/.test(css)) {
  failures.push('Active pipeline grid does not render four stable desktop columns.');
}

if (!/@media \(max-width: 980px\)[\s\S]*\.active-pipeline-grid[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(css)) {
  failures.push('Active pipeline grid is missing the tablet two-column responsive state.');
}

if (!/@media \(max-width: 680px\)[\s\S]*\.active-pipeline-grid[\s\S]*grid-template-columns:\s*1fr/.test(css)) {
  failures.push('Active pipeline grid is missing the mobile one-column responsive state.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Active pipeline section verified.');
