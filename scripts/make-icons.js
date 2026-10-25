// Uygulama ikonu ve splash kaynak görsellerini assets/ altına üretir.
// Ardından: npx capacitor-assets generate --android
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const OUT = path.join(__dirname, '..', 'assets');
fs.mkdirSync(OUT, { recursive: true });

const BG = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1440"/>
      <stop offset="1" stop-color="#0a0a1a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <rect width="1024" height="1024" fill="url(#glow)"/>`;

// der / die / das renklerinde üç çubuk + vurgu noktaları (merkez 1024 tuvalde)
function mark(scale = 1) {
  const s = scale;
  const cx = 512;
  const bar = (y, w, color) => {
    const x = cx - (w * s) / 2;
    return `<rect x="${x}" y="${cx + (y - 512) * s}" width="${w * s}" height="${96 * s}" rx="${48 * s}" fill="${color}"/>
      <circle cx="${x + 48 * s}" cy="${cx + (y - 512 + 48) * s}" r="${22 * s}" fill="#ffffff" fill-opacity="0.9"/>`;
  };
  return bar(332, 520, '#4A9EFF') + bar(464, 440, '#FF6B9D') + bar(596, 360, '#4ADE80');
}

const svg = (body, size = 1024) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">${body}</svg>`);

async function main() {
  await sharp(svg(BG + mark(1))).png().toFile(path.join(OUT, 'icon-only.png'));
  await sharp(svg(BG)).png().toFile(path.join(OUT, 'icon-background.png'));
  // Uyarlanabilir ikonda ön plan; Android ayrıca %16.7 kenar boşluğu ekler
  await sharp(svg(mark(1.2))).png().toFile(path.join(OUT, 'icon-foreground.png'));

  const splash = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732" viewBox="0 0 2732 2732">
    <rect width="2732" height="2732" fill="#0a0a1a"/>
    <g transform="translate(1110 1110) scale(0.5)">${BG.replace('<rect width="1024" height="1024" fill="url(#bg)"/>', '<rect width="1024" height="1024" rx="230" fill="url(#bg)"/>').replace('<rect width="1024" height="1024" fill="url(#glow)"/>', '')}${mark(1)}</g>
  </svg>`);
  await sharp(splash).png().toFile(path.join(OUT, 'splash.png'));
  await sharp(splash).png().toFile(path.join(OUT, 'splash-dark.png'));
  // Android 12+ sistem splash ikonu (daire maskesine sığacak kadar küçük)
  await sharp(svg(mark(0.85))).png().toFile(path.join(OUT, 'splash-icon.png'));
  const resDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', 'drawable-nodpi');
  if (fs.existsSync(path.dirname(resDir))) {
    fs.mkdirSync(resDir, { recursive: true });
    fs.copyFileSync(path.join(OUT, 'splash-icon.png'), path.join(resDir, 'splash_icon.png'));
  }
  console.log('İkon ve splash kaynakları →', path.relative(process.cwd(), OUT));
}

main().catch((e) => { console.error(e); process.exit(1); });
