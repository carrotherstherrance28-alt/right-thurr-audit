import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vercelConfigPath = path.join(repoRoot, 'vercel.json');
const robotsPath = path.join(repoRoot, 'public', 'robots.txt');
const sitemapPath = path.join(repoRoot, 'public', 'sitemap.xml');
const mainPath = path.join(repoRoot, 'src', 'main.jsx');
const useCasesIndexPagePath = path.join(repoRoot, 'src', 'components', 'UseCasesIndexPage.jsx');
const useCasePagePath = path.join(repoRoot, 'src', 'components', 'WebsiteLandlordUseCasePage.jsx');
const useCaseHeroPath = path.join(repoRoot, 'public', 'use-cases', 'website-landlord-hero.svg');
const aiFollowupUseCasePagePath = path.join(repoRoot, 'src', 'components', 'AiLeadFollowupUseCasePage.jsx');
const aiFollowupHeroPath = path.join(repoRoot, 'public', 'use-cases', 'ai-lead-followup-hero.svg');
const missedCallUseCasePagePath = path.join(repoRoot, 'src', 'components', 'MissedCallTextbackUseCasePage.jsx');
const missedCallHeroPath = path.join(repoRoot, 'public', 'use-cases', 'missed-call-textback-hero.svg');
const reviewBoosterUseCasePagePath = path.join(repoRoot, 'src', 'components', 'ReviewBoosterUseCasePage.jsx');
const reviewBoosterHeroPath = path.join(repoRoot, 'public', 'use-cases', 'review-booster-hero.svg');
const noShowSaverUseCasePagePath = path.join(repoRoot, 'src', 'components', 'NoShowSaverUseCasePage.jsx');
const noShowSaverHeroPath = path.join(repoRoot, 'public', 'use-cases', 'no-show-saver-hero.svg');
const estimateFollowUpUseCasePagePath = path.join(repoRoot, 'src', 'components', 'EstimateFollowUpUseCasePage.jsx');
const estimateFollowUpHeroPath = path.join(repoRoot, 'public', 'use-cases', 'estimate-follow-up-hero.svg');
const seasonalReactivationUseCasePagePath = path.join(
  repoRoot,
  'src',
  'components',
  'SeasonalReactivationUseCasePage.jsx',
);
const seasonalReactivationHeroPath = path.join(repoRoot, 'public', 'use-cases', 'seasonal-reactivation-hero.svg');
const quoteQualifierUseCasePagePath = path.join(repoRoot, 'src', 'components', 'QuoteQualifierUseCasePage.jsx');
const quoteQualifierHeroPath = path.join(repoRoot, 'public', 'use-cases', 'quote-qualifier-hero.svg');
const serviceReminderUseCasePagePath = path.join(repoRoot, 'src', 'components', 'ServiceReminderUseCasePage.jsx');
const serviceReminderHeroPath = path.join(repoRoot, 'public', 'use-cases', 'service-reminder-hero.svg');
const maintenancePlanUpsellUseCasePagePath = path.join(
  repoRoot,
  'src',
  'components',
  'MaintenancePlanUpsellUseCasePage.jsx',
);
const maintenancePlanUpsellHeroPath = path.join(repoRoot, 'public', 'use-cases', 'maintenance-plan-upsell-hero.svg');
const depositRequestUseCasePagePath = path.join(repoRoot, 'src', 'components', 'DepositRequestUseCasePage.jsx');
const depositRequestHeroPath = path.join(repoRoot, 'public', 'use-cases', 'deposit-request-hero.svg');
const financingAssistUseCasePagePath = path.join(repoRoot, 'src', 'components', 'FinancingAssistUseCasePage.jsx');
const financingAssistHeroPath = path.join(repoRoot, 'public', 'use-cases', 'financing-assist-hero.svg');
const projectPhotoProofUseCasePagePath = path.join(repoRoot, 'src', 'components', 'ProjectPhotoProofUseCasePage.jsx');
const projectPhotoProofHeroPath = path.join(repoRoot, 'public', 'use-cases', 'project-photo-proof-hero.svg');
const partsArrivalPingUseCasePagePath = path.join(repoRoot, 'src', 'components', 'PartsArrivalPingUseCasePage.jsx');
const partsArrivalPingHeroPath = path.join(repoRoot, 'public', 'use-cases', 'parts-arrival-ping-hero.svg');
const etaUpdateUseCasePagePath = path.join(repoRoot, 'src', 'components', 'EtaUpdateUseCasePage.jsx');
const etaUpdateHeroPath = path.join(repoRoot, 'public', 'use-cases', 'eta-update-hero.svg');
const referralLoopUseCasePagePath = path.join(repoRoot, 'src', 'components', 'ReferralLoopUseCasePage.jsx');
const referralLoopHeroPath = path.join(repoRoot, 'public', 'use-cases', 'referral-loop-hero.svg');
const cancellationSaveUseCasePagePath = path.join(repoRoot, 'src', 'components', 'CancellationSaveUseCasePage.jsx');
const cancellationSaveHeroPath = path.join(repoRoot, 'public', 'use-cases', 'cancellation-save-hero.svg');
const invoiceFollowUpUseCasePagePath = path.join(repoRoot, 'src', 'components', 'InvoiceFollowUpUseCasePage.jsx');
const invoiceFollowUpHeroPath = path.join(repoRoot, 'public', 'use-cases', 'invoice-follow-up-hero.svg');
const appointmentPrepUseCasePagePath = path.join(repoRoot, 'src', 'components', 'AppointmentPrepUseCasePage.jsx');
const appointmentPrepHeroPath = path.join(repoRoot, 'public', 'use-cases', 'appointment-prep-hero.svg');
const afterHoursTriageUseCasePagePath = path.join(repoRoot, 'src', 'components', 'AfterHoursTriageUseCasePage.jsx');
const afterHoursTriageHeroPath = path.join(repoRoot, 'public', 'use-cases', 'after-hours-triage-hero.svg');
const serviceRecoverySaveUseCasePagePath = path.join(
  repoRoot,
  'src',
  'components',
  'ServiceRecoverySaveUseCasePage.jsx',
);
const serviceRecoverySaveHeroPath = path.join(repoRoot, 'public', 'use-cases', 'service-recovery-save-hero.svg');
const warrantyClaimIntakeUseCasePagePath = path.join(
  repoRoot,
  'src',
  'components',
  'WarrantyClaimIntakeUseCasePage.jsx',
);
const warrantyClaimIntakeHeroPath = path.join(repoRoot, 'public', 'use-cases', 'warranty-claim-intake-hero.svg');
const changeOrderApprovalUseCasePagePath = path.join(repoRoot, 'src', 'components', 'ChangeOrderApprovalUseCasePage.jsx');
const changeOrderApprovalHeroPath = path.join(repoRoot, 'public', 'use-cases', 'change-order-approval-hero.svg');
const jobKickoffPacketUseCasePagePath = path.join(repoRoot, 'src', 'components', 'JobKickoffPacketUseCasePage.jsx');
const jobKickoffPacketHeroPath = path.join(repoRoot, 'public', 'use-cases', 'job-kickoff-packet-hero.svg');
const weatherDelayUpdateUseCasePagePath = path.join(repoRoot, 'src', 'components', 'WeatherDelayUpdateUseCasePage.jsx');
const weatherDelayUpdateHeroPath = path.join(repoRoot, 'public', 'use-cases', 'weather-delay-update-hero.svg');

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  // eslint-disable-next-line no-console
  console.log(`✓ ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath));
  } catch (err) {
    fail(`${path.relative(repoRoot, filePath)} is not valid JSON: ${err.message}`);
    return null;
  }
}

function assertIncludes({ haystack, needle, label }) {
  if (!haystack.includes(needle)) {
    fail(`${label}: missing ${JSON.stringify(needle)}`);
    return false;
  }
  ok(label);
  return true;
}

function assertTruthy({ value, label }) {
  if (!value) {
    fail(label);
    return false;
  }
  ok(label);
  return true;
}

function getHeaderEntry(config, source) {
  const headers = Array.isArray(config?.headers) ? config.headers : [];
  return headers.find((entry) => entry?.source === source) ?? null;
}

function getRewriteEntry(config, source) {
  const rewrites = Array.isArray(config?.rewrites) ? config.rewrites : [];
  return rewrites.find((entry) => entry?.source === source) ?? null;
}

function verifyVercelHeaders(config) {
  const entry = getHeaderEntry(config, '/use-cases/:path*');
  if (!assertTruthy({ value: entry, label: `vercel.json has headers for /use-cases/:path*` })) return;

  const headers = Array.isArray(entry.headers) ? entry.headers : [];
  const robotsHeader = headers.find((header) => header?.key === 'X-Robots-Tag');
  if (!robotsHeader) {
    fail(`vercel.json /use-cases headers missing X-Robots-Tag`);
    return;
  }

  if (robotsHeader.value !== 'noindex, nofollow') {
    fail(
      `vercel.json /use-cases X-Robots-Tag must be "noindex, nofollow" (got ${JSON.stringify(
        robotsHeader.value,
      )})`,
    );
    return;
  }

  ok(`vercel.json /use-cases X-Robots-Tag is noindex, nofollow`);
}

function verifyVercelRoutes(config) {
  const indexEntry = getRewriteEntry(config, '/use-cases');
  if (!assertTruthy({ value: indexEntry, label: `vercel.json rewrites /use-cases exists` })) return;

  if (indexEntry.destination !== '/') {
    fail(`vercel.json rewrite /use-cases must destination "/" (got ${JSON.stringify(indexEntry.destination)})`);
    return;
  }

  ok(`vercel.json rewrites /use-cases -> / (SPA)`);

  const entry = getRewriteEntry(config, '/use-cases/:path*');
  if (!assertTruthy({ value: entry, label: `vercel.json rewrites /use-cases/:path* exists` })) return;

  if (entry.destination !== '/') {
    fail(`vercel.json rewrite /use-cases/:path* must destination "/" (got ${JSON.stringify(entry.destination)})`);
    return;
  }

  ok(`vercel.json rewrites /use-cases/:path* -> / (SPA)`);
}

function verifyRobotsTxt() {
  if (!fs.existsSync(robotsPath)) {
    fail(`Missing public/robots.txt`);
    return;
  }

  const robots = readText(robotsPath);

  assertIncludes({
    haystack: robots,
    needle: 'Disallow: /use-cases',
    label: `public/robots.txt disallows /use-cases`,
  });
}

function verifySitemap() {
  if (!fs.existsSync(sitemapPath)) {
    fail(`Missing public/sitemap.xml`);
    return;
  }

  const sitemap = readText(sitemapPath);
  if (sitemap.includes('/use-cases')) {
    fail(`public/sitemap.xml must not include /use-cases while noindex is enforced`);
    return;
  }

  ok(`public/sitemap.xml does not include /use-cases`);
}

function verifySpaRouteWiring() {
  if (!fs.existsSync(mainPath)) {
    fail(`Missing src/main.jsx`);
    return;
  }

  const main = readText(mainPath);

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/website-landlord')",
    label: `SPA detects /use-cases/website-landlord initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/ai-lead-followup')",
    label: `SPA detects /use-cases/ai-lead-followup initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/missed-call-textback')",
    label: `SPA detects /use-cases/missed-call-textback initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/review-booster')",
    label: `SPA detects /use-cases/review-booster initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/no-show-saver')",
    label: `SPA detects /use-cases/no-show-saver initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/estimate-follow-up')",
    label: `SPA detects /use-cases/estimate-follow-up initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/seasonal-reactivation')",
    label: `SPA detects /use-cases/seasonal-reactivation initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/quote-qualifier')",
    label: `SPA detects /use-cases/quote-qualifier initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/service-reminder')",
    label: `SPA detects /use-cases/service-reminder initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/maintenance-plan-upsell')",
    label: `SPA detects /use-cases/maintenance-plan-upsell initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/deposit-request')",
    label: `SPA detects /use-cases/deposit-request initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/financing-assist')",
    label: `SPA detects /use-cases/financing-assist initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/project-photo-proof')",
    label: `SPA detects /use-cases/project-photo-proof initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/parts-arrival-ping')",
    label: `SPA detects /use-cases/parts-arrival-ping initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/eta-update')",
    label: `SPA detects /use-cases/eta-update initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/referral-loop')",
    label: `SPA detects /use-cases/referral-loop initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/cancellation-save')",
    label: `SPA detects /use-cases/cancellation-save initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/invoice-follow-up')",
    label: `SPA detects /use-cases/invoice-follow-up initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/appointment-prep')",
    label: `SPA detects /use-cases/appointment-prep initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/after-hours-triage')",
    label: `SPA detects /use-cases/after-hours-triage initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/service-recovery-save')",
    label: `SPA detects /use-cases/service-recovery-save initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/warranty-claim-intake')",
    label: `SPA detects /use-cases/warranty-claim-intake initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/change-order-approval')",
    label: `SPA detects /use-cases/change-order-approval initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/job-kickoff-packet')",
    label: `SPA detects /use-cases/job-kickoff-packet initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname.startsWith('/use-cases/weather-delay-update')",
    label: `SPA detects /use-cases/weather-delay-update initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "window.location.pathname === '/use-cases' || window.location.pathname === '/use-cases/'",
    label: `SPA detects /use-cases index initial route`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-website-landlord': '/use-cases/website-landlord'",
    label: `SPA useCaseRoutes includes website landlord`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-ai-lead-followup': '/use-cases/ai-lead-followup'",
    label: `SPA useCaseRoutes includes AI lead follow-up`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-missed-call-textback': '/use-cases/missed-call-textback'",
    label: `SPA useCaseRoutes includes missed call textback`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-review-booster': '/use-cases/review-booster'",
    label: `SPA useCaseRoutes includes review booster`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-no-show-saver': '/use-cases/no-show-saver'",
    label: `SPA useCaseRoutes includes no-show saver`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-estimate-follow-up': '/use-cases/estimate-follow-up'",
    label: `SPA useCaseRoutes includes estimate follow-up`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-seasonal-reactivation': '/use-cases/seasonal-reactivation'",
    label: `SPA useCaseRoutes includes seasonal reactivation`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-quote-qualifier': '/use-cases/quote-qualifier'",
    label: `SPA useCaseRoutes includes quote qualifier`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-service-reminder': '/use-cases/service-reminder'",
    label: `SPA useCaseRoutes includes service reminder`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-maintenance-plan-upsell': '/use-cases/maintenance-plan-upsell'",
    label: `SPA useCaseRoutes includes maintenance plan upsell`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-deposit-request': '/use-cases/deposit-request'",
    label: `SPA useCaseRoutes includes deposit request`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-financing-assist': '/use-cases/financing-assist'",
    label: `SPA useCaseRoutes includes financing assist`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-project-photo-proof': '/use-cases/project-photo-proof'",
    label: `SPA useCaseRoutes includes project photo proof`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-parts-arrival-ping': '/use-cases/parts-arrival-ping'",
    label: `SPA useCaseRoutes includes parts arrival ping`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-eta-update': '/use-cases/eta-update'",
    label: `SPA useCaseRoutes includes eta update`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-referral-loop': '/use-cases/referral-loop'",
    label: `SPA useCaseRoutes includes referral loop`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-cancellation-save': '/use-cases/cancellation-save'",
    label: `SPA useCaseRoutes includes cancellation save`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-invoice-follow-up': '/use-cases/invoice-follow-up'",
    label: `SPA useCaseRoutes includes invoice follow-up`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-appointment-prep': '/use-cases/appointment-prep'",
    label: `SPA useCaseRoutes includes appointment prep`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-after-hours-triage': '/use-cases/after-hours-triage'",
    label: `SPA useCaseRoutes includes after-hours triage`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-service-recovery-save': '/use-cases/service-recovery-save'",
    label: `SPA useCaseRoutes includes service recovery save`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-warranty-claim-intake': '/use-cases/warranty-claim-intake'",
    label: `SPA useCaseRoutes includes warranty claim intake`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-change-order-approval': '/use-cases/change-order-approval'",
    label: `SPA useCaseRoutes includes change order approval`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-job-kickoff-packet': '/use-cases/job-kickoff-packet'",
    label: `SPA useCaseRoutes includes job kickoff packet`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecase-weather-delay-update': '/use-cases/weather-delay-update'",
    label: `SPA useCaseRoutes includes weather delay update`,
  });

  assertIncludes({
    haystack: main,
    needle: "'usecases-index': '/use-cases'",
    label: `SPA useCaseRoutes includes use-cases index`,
  });
}

function verifyUseCaseAssets() {
  if (!fs.existsSync(useCasesIndexPagePath)) {
    fail(`Missing use-cases index component: src/components/UseCasesIndexPage.jsx`);
  } else {
    ok(`Use-cases index component exists`);
  }

  if (!fs.existsSync(useCasePagePath)) {
    fail(`Missing use-case page component: src/components/WebsiteLandlordUseCasePage.jsx`);
  } else {
    ok(`Use-case page component exists`);
  }

  if (!fs.existsSync(useCaseHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/website-landlord-hero.svg`);
  } else {
    ok(`Use-case hero asset exists`);
  }

  if (!fs.existsSync(aiFollowupUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/AiLeadFollowupUseCasePage.jsx`);
  } else {
    ok(`AI lead follow-up use-case page component exists`);
  }

  if (!fs.existsSync(aiFollowupHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/ai-lead-followup-hero.svg`);
  } else {
    ok(`AI lead follow-up use-case hero asset exists`);
  }

  if (!fs.existsSync(missedCallUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/MissedCallTextbackUseCasePage.jsx`);
  } else {
    ok(`Missed call textback use-case page component exists`);
  }

  if (!fs.existsSync(missedCallHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/missed-call-textback-hero.svg`);
  } else {
    ok(`Missed call textback use-case hero asset exists`);
  }

  if (!fs.existsSync(reviewBoosterUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ReviewBoosterUseCasePage.jsx`);
  } else {
    ok(`Review booster use-case page component exists`);
  }

  if (!fs.existsSync(reviewBoosterHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/review-booster-hero.svg`);
  } else {
    ok(`Review booster use-case hero asset exists`);
  }

  if (!fs.existsSync(noShowSaverUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/NoShowSaverUseCasePage.jsx`);
  } else {
    ok(`No-show saver use-case page component exists`);
  }

  if (!fs.existsSync(noShowSaverHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/no-show-saver-hero.svg`);
  } else {
    ok(`No-show saver use-case hero asset exists`);
  }

  if (!fs.existsSync(estimateFollowUpUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/EstimateFollowUpUseCasePage.jsx`);
  } else {
    ok(`Estimate follow-up use-case page component exists`);
  }

  if (!fs.existsSync(estimateFollowUpHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/estimate-follow-up-hero.svg`);
  } else {
    ok(`Estimate follow-up use-case hero asset exists`);
  }

  if (!fs.existsSync(seasonalReactivationUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/SeasonalReactivationUseCasePage.jsx`);
  } else {
    ok(`Seasonal reactivation use-case page component exists`);
  }

  if (!fs.existsSync(seasonalReactivationHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/seasonal-reactivation-hero.svg`);
  } else {
    ok(`Seasonal reactivation use-case hero asset exists`);
  }

  if (!fs.existsSync(quoteQualifierUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/QuoteQualifierUseCasePage.jsx`);
  } else {
    ok(`Quote qualifier use-case page component exists`);
  }

  if (!fs.existsSync(quoteQualifierHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/quote-qualifier-hero.svg`);
  } else {
    ok(`Quote qualifier use-case hero asset exists`);
  }

  if (!fs.existsSync(serviceReminderUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ServiceReminderUseCasePage.jsx`);
  } else {
    ok(`Service reminder use-case page component exists`);
  }

  if (!fs.existsSync(serviceReminderHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/service-reminder-hero.svg`);
  } else {
    ok(`Service reminder use-case hero asset exists`);
  }

  if (!fs.existsSync(maintenancePlanUpsellUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/MaintenancePlanUpsellUseCasePage.jsx`);
  } else {
    ok(`Maintenance plan upsell use-case page component exists`);
  }

  if (!fs.existsSync(maintenancePlanUpsellHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/maintenance-plan-upsell-hero.svg`);
  } else {
    ok(`Maintenance plan upsell use-case hero asset exists`);
  }

  if (!fs.existsSync(depositRequestUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/DepositRequestUseCasePage.jsx`);
  } else {
    ok(`Deposit request use-case page component exists`);
  }

  if (!fs.existsSync(depositRequestHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/deposit-request-hero.svg`);
  } else {
    ok(`Deposit request use-case hero asset exists`);
  }

  if (!fs.existsSync(financingAssistUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/FinancingAssistUseCasePage.jsx`);
  } else {
    ok(`Financing assist use-case page component exists`);
  }

  if (!fs.existsSync(financingAssistHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/financing-assist-hero.svg`);
  } else {
    ok(`Financing assist use-case hero asset exists`);
  }

  if (!fs.existsSync(projectPhotoProofUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ProjectPhotoProofUseCasePage.jsx`);
  } else {
    ok(`Project photo proof use-case page component exists`);
  }

  if (!fs.existsSync(projectPhotoProofHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/project-photo-proof-hero.svg`);
  } else {
    ok(`Project photo proof use-case hero asset exists`);
  }

  if (!fs.existsSync(partsArrivalPingUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/PartsArrivalPingUseCasePage.jsx`);
  } else {
    ok(`Parts arrival ping use-case page component exists`);
  }

  if (!fs.existsSync(partsArrivalPingHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/parts-arrival-ping-hero.svg`);
  } else {
    ok(`Parts arrival ping use-case hero asset exists`);
  }

  if (!fs.existsSync(etaUpdateUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/EtaUpdateUseCasePage.jsx`);
  } else {
    ok(`ETA update use-case page component exists`);
  }

  if (!fs.existsSync(etaUpdateHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/eta-update-hero.svg`);
  } else {
    ok(`ETA update use-case hero asset exists`);
  }

  if (!fs.existsSync(referralLoopUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ReferralLoopUseCasePage.jsx`);
  } else {
    ok(`Referral loop use-case page component exists`);
  }

  if (!fs.existsSync(referralLoopHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/referral-loop-hero.svg`);
  } else {
    ok(`Referral loop use-case hero asset exists`);
  }

  if (!fs.existsSync(cancellationSaveUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/CancellationSaveUseCasePage.jsx`);
  } else {
    ok(`Cancellation save use-case page component exists`);
  }

  if (!fs.existsSync(cancellationSaveHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/cancellation-save-hero.svg`);
  } else {
    ok(`Cancellation save use-case hero asset exists`);
  }

  if (!fs.existsSync(invoiceFollowUpUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/InvoiceFollowUpUseCasePage.jsx`);
  } else {
    ok(`Invoice follow-up use-case page component exists`);
  }

  if (!fs.existsSync(invoiceFollowUpHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/invoice-follow-up-hero.svg`);
  } else {
    ok(`Invoice follow-up use-case hero asset exists`);
  }

  if (!fs.existsSync(appointmentPrepUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/AppointmentPrepUseCasePage.jsx`);
  } else {
    ok(`Appointment prep use-case page component exists`);
  }

  if (!fs.existsSync(appointmentPrepHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/appointment-prep-hero.svg`);
  } else {
    ok(`Appointment prep use-case hero asset exists`);
  }

  if (!fs.existsSync(afterHoursTriageUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/AfterHoursTriageUseCasePage.jsx`);
  } else {
    ok(`After-hours triage use-case page component exists`);
  }

  if (!fs.existsSync(afterHoursTriageHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/after-hours-triage-hero.svg`);
  } else {
    ok(`After-hours triage use-case hero asset exists`);
  }

  if (!fs.existsSync(serviceRecoverySaveUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ServiceRecoverySaveUseCasePage.jsx`);
  } else {
    ok(`Service recovery save use-case page component exists`);
  }

  if (!fs.existsSync(serviceRecoverySaveHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/service-recovery-save-hero.svg`);
  } else {
    ok(`Service recovery save use-case hero asset exists`);
  }

  if (!fs.existsSync(warrantyClaimIntakeUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/WarrantyClaimIntakeUseCasePage.jsx`);
  } else {
    ok(`Warranty claim intake use-case page component exists`);
  }

  if (!fs.existsSync(warrantyClaimIntakeHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/warranty-claim-intake-hero.svg`);
  } else {
    ok(`Warranty claim intake use-case hero asset exists`);
  }

  if (!fs.existsSync(changeOrderApprovalUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/ChangeOrderApprovalUseCasePage.jsx`);
  } else {
    ok(`Change order approval use-case page component exists`);
  }

  if (!fs.existsSync(changeOrderApprovalHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/change-order-approval-hero.svg`);
  } else {
    ok(`Change order approval use-case hero asset exists`);
  }

  if (!fs.existsSync(jobKickoffPacketUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/JobKickoffPacketUseCasePage.jsx`);
  } else {
    ok(`Job kickoff packet use-case page component exists`);
  }

  if (!fs.existsSync(jobKickoffPacketHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/job-kickoff-packet-hero.svg`);
  } else {
    ok(`Job kickoff packet use-case hero asset exists`);
  }

  if (!fs.existsSync(weatherDelayUpdateUseCasePagePath)) {
    fail(`Missing use-case page component: src/components/WeatherDelayUpdateUseCasePage.jsx`);
  } else {
    ok(`Weather delay update use-case page component exists`);
  }

  if (!fs.existsSync(weatherDelayUpdateHeroPath)) {
    fail(`Missing use-case hero asset: public/use-cases/weather-delay-update-hero.svg`);
  } else {
    ok(`Weather delay update use-case hero asset exists`);
  }
}

function main() {
  if (!fs.existsSync(vercelConfigPath)) {
    fail(`Missing vercel.json`);
    return;
  }

  const vercelConfig = readJson(vercelConfigPath);
  if (!vercelConfig) return;

  verifyVercelHeaders(vercelConfig);
  verifyVercelRoutes(vercelConfig);
  verifyRobotsTxt();
  verifySitemap();
  verifySpaRouteWiring();
  verifyUseCaseAssets();

  if (process.exitCode) {
    // eslint-disable-next-line no-console
    console.error('\nUse-case verification failed.');
  }
}

main();
