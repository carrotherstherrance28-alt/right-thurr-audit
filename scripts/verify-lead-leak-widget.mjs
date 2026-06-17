import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import {
  calculateLeadLeakEstimate,
  leadLeakAssumptions,
} from '../src/lib/leadLeakEstimate.js';

const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/app.css', import.meta.url), 'utf8');
const backlog = readFileSync(
  new URL('../docs/project/Premium-Website-Implementation-Backlog.md', import.meta.url),
  'utf8',
);
const failures = [];

try {
  assert.deepEqual(
    calculateLeadLeakEstimate({
      monthlyLeads: 120,
      responseLeakRate: 25,
      averageJobValue: 800,
      closeRate: 30,
    }),
    {
      leakedLeads: 30,
      recoverableLeads: 9,
      monthlyOpportunity: 7200,
      annualOpportunity: 86400,
    },
  );
} catch (error) {
  failures.push(`Lead leak calculation mismatch: ${error.message}`);
}

try {
  assert.deepEqual(
    calculateLeadLeakEstimate({
      monthlyLeads: -10,
      responseLeakRate: 250,
      averageJobValue: 600,
      closeRate: 50,
    }),
    {
      leakedLeads: 0,
      recoverableLeads: 0,
      monthlyOpportunity: 0,
      annualOpportunity: 0,
    },
  );
} catch (error) {
  failures.push(`Lead leak calculator does not clamp unsafe inputs: ${error.message}`);
}

if (leadLeakAssumptions.length !== 4) {
  failures.push('Lead leak assumptions must document exactly four inputs.');
}

const requiredSourceMarkers = [
  'function LeadLeakDiagnosticWidget',
  '<LeadLeakDiagnosticWidget />',
  'Estimated missed opportunity',
  'This is a planning estimate, not a revenue guarantee.',
  'monthlyLeads',
  'responseLeakRate',
  'averageJobValue',
  'closeRate',
];

for (const marker of requiredSourceMarkers) {
  if (!source.includes(marker)) {
    failures.push(`Missing lead leak widget source marker: ${marker}`);
  }
}

if (!/function HomePage[\s\S]*<VisualAuditCta \/>[\s\S]*<LeadLeakDiagnosticWidget \/>[\s\S]*<VisualSelectedWork \/>/.test(source)) {
  failures.push('Homepage does not render the lead leak widget between the audit CTA and selected work.');
}

if (!/\.lead-leak-widget[\s\S]*display:\s*grid/.test(css)) {
  failures.push('Lead leak widget CSS is missing a stable grid layout.');
}

if (!/\.lead-leak-form[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(css)) {
  failures.push('Lead leak form is missing a two-column desktop input grid.');
}

if (!/@media \(max-width: 720px\)[\s\S]*\.lead-leak-form[\s\S]*grid-template-columns:\s*1fr/.test(css)) {
  failures.push('Lead leak form is missing a one-column mobile layout.');
}

if (!/TICKET: TS-012[\s\S]*STATUS: DONE \(2026-05-17\)/.test(backlog)) {
  failures.push('TS-012 is not marked DONE in the premium website backlog.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Lead leak diagnostic widget verified.');
