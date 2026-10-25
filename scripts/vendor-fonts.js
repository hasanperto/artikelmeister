// Inter ve Space Grotesk fontlarını fonts/ klasörüne kopyalar (offline / APK için).
// Kullanım: npm run fonts
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'fonts');

const FONTS = [
  { pkg: '@fontsource-variable/inter', family: 'Inter', subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'] },
  { pkg: '@fontsource-variable/space-grotesk', family: 'Space Grotesk', subsets: ['latin', 'latin-ext'] }
];

fs.mkdirSync(OUT, { recursive: true });
let css = '/* Otomatik üretildi: scripts/vendor-fonts.js — elle düzenlemeyin */\n';

FONTS.forEach(({ pkg, family, subsets }) => {
  const dir = path.join(ROOT, 'node_modules', pkg);
  const src = fs.readFileSync(path.join(dir, 'wght.css'), 'utf8');
  const blocks = src.match(/\/\* [^*]+ \*\/\s*@font-face\s*{[^}]+}/g) || [];
  blocks.forEach((block) => {
    const file = block.match(/url\(\.\/files\/([^)]+)\)/)[1];
    const subset = subsets.find((s) => file.includes(`-${s}-wght-normal`));
    if (!subset) return;
    fs.copyFileSync(path.join(dir, 'files', file), path.join(OUT, file));
    css += '\n' + block
      .replace(/font-family: '[^']+'/, `font-family: '${family}'`)
      .replace('./files/', './') + '\n';
  });
});

fs.writeFileSync(path.join(OUT, 'fonts.css'), css);
console.log('Fontlar hazır →', path.relative(ROOT, OUT));
