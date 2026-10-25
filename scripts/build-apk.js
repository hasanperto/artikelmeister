// Tek komutla APK: www hazırla → cap sync → gradle → dist/ArtikelMeister-<sürüm>-<tür>.apk
// Kullanım: node scripts/build-apk.js [debug|release]
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const ANDROID = path.join(ROOT, 'android');
const type = (process.argv[2] || 'release').toLowerCase();
if (!['debug', 'release'].includes(type)) throw new Error('Tür debug veya release olmalı');

function javaMajor(home) {
  const bin = path.join(home, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
  if (!fs.existsSync(bin)) return 0;
  const out = spawnSync(bin, ['-version'], { encoding: 'utf8' }).stderr || '';
  const m = out.match(/version "(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

// Capacitor 8 + Gradle 8.14 için JDK 21–24 gerekir
function findJdk() {
  const ok = (home) => home && javaMajor(home) >= 21 && javaMajor(home) <= 24;
  const candidates = [process.env.ARTIKEL_JAVA_HOME, process.env.JAVA_HOME];
  const jdksDir = path.join(os.homedir(), '.jdks');
  if (fs.existsSync(jdksDir)) {
    fs.readdirSync(jdksDir).sort().reverse().forEach((d) => candidates.push(path.join(jdksDir, d)));
  }
  ['C:/Program Files/Eclipse Adoptium', 'C:/Program Files/Microsoft', 'C:/Program Files/Java', '/usr/lib/jvm']
    .filter(fs.existsSync)
    .forEach((dir) => fs.readdirSync(dir).forEach((d) => candidates.push(path.join(dir, d))));
  const found = candidates.find(ok);
  if (!found) throw new Error('JDK 21 bulunamadı. Kurun veya ARTIKEL_JAVA_HOME ile yolunu verin.');
  return found;
}

function findSdk() {
  const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT
    || path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'Library'), 'Android', 'Sdk');
  if (!fs.existsSync(sdk)) throw new Error('Android SDK bulunamadı. ANDROID_HOME tanımlayın.');
  return sdk;
}

function run(cmd, args, opts = {}) {
  console.log(`\n› ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
}

// Her derleme yeni sürüm: versionCode +1 ve yama numarası +1 (örn. 2.0.3 → 2.0.4).
// ARTIKEL_VERSION=2.1.0 ile sürüm adı elle verilebilir. Sürüm yalnızca derleme başarılı olursa kaydedilir.
const CONFIG_FILE = path.join(ROOT, 'mobile.config.json');
const mobileConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

function nextVersion(cfg) {
  const code = (parseInt(cfg.versionCode, 10) || 0) + 1;
  if (process.env.ARTIKEL_VERSION) return { version: process.env.ARTIKEL_VERSION, versionCode: code };
  const [major = 1, minor = 0, patch = 0] = String(cfg.version || '1.0.0').split('.').map((n) => parseInt(n, 10) || 0);
  return { version: `${major}.${minor}.${patch + 1}`, versionCode: code };
}

const { version, versionCode } = nextVersion(mobileConfig);
console.log(`Sürüm: ${mobileConfig.version} (${mobileConfig.versionCode}) → ${version} (${versionCode})`);

const javaHome = findJdk();
const sdk = findSdk();
console.log(`JDK: ${javaHome}\nSDK: ${sdk}`);

if (type === 'release' && !fs.existsSync(path.join(ANDROID, 'keystore.properties'))) {
  throw new Error('android/keystore.properties yok — release imzası için önce: npm run apk:keystore');
}

run('node', [path.join(__dirname, 'build-ai-core.js')], { cwd: ROOT });
const versionEnv = { ...process.env, ARTIKEL_APP_VERSION: version, ARTIKEL_APP_VERSION_CODE: String(versionCode) };
run('node', [path.join(__dirname, 'build-mobile.js')], { cwd: ROOT, env: versionEnv });
run('npx', ['cap', 'sync', 'android'], { cwd: ROOT });

const env = { ...process.env, JAVA_HOME: javaHome, ANDROID_HOME: sdk };
const gradlew = path.join(ANDROID, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
const task = type === 'release' ? 'assembleRelease' : 'assembleDebug';
run(gradlew, [task, '--no-daemon', `-PappVersionName=${version}`, `-PappVersionCode=${versionCode}`], { cwd: ANDROID, env });

const apk = path.join(ANDROID, 'app', 'build', 'outputs', 'apk', type, `app-${type}.apk`);
const dist = path.join(ROOT, 'dist');
fs.mkdirSync(dist, { recursive: true });
const target = path.join(dist, `ArtikelMeister-${version}-b${versionCode}-${type}.apk`);
fs.copyFileSync(apk, target);

// Derleme başarılı: yeni sürümü kaydet ve dist/builds.log'a ekle
fs.writeFileSync(CONFIG_FILE, JSON.stringify({ ...mobileConfig, version, versionCode }, null, 2) + '\n');
fs.appendFileSync(path.join(dist, 'builds.log'),
  `${new Date().toISOString()}  ${version} (${versionCode})  ${type}  ${path.basename(target)}\n`);
console.log(`\n✓ APK hazır: ${path.relative(ROOT, target)} (${(fs.statSync(target).size / 1048576).toFixed(1)} MB)`);
