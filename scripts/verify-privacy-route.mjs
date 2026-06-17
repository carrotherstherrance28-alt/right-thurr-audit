import { readFileSync } from 'node:fs';

const mainSource = readFileSync('src/main.jsx', 'utf8');
const footerSource = readFileSync('src/components/SiteChrome.jsx', 'utf8');
const normalizedFooterSource = footerSource.replace(/\s+/g, ' ');

const checks = [
  {
    label: 'privacy route is recognized from pathname',
    passed: mainSource.includes("window.location.pathname === '/privacy'") &&
      mainSource.includes("return 'privacy';"),
  },
  {
    label: 'privacy page renders for privacy state',
    passed: mainSource.includes("{page === 'privacy' && <PrivacyPage setPage={navigateToPage} />}"),
  },
  {
    label: 'footer links to privacy page',
    passed: footerSource.includes("navigateToPage('privacy')") &&
      footerSource.includes('Privacy Policy'),
  },
  {
    label: 'footer includes locked compliance trust strip',
    passed: normalizedFooterSource.includes(
      'HIPAA-aware system design. TCPA-safe follow-up architecture. COPPA-compliant where required. Compliance sign-off required before any regulated system goes live.',
    ),
  },
  {
    label: 'privacy page warns against sensitive submissions',
    passed: mainSource.includes('Do not submit patient health information') &&
      mainSource.includes('passwords, payment details, SSNs'),
  },
];

const failed = checks.filter((check) => !check.passed);

if (failed.length) {
  console.error('Privacy route verification failed:');
  for (const check of failed) {
    console.error(`- ${check.label}`);
  }
  process.exit(1);
}

console.log('Privacy route verification passed.');
