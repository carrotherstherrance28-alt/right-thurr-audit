import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lanesConfigPath = path.join(repoRoot, 'diagnostic', 'lanes.json');

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
      htmlPath: path.join(repoRoot, 'diagnostic', `${slug}.html`),
      canonicalUrl: `${canonicalOrigin}/diagnostic/${slug}`,
      title: lane?.title,
      description: lane?.description,
    };
  });
}

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

function verifyLane(lane) {
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
    fail(`Lane HTML missing: ${lane.htmlPath}`);
    return;
  }

  const html = readText(lane.htmlPath);

  ok(`Lane file exists: diagnostic/${lane.slug}.html`);

  assertMatches({
    haystack: html,
    regex: /<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>/i,
    label: `${lane.slug} robots meta`,
  });

  assertIncludes({
    haystack: html,
    needle: `<link rel="canonical" href="${lane.canonicalUrl}" />`,
    label: `${lane.slug} canonical link`,
  });

  assertIncludes({
    haystack: html,
    needle: `<title>${lane.title}</title>`,
    label: `${lane.slug} title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+name=["']description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `${lane.slug} meta description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:title" content="${lane.title}" />`,
    label: `${lane.slug} og:title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+property=["']og:description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `${lane.slug} og:description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:url" content="${lane.canonicalUrl}" />`,
    label: `${lane.slug} og:url`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:type" content="website" />`,
    label: `${lane.slug} og:type`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:title" content="${lane.title}" />`,
    label: `${lane.slug} twitter:title`,
  });

  assertMatches({
    haystack: html,
    regex: new RegExp(
      `<meta\\s+name=["']twitter:description["'][^>]*content=["']${escapeRegExp(lane.description)}["'][^>]*\\/?>`,
      'i',
    ),
    label: `${lane.slug} twitter:description`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:card" content="summary_large_image" />`,
    label: `${lane.slug} twitter:card`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta property="og:image" content="/og-image.png" />`,
    label: `${lane.slug} og:image`,
  });

  assertIncludes({
    haystack: html,
    needle: `<meta name="twitter:image" content="/og-image.png" />`,
    label: `${lane.slug} twitter:image`,
  });

  assertMatches({
    haystack: html,
    regex: /<script\s+type=["']module["']\s+src=["']\/src\/main\.jsx["']\s*><\/script>/i,
    label: `${lane.slug} loads /src/main.jsx`,
  });
}

function verifyLegacyQueryRedirect() {
  const mainPath = path.join(repoRoot, 'src', 'main.jsx');
  if (!fs.existsSync(mainPath)) {
    fail(`Missing src/main.jsx`);
    return;
  }

  const main = readText(mainPath);

  assertIncludes({
    haystack: main,
    needle: "params.get('diagnostic')",
    label: `SPA handles legacy ?diagnostic=`,
  });

  assertMatches({
    haystack: main,
    regex: /replaceLocationPathname\(\s*`\/diagnostic\/\$\{legacySlug\}`\s*\)/,
    label: `SPA normalizes legacy diagnostic path`,
  });
}

function verifyDiagnosticIndexHtml() {
  const indexPath = path.join(repoRoot, 'diagnostic', 'index.html');
  if (!fs.existsSync(indexPath)) {
    fail(`Missing diagnostic/index.html`);
    return;
  }

  const html = readText(indexPath);
  ok(`Diagnostic index file exists: diagnostic/index.html`);

  assertMatches({
    haystack: html,
    regex: /<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>/i,
    label: `diagnostic index robots meta`,
  });

  assertMatches({
    haystack: html,
    regex: /<link\s+rel=["']canonical["']\s+href=["']https:\/\/thurrsolutions\.com\/diagnostic["']\s*\/?>/i,
    label: `diagnostic index canonical link`,
  });

  assertMatches({
    haystack: html,
    regex: /<title>Diagnostic Lanes\s*\|\s*Thurr Solutions<\/title>/i,
    label: `diagnostic index title`,
  });

  assertMatches({
    haystack: html,
    regex: /<script\s+type=["']module["']\s+src=["']\/src\/main\.jsx["']\s*><\/script>/i,
    label: `diagnostic index loads /src/main.jsx`,
  });
}

function verifyVercelConfig() {
  const vercelPath = path.join(repoRoot, 'vercel.json');
  if (!fs.existsSync(vercelPath)) {
    fail(`Missing vercel.json at repo root`);
    return;
  }

  let config;
  try {
    config = JSON.parse(readText(vercelPath));
  } catch (err) {
    fail(`vercel.json is not valid JSON: ${err.message}`);
    return;
  }

  const headerPairs = (config.headers ?? []).flatMap((h) =>
    (h.headers ?? []).map((kv) => ({ source: h.source, key: kv.key, value: kv.value })),
  );

  const mustHaveSources = ['/diagnostic', '/diagnostic/:path*'];
  for (const source of mustHaveSources) {
    const found = headerPairs.find(
      (h) => h.source === source && h.key === 'X-Robots-Tag' && h.value === 'noindex, nofollow',
    );
    if (!found) {
      fail(`vercel.json headers missing X-Robots-Tag noindex for ${source}`);
    } else {
      ok(`vercel.json X-Robots-Tag for ${source}`);
    }
  }

  const routes = config.routes ?? [];
  for (const lane of loadLanes()) {
    if (!lane.slug) continue;
    const src = `/diagnostic/${lane.slug}`;
    const dest = `/diagnostic/${lane.slug}.html`;
    const laneRoute = routes.find((r) => r?.src === src && r?.dest === dest);
    if (!laneRoute) {
      fail(`vercel.json routes missing ${src} -> ${dest}`);
    } else {
      ok(`vercel.json route maps ${lane.slug} lane HTML`);
    }
  }

  const indexRoute = routes.find((r) => r?.src === '/diagnostic/?' && r?.dest === '/diagnostic/index.html');
  if (!indexRoute) {
    fail(`vercel.json routes missing /diagnostic/? -> /diagnostic/index.html`);
  } else {
    ok(`vercel.json route maps diagnostic index HTML`);
  }
}

function verifyRobotsAndSitemap() {
  const robotsPath = path.join(repoRoot, 'public', 'robots.txt');
  const sitemapPath = path.join(repoRoot, 'public', 'sitemap.xml');

  if (!fs.existsSync(robotsPath)) {
    fail(`Missing public/robots.txt`);
  } else {
    const robots = readText(robotsPath);
    assertMatches({
      haystack: robots,
      regex: /^Disallow:\s*\/diagnostic\s*$/m,
      label: `public/robots.txt disallows /diagnostic`,
    });
  }

  if (!fs.existsSync(sitemapPath)) {
    fail(`Missing public/sitemap.xml`);
  } else {
    const sitemap = readText(sitemapPath);
    if (sitemap.includes('/diagnostic')) {
      fail(`public/sitemap.xml should not include /diagnostic URLs`);
    } else {
      ok(`public/sitemap.xml excludes /diagnostic URLs`);
    }
  }
}

function verifyViteMultiPage() {
  const viteConfigPath = path.join(repoRoot, 'vite.config.js');
  if (!fs.existsSync(viteConfigPath)) {
    fail(`Missing vite.config.js at repo root`);
    return;
  }
  const viteConfigText = readText(viteConfigPath);
  assertIncludes({
    haystack: viteConfigText,
    needle: "diagnostic/lanes.json",
    label: `vite config reads diagnostic/lanes.json`,
  });
}

const LANES = loadLanes();
const laneFilter = getArgValue('--lane');
const lanesToVerify = laneFilter ? LANES.filter((l) => l.slug === laneFilter) : LANES;

if (laneFilter && lanesToVerify.length === 0) {
  fail(`Unknown lane slug: ${laneFilter}`);
} else {
  for (const lane of lanesToVerify) verifyLane(lane);
  verifyVercelConfig();
  verifyRobotsAndSitemap();
  verifyViteMultiPage();
  verifyLegacyQueryRedirect();
  verifyDiagnosticIndexHtml();
}

if (process.exitCode) {
  // eslint-disable-next-line no-console
  console.error('\nDiagnostic lane verification failed.');
  process.exit(1);
} else {
  ok('All diagnostic lane checks passed.');
}
