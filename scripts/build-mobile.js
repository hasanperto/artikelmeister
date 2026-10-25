// APK için web dosyalarını www/ altına hazırlar ve Capacitor yapılandırmasını üretir.
// Sunucu adresi: ARTIKEL_API_URL ortam değişkeni veya mobile.config.json → apiUrl
//   - Adres varsa: derleme anında güncel içerik indirilip APK'ya gömülür (offline başlangıç)
//     ve uygulama çevrimiçiyken bu sunucudan yeni içerikleri çeker.
//   - Adres yoksa: APK tamamen offline çalışır (yerel DB veya data/database.js içeriğiyle).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WWW = path.join(ROOT, 'www');

function readMobileConfig() {
  const file = path.join(ROOT, 'mobile.config.json');
  const cfg = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const apiUrl = (process.env.ARTIKEL_API_URL ?? cfg.apiUrl ?? '').trim().replace(/\/$/, '');
  if (apiUrl && !/^https?:\/\//.test(apiUrl)) throw new Error(`Geçersiz apiUrl: ${apiUrl}`);
  return {
    apiUrl,
    // build-apk.js artırılmış sürümü ortam değişkeniyle iletir
    version: process.env.ARTIKEL_APP_VERSION || cfg.version || '0.0.0',
    versionCode: parseInt(process.env.ARTIKEL_APP_VERSION_CODE || cfg.versionCode || 0, 10),
    appId: cfg.appId || 'com.artikelmeister.app',
    appName: cfg.appName || 'ArtikelMeister'
  };
}

function copy(rel) {
  fs.cpSync(path.join(ROOT, rel), path.join(WWW, rel), { recursive: true });
}

async function fetchSnapshot(apiUrl) {
  const res = await fetch(`${apiUrl}/api/bundle`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function localSnapshot() {
  // Yalnızca mevcut bir yerel veritabanı varsa (boş DB oluşturmamak için)
  if (!fs.existsSync(path.join(ROOT, 'server', 'data', 'artikelmeister.db'))) return null;
  return require('../server/bundle').buildBundle();
}

async function buildSnapshot(apiUrl) {
  if (apiUrl) {
    try {
      const b = await fetchSnapshot(apiUrl);
      console.log(`✓ İçerik sunucudan alındı (v${b.meta?.version}, ${b.words?.length} kelime)`);
      return b;
    } catch (e) {
      console.warn(`⚠️  Sunucudan içerik alınamadı (${e.message}) — yerel kaynak deneniyor`);
    }
  }
  const b = localSnapshot();
  if (b) console.log(`✓ İçerik yerel veritabanından alındı (v${b.meta?.version}, ${b.words?.length} kelime)`);
  else console.log('ℹ️  Gömülü anlık görüntü yok — data/database.js kullanılacak');
  return b;
}

function writeCapacitorConfig({ apiUrl, appId, appName }) {
  const config = {
    appId,
    appName,
    webDir: 'www',
    android: {
      // http:// sunucu yalnızca test içindir; production'da https kullanın
      allowMixedContent: apiUrl.startsWith('http://')
    },
    plugins: {
      SplashScreen: {
        launchAutoHide: true,
        launchShowDuration: 3000,
        backgroundColor: '#0a0a1a',
        showSpinner: false
      },
      SystemBars: {
        insetsHandling: 'css',
        style: 'DARK',
        initialViewportFitValueHint: 'cover'
      }
    }
  };
  fs.writeFileSync(path.join(ROOT, 'capacitor.config.json'), JSON.stringify(config, null, 2) + '\n');
}

// http:// sunucu (yalnızca yerel test) için Android'in düz metin trafiği engelini kaldır
function patchAndroidManifest(apiUrl) {
  const manifest = path.join(ROOT, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  if (!fs.existsSync(manifest)) return;
  let xml = fs.readFileSync(manifest, 'utf8').replace(/\s*android:usesCleartextTraffic="true"/, '');
  if (apiUrl.startsWith('http://')) {
    xml = xml.replace('<application', '<application\n        android:usesCleartextTraffic="true"');
    console.warn('⚠️  http:// sunucu adresi — yalnızca test için. Yayın öncesi https kullanın.');
  }
  fs.writeFileSync(manifest, xml);
}

async function main() {
  const cfg = readMobileConfig();

  fs.rmSync(WWW, { recursive: true, force: true });
  fs.mkdirSync(WWW, { recursive: true });
  ['index.html', 'js', 'css', 'fonts', 'data/i18n.js', 'data/database.js'].forEach(copy);

  fs.writeFileSync(
    path.join(WWW, 'js', 'config.js'),
    `// scripts/build-mobile.js tarafından üretildi\nwindow.ARTIKEL_CONFIG = ${JSON.stringify({
      apiUrl: cfg.apiUrl,
      version: cfg.version,
      versionCode: cfg.versionCode
    })};\n`
  );

  const snapshot = await buildSnapshot(cfg.apiUrl);
  if (snapshot) {
    fs.writeFileSync(path.join(WWW, 'data', 'bundle-snapshot.js'), `window.BUNDLE_SNAPSHOT = ${JSON.stringify(snapshot)};\n`);
    const indexPath = path.join(WWW, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8').replace(
      '<script src="js/api-loader.js"></script>',
      '<script src="data/bundle-snapshot.js"></script>\n  <script src="js/api-loader.js"></script>'
    );
    fs.writeFileSync(indexPath, html);
  }

  writeCapacitorConfig(cfg);
  patchAndroidManifest(cfg.apiUrl);
  console.log(cfg.apiUrl
    ? `✓ www/ hazır — çevrimiçi senkron: ${cfg.apiUrl}`
    : '✓ www/ hazır — sunucu adresi yok, uygulama yalnızca offline çalışır');
}

main().catch((e) => { console.error(e); process.exit(1); });
