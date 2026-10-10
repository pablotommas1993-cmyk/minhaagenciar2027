const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = 'C:/Users/Pablo Tommas/.gemini/antigravity/brain/540d3038-3b69-4581-931a-856c49e2fa64/.user_uploaded/media_1791643796572_ee509e83.jpg';
const outputDir = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const outputWebp = path.join(outputDir, 'hero-executive-office.webp');
const outputJpg = path.join(outputDir, 'hero-executive-office.jpg');

const width = 1024;
const height = 576;

// SVG mask that transitions from solid black on the left to completely transparent on the right,
// cleans the top navbar area where old static buttons were, and cleans the bottom left
const svgOverlay = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftDarkFade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#050505" stop-opacity="1.0" />
      <stop offset="42%" stop-color="#050505" stop-opacity="1.0" />
      <stop offset="48%" stop-color="#050505" stop-opacity="0.95" />
      <stop offset="54%" stop-color="#050505" stop-opacity="0.6" />
      <stop offset="65%" stop-color="#050505" stop-opacity="0.1" />
      <stop offset="76%" stop-color="#050505" stop-opacity="0.0" />
    </linearGradient>
    <linearGradient id="topNavFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050505" stop-opacity="0.92" />
      <stop offset="10%" stop-color="#050505" stop-opacity="0.8" />
      <stop offset="18%" stop-color="#050505" stop-opacity="0.0" />
      <stop offset="85%" stop-color="#050505" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#050505" stop-opacity="0.95" />
    </linearGradient>
    <radialGradient id="topRightPillFade" cx="87%" cy="6%" r="15%">
      <stop offset="0%" stop-color="#050505" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#050505" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#050505" stop-opacity="0.0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#leftDarkFade)" />
  <rect width="${width}" height="${height}" fill="url(#topNavFade)" />
  <rect width="${width}" height="${height}" fill="url(#topRightPillFade)" />
</svg>
`);

async function run() {
  await sharp(input)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .webp({ quality: 90, effort: 6 })
    .toFile(outputWebp);
  console.log('Saved clean WebP:', fs.statSync(outputWebp).size, 'bytes');

  await sharp(input)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputJpg);
  console.log('Saved clean JPG:', fs.statSync(outputJpg).size, 'bytes');
}

run().catch(console.error);
