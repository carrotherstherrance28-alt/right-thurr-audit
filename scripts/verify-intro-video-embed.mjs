import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const mainSource = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../src/styles/app.css', import.meta.url), 'utf8');

const videoPath = '/media/thurr-solutions-lead-system-intro.mp4';
const posterPath = '/media/thurr-solutions-lead-system-intro-poster.jpg';
const failures = [];

if (!mainSource.includes(`src: '${videoPath}'`)) {
  failures.push(`Intro video source is not locked to ${videoPath}.`);
}

if (!mainSource.includes(`poster: '${posterPath}'`)) {
  failures.push(`Intro video poster is not locked to ${posterPath}.`);
}

if (!existsSync(join(repoRoot, 'public', videoPath.replace(/^\//, '')))) {
  failures.push(`Missing public video asset at public${videoPath}.`);
}

if (!existsSync(join(repoRoot, 'public', posterPath.replace(/^\//, '')))) {
  failures.push(`Missing public poster asset at public${posterPath}.`);
}

if (!/function HomePage[\s\S]*<VisualIntroVideoSection \/>[\s\S]*<VisualAuditCta/.test(mainSource)) {
  failures.push('Homepage does not render the intro video section before the audit CTA.');
}

if (!/function VisualIntroVideoSection\(\)[\s\S]*<IntroVideoStage \/>/.test(mainSource)) {
  failures.push('Intro video section does not render IntroVideoStage.');
}

if (!/fetch\(introVideo\.src,\s*\{\s*method:\s*'HEAD'\s*\}\)/.test(mainSource)) {
  failures.push('Intro video stage does not verify asset availability with a HEAD request.');
}

if (!/<video[\s\S]*className="video-player"[\s\S]*poster=\{introVideo\.poster\}[\s\S]*<source src=\{introVideo\.src\} type="video\/mp4" \/>/.test(
  mainSource,
)) {
  failures.push('Intro video stage does not render the MP4 player with the poster when ready.');
}

if (!/<div className="video-screen">[\s\S]*Lead System Consultation[\s\S]*Website .* Intake .* Follow-up .* Managed automation/.test(
  mainSource,
)) {
  failures.push('Intro video fallback placeholder is missing or no longer describes the lead system.');
}

if (!/\.intro-video-section[\s\S]*display:\s*grid/.test(cssSource)) {
  failures.push('Intro video section CSS is missing a stable responsive grid.');
}

if (!/\.video-player[\s\S]*aspect-ratio:\s*16\s*\/\s*9/.test(cssSource)) {
  failures.push('Video player CSS is missing a stable 16:9 aspect ratio.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Intro video embed verified.');
