import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lanesConfigPath = path.join(repoRoot, 'diagnostic', 'lanes.json');
const distRoot = path.join(repoRoot, 'dist');

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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  ok(`${label}`);
  return true;
}

function assertMatches({ haystack, regex, label }) {
  if (!regex.test(haystack)) {
    fail(`${label}: did not match ${regex}`);
    return false;
  }
  ok(`${label}`);
  return true;
}

function loadLanes() {
  if (!fs.existsSync(lanesConfigPath)) {
    fail(`Missing diagnostic/lanes.json`);
    return [];
  }

  const config = readJson(lanesConfigPath);
  if (!config) return [];

  const canonicalOrigin = String(config?.canonicalOrigin ?? '').trim().replace(/\/$/, '');
  if (!canonicalOrigin) {
    fail(`diagnostic/lanes.json missing canonicalOrigin`);
    return [];
  }

  const lanes = Array.isArray(config?.lanes) ? config.lanes : [];
  return lanes.map((lane) => {
    const slug = lane?.slug;
    return {
      slug,
      htmlPath: path.join(distRoot, 'diagnostic', `${slug}.html`),
      canonicalUrl: `${canonicalOrigin}/diagnostic/${slug}`,
      title: lane?.title,
      description: lane?.description,
    };
  });
}

function verifyLaneDistHtml(lane) {
  if (!lane.slug) {
    fail(`Lane is missing slug in diagnostic/lanes.json`);
    return;
  }
  if (!lane.title) {
    fail(`Lane ${lane.slug} is missing title in diagnostic/lanes.json`);
    return;
  }
  if (!lane.description) {
    fail(`Lane ${lane.slug} is missing description in diagnostic/lanes.json`);
    return;
  }

  if (!fs.existsSync(lane.htmlPath)) {
    fail(`dist missing lane HTML: ${path.relative(repoRoot, lane.htmlPath)}`);
    return;
  }

  const html = readText(lane.htmlPath);
  ok(`dist lane file exists: dist/diagnostic/${lane.slug}.html`);

  assertMatches({
    haystack: html,
    regex: /<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>/i,
    label: `dist ${lane.slug} robots meta`,
  });

  assertIncludes({
    haystack: html,
    needle: `<link rel="canonical" href="${lane.canonicalUrl}" />`,
    label: `dist ${lane.slug} canonical link`,
  });

  assertIncludes({
    haystack: html,
    needle: `<title>${lane.title}</title>`,
    label: `dist ${lane.slug} title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+name=["']description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `dist ${lane.slug} meta description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:title" content="${lane.title}" />`,
    label: `dist ${lane.slug} og:title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+property=["']og:description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `dist ${lane.slug} og:description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:url" content="${lane.canonicalUrl}" />`,
    label: `dist ${lane.slug} og:url`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:type" content="website" />`,
    label: `dist ${lane.slug} og:type`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:title" content="${lane.title}" />`,
    label: `dist ${lane.slug} twitter:title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+name=["']twitter:description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `dist ${lane.slug} twitter:description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:card" content="summary_large_image" />`,
    label: `dist ${lane.slug} twitter:card`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:image" content="/og-image.png" />`,
    label: `dist ${lane.slug} og:image`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:image" content="/og-image.png" />`,
    label: `dist ${lane.slug} twitter:image`,
  });

  assertMatches({
    haystack: html,
    regex: /<script\s+type=["']module["']\s+crossorigin\s+src=["']\/assets\/main-[^"']+\.js["']\s*><\/script>/i,
    label: `dist ${lane.slug} loads bundled JS`,
  });

  assertMatches({
    haystack: html,
    regex: /<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["']\/assets\/main-[^"']+\.css["']\s*\/?>/i,
    label: `dist ${lane.slug} loads bundled CSS`,
  });
}

function verifyDistIndexHtml() {
  const indexPath = path.join(distRoot, 'diagnostic', 'index.html');
  if (!fs.existsSync(indexPath)) {
    fail(`dist missing diagnostic index: dist/diagnostic/index.html`);
    return;
  }

  const html = readText(indexPath);
  ok(`dist diagnostic index exists: dist/diagnostic/index.html`);

  assertMatches({
    haystack: html,
    regex: /<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>/i,
    label: `dist diagnostic index robots meta`,
  });

  assertMatches({
    haystack: html,
    regex: /<link\s+rel=["']canonical["']\s+href=["']https:\/\/thurrsolutions\.com\/diagnostic["']\s*\/?>/i,
    label: `dist diagnostic index canonical link`,
  });

  assertMatches({
    haystack: html,
    regex: /<title>Diagnostic Lanes\s*\|\s*Thurr Solutions<\/title>/i,
    label: `dist diagnostic index title`,
  });

  assertMatches({
    haystack: html,
    regex: /<script\s+type=["']module["']\s+crossorigin\s+src=["']\/assets\/main-[^"']+\.js["']\s*><\/script>/i,
    label: `dist diagnostic index loads bundled JS`,
  });
}

if (!fs.existsSync(distRoot)) {
  fail(`Missing dist/ (run build first)`);
} else {
  for (const lane of loadLanes()) verifyLaneDistHtml(lane);
  verifyDistIndexHtml();
}

if (process.exitCode) {
  // eslint-disable-next-line no-console
  console.error('\nDiagnostic dist verification failed.');
  process.exit(1);
} else {
  ok('All diagnostic dist checks passed.');
}
