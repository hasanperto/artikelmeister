// AI çekirdeğini (sağlayıcılar + AI Koç görevleri, Anthropic SDK ve zod dahil) tarayıcı paketine derler.
// Çıktı: js/vendor/ai-core.js → window.AICore. Kullanıcının kendi API anahtarıyla cihazdan çağrı için.
// Kullanım: npm run ai:bundle (APK derlemesinde otomatik çalışır)
const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'js', 'vendor', 'ai-core.js');

esbuild.build({
  stdin: {
    contents: `
      const providers = require('./server/ai-core/providers');
      const tasks = require('./server/ai-core/coach-tasks');
      window.AICore = { ...providers, ...tasks };
    `,
    resolveDir: ROOT,
    sourcefile: 'ai-core-entry.js'
  },
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020', 'chrome80'],
  legalComments: 'eof',
  outfile: OUT,
  logLevel: 'warning'
}).then(() => {
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`✓ AI çekirdeği paketlendi → ${path.relative(ROOT, OUT)} (${kb} KB)`);
}).catch(() => process.exit(1));
