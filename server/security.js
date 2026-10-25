const bcrypt = require('bcryptjs');

const IS_PROD = process.env.NODE_ENV === 'production';
const WEAK_PASSWORDS = ['admin', 'admin123', 'password', '123456', 'changeme'];

// Temel güvenlik başlıkları (helmet yerine bağımlılıksız minimal sürüm).
// Mevcut arayüz inline onclick/style kullandığı için 'unsafe-inline' gerekli;
// yine de dış kaynaklı script yüklemeyi ve veri sızdırmayı engeller.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  // Kullanıcının kendi anahtarıyla tarayıcıdan doğrudan AI çağrısı (AI Koç)
  "connect-src 'self' https://generativelanguage.googleapis.com https://api.anthropic.com https://api.minimax.io",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'"
].join('; ');

function securityHeaders(_req, res, next) {
  res.set({
    'Content-Security-Policy': CSP,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  });
  if (IS_PROD) res.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  next();
}

// Basit bellek içi brute-force koruması: IP başına pencere içinde başarısız deneme sınırı
function createLoginLimiter({ windowMs = 15 * 60 * 1000, maxFailures = 5 } = {}) {
  const attempts = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(key);
    }
  }, windowMs).unref();

  function entryFor(ip) {
    const now = Date.now();
    let entry = attempts.get(ip);
    if (!entry || entry.resetAt <= now) {
      entry = { failures: 0, resetAt: now + windowMs };
      attempts.set(ip, entry);
    }
    return entry;
  }

  return {
    middleware(req, res, next) {
      const entry = entryFor(req.ip);
      if (entry.failures >= maxFailures) {
        const retrySec = Math.ceil((entry.resetAt - Date.now()) / 1000);
        res.set('Retry-After', String(retrySec));
        return res.status(429).json({
          error: `Çok fazla başarısız deneme. ${Math.ceil(retrySec / 60)} dakika sonra tekrar deneyin.`
        });
      }
      next();
    },
    fail(req) { entryFor(req.ip).failures++; },
    reset(req) { attempts.delete(req.ip); }
  };
}

// Genel istek sınırlayıcı (IP başına pencere içinde en fazla `max` istek)
function createRateLimiter({ windowMs, max, message }) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, e] of hits) if (e.resetAt <= now) hits.delete(ip);
  }, windowMs).unref();
  return (req, res, next) => {
    const now = Date.now();
    let e = hits.get(req.ip);
    if (!e || e.resetAt <= now) {
      e = { count: 0, resetAt: now + windowMs };
      hits.set(req.ip, e);
    }
    if (++e.count > max) {
      res.set('Retry-After', String(Math.ceil((e.resetAt - now) / 1000)));
      return res.status(429).json({ error: message || 'Çok fazla istek. Biraz sonra tekrar deneyin.' });
    }
    next();
  };
}

function isWeakPassword(pw) {
  return !pw || pw.length < 10 || WEAK_PASSWORDS.includes(pw.toLowerCase());
}

// Production'da zayıf/eksik yapılandırmayla açılmayı reddeder; geliştirmede uyarır
function checkStartupConfig(db) {
  const problems = [];
  const envUser = process.env.ADMIN_USERNAME || 'admin';
  const envPass = process.env.ADMIN_PASSWORD;

  const admins = db.prepare('SELECT id, username, password_hash FROM admins').all();
  admins.forEach((a) => {
    if (!WEAK_PASSWORDS.some((pw) => bcrypt.compareSync(pw, a.password_hash))) return;
    // .env'de güçlü bir şifre varsa zayıf hash'i onunla değiştir
    if (a.username === envUser && !isWeakPassword(envPass)) {
      db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(envPass, 10), a.id);
      console.log(`"${a.username}" admin şifresi .env'deki ADMIN_PASSWORD ile güncellendi.`);
      return;
    }
    problems.push(`"${a.username}" admin hesabı varsayılan/zayıf bir şifre kullanıyor — .env'de güçlü ADMIN_PASSWORD (en az 10 karakter) tanımlayın.`);
  });

  if (!problems.length) return;

  const msg = problems.map((p) => `  - ${p}`).join('\n');
  if (IS_PROD) {
    console.error(`\nGüvenlik yapılandırması hatalı, sunucu başlatılmadı:\n${msg}\n`);
    process.exit(1);
  }
  console.warn(`\n⚠️  Güvenlik uyarısı (production'da sunucu açılmaz):\n${msg}\n`);
}

module.exports = { IS_PROD, securityHeaders, createLoginLimiter, createRateLimiter, checkStartupConfig, isWeakPassword };
