const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { IS_PROD } = require('../security');

const WEAK_SECRETS = ['dev-secret-change-me', 'degistir-bunu-guclu-bir-anahtar-yap'];

function resolveSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 32 && !WEAK_SECRETS.includes(secret)) return secret;

  if (IS_PROD) {
    console.error('\nJWT_SECRET tanımsız, varsayılan veya 32 karakterden kısa — sunucu başlatılmadı.');
    console.error('Üretmek için: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"\n');
    process.exit(1);
  }
  console.warn('⚠️  JWT_SECRET güçlü değil — geliştirme için geçici rastgele anahtar kullanılıyor (yeniden başlatınca oturumlar düşer).');
  return crypto.randomBytes(48).toString('hex');
}

const JWT_SECRET = resolveSecret();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkisiz erişim' });
  }
  try {
    req.admin = jwt.verify(header.slice(7), JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h', algorithm: 'HS256' });
}

module.exports = { authMiddleware, signToken };
