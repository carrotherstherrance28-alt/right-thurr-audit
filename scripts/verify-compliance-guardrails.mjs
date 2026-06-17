import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const normalizedSource = source.replace(/\s+/g, ' ');

const requiredCopy =
  'For regulated industries, Thurr Solutions builds the system and routes final public-facing copy, consent language, and policy decisions through the client’s authorized reviewer.';

const bannedPublicPhrases = [
  'HIPAA-Aware System Design',
  'TCPA-Safe Follow-Up Architecture',
  'COPPA-Compliant Where Required',
];

const failures = [];

if (!normalizedSource.includes(requiredCopy)) {
  failures.push('Missing locked regulated-industry reviewer copy.');
}

for (const phrase of bannedPublicPhrases) {
  if (source.includes(phrase)) {
    failures.push(`Public compliance strip still uses certification-style phrase: ${phrase}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Compliance guardrail copy verified.');
