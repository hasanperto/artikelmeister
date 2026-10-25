// Release imza anahtarı üretir: android/artikelmeister-release.jks + android/keystore.properties
// Bu iki dosya git'e eklenmez. KAYBEDERSENİZ aynı uygulamaya güncelleme yayınlayamazsınız — yedekleyin.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ANDROID = path.join(__dirname, '..', 'android');
const jks = path.join(ANDROID, 'artikelmeister-release.jks');
const props = path.join(ANDROID, 'keystore.properties');

if (fs.existsSync(jks) || fs.existsSync(props)) {
  console.log('Anahtar zaten var, üzerine yazılmadı:', path.relative(process.cwd(), jks));
  process.exit(0);
}

const password = crypto.randomBytes(24).toString('base64url');
const javaHome = process.env.JAVA_HOME;
const keytool = javaHome ? path.join(javaHome, 'bin', 'keytool') : 'keytool';

execFileSync(keytool, [
  '-genkeypair', '-v',
  '-keystore', jks,
  '-alias', 'artikelmeister',
  '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000',
  '-storepass', password, '-keypass', password,
  '-dname', 'CN=ArtikelMeister, O=ArtikelMeister, C=TR'
], { stdio: 'inherit' });

fs.writeFileSync(props, [
  '# Release imza bilgileri — GİZLİ, git\'e eklemeyin, güvenli yerde yedekleyin',
  'storeFile=artikelmeister-release.jks',
  `storePassword=${password}`,
  'keyAlias=artikelmeister',
  `keyPassword=${password}`,
  ''
].join('\n'));

console.log('\n✓ İmza anahtarı oluşturuldu. android/artikelmeister-release.jks ve android/keystore.properties dosyalarını YEDEKLEYİN.');
