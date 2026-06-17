import { readFileSync } from 'node:fs';

const mainSource = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const productSpec = readFileSync(
  new URL('../docs/product/Right-Thurr-Product-Spec.md', import.meta.url),
  'utf8',
);

const failures = [];

if (/Dallas Mobile Detailing/.test(mainSource)) {
  const hasSampleReportLabel = /REPORT SAMPLE[\s\S]{0,900}Dallas Mobile Detailing Engine/.test(mainSource);
  const hasReportEngineLabel = /REPORT ENGINE[\s\S]{0,900}Dallas Mobile Detailing Engine|Dallas Mobile Detailing Engine[\s\S]{0,900}REPORT ENGINE/.test(
    mainSource,
  );

  if (!hasSampleReportLabel && !hasReportEngineLabel) {
    failures.push('Dallas Mobile Detailing appears in src/main.jsx without nearby sample/report context.');
  }
}

const requiredSpecBoundary =
  'Dallas Mobile Detailing is a sample Right Thurr and diagnostic lane, not the core Thurr Solutions offer.';

if (!productSpec.includes(requiredSpecBoundary)) {
  failures.push('Right Thurr spec is missing the Dallas Mobile Detailing demo-lane boundary note.');
}

if (/Primary example:\s*\n\s*>\s*"I want to start a mobile detailing business in Dallas\."/m.test(productSpec)) {
  failures.push('Right Thurr spec still labels Dallas Mobile Detailing as the primary example.');
}

const homepageFunctionMatch = mainSource.match(/function HomePage[\s\S]*?function VisualHero/);
if (homepageFunctionMatch?.[0]?.includes('Dallas Mobile Detailing')) {
  failures.push('Homepage renders Dallas Mobile Detailing in the core Thurr Solutions page flow.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Dallas Mobile Detailing demo-lane boundary verified.');
