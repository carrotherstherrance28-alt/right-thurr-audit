import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(`✗ ${message}`);
  process.exit(1);
}

function ok(message) {
  // eslint-disable-next-line no-console
  console.log(`✓ ${message}`);
}

function assertSlug(slug) {
  if (!slug) fail('Missing --slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(`Invalid slug: ${slug} (use lowercase letters, numbers, and hyphens)`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    fail(`${path.relative(repoRoot, filePath)} is not valid JSON: ${err.message}`);
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function ensureLaneRouteInVercelJson({ slug }) {
  const vercelPath = path.join(repoRoot, 'vercel.json');
  if (!fs.existsSync(vercelPath)) fail('Missing vercel.json at repo root');

  const config = readJson(vercelPath);
  const routes = Array.isArray(config.routes) ? config.routes : [];

  const src = `/diagnostic/${slug}`;
  const dest = `/diagnostic/${slug}.html`;

  const already = routes.find((r) => r?.src === src && r?.dest === dest);
  if (already) return { changed: false };

  const fsHandleIdx = routes.findIndex((r) => r?.handle === 'filesystem');
  const insertAt = fsHandleIdx === -1 ? 0 : fsHandleIdx + 1;
  routes.splice(insertAt, 0, { src, dest });

  config.routes = routes;
  writeJson(vercelPath, config);
  ok(`Updated vercel.json routes: ${src} -> ${dest}`);
  return { changed: true };
}

function createLaneHtml({ slug, title, description, canonicalOrigin }) {
  const htmlPath = path.join(repoRoot, 'diagnostic', `${slug}.html`);
  if (fs.existsSync(htmlPath)) fail(`Lane HTML already exists: diagnostic/${slug}.html`);

  const canonicalUrl = `${canonicalOrigin.replace(/\/$/, '')}/diagnostic/${slug}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  const keywords = slug.replaceAll('-', ', ');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${safeDescription}" />
    <meta
      name="keywords"
      content="${escapeHtml(keywords)}, AI automation, lead intake automation, follow-up workflows, Thurr Solutions"
    />
    <meta name="author" content="Thurr Solutions" />
    <meta name="application-name" content="Thurr Solutions" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="Thurr Solutions" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:image:alt" content="Thurr Solutions R and T monogram logo." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="/og-image.png" />
    <meta name="twitter:image:alt" content="Thurr Solutions R and T monogram logo." />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#D9621F" />
    <title>${safeTitle}</title>
  </head>
  <body data-brand="right-thurr">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

  fs.writeFileSync(htmlPath, html, 'utf8');
  ok(`Created diagnostic/${slug}.html`);
}

function main() {
  const slug = getArgValue('--slug');
  const title = getArgValue('--title');
  const description = getArgValue('--description');

  assertSlug(slug);
  if (!title) fail('Missing --title');
  if (!description) fail('Missing --description');

  const lanesPath = path.join(repoRoot, 'diagnostic', 'lanes.json');
  if (!fs.existsSync(lanesPath)) fail('Missing diagnostic/lanes.json');

  const lanesConfig = readJson(lanesPath);
  const canonicalOrigin = String(lanesConfig?.canonicalOrigin ?? '').trim();
  if (!canonicalOrigin) fail('diagnostic/lanes.json missing canonicalOrigin');

  const lanes = Array.isArray(lanesConfig?.lanes) ? lanesConfig.lanes : [];
  if (lanes.some((l) => l?.slug === slug)) fail(`Lane already exists in diagnostic/lanes.json: ${slug}`);

  lanes.push({ slug, title, description });
  lanesConfig.lanes = lanes;
  writeJson(lanesPath, lanesConfig);
  ok(`Updated diagnostic/lanes.json`);

  createLaneHtml({ slug, title, description, canonicalOrigin });
  ensureLaneRouteInVercelJson({ slug });
}

main();
