require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { db } = require('./db');
const { seedIfEmpty } = require('./seed');
const { securityHeaders, checkStartupConfig } = require('./security');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const aiRoutes = require('./routes/ai');

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT = path.join(__dirname, '..');
const app = express();

seedIfEmpty();
checkStartupConfig(db);

// Nginx arkasında gerçek istemci IP'si (rate limit için)
app.set('trust proxy', process.env.TRUST_PROXY || 'loopback');
app.disable('x-powered-by');

app.use(securityHeaders);

// CORS: varsayılan olarak yalnızca aynı origin; gerekirse CORS_ORIGINS=a.com,b.com
const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
if (corsOrigins.length) app.use('/api', cors({ origin: corsOrigins }));

// Salt okunur içerik uçları her origin'e açık (Android uygulaması https://localhost'tan erişir)
app.use(['/api/health', '/api/version', '/api/bundle', '/api/daily-tips'], cors({ methods: ['GET'] }));

// AI Koç: uygulama (https://localhost) erişebilsin diye CORS açık; küçük gövde sınırı,
// IP sınırı ve günlük bütçe routes/ai.js içinde. Genel JSON ayrıştırıcıdan önce bağlanır.
app.use('/api/ai', cors({ methods: ['GET', 'POST'] }), express.json({ limit: '20kb' }), aiRoutes);

app.use(express.json({ limit: '2mb' }));

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Bulunamadı' }));

// Yalnızca istemci dosyaları sunulur — server/, .env, veritabanı vb. asla dışarı açılmaz
const staticOpts = { dotfiles: 'deny', index: false };
app.get(['/', '/index.html'], (_req, res) => res.sendFile(path.join(ROOT, 'index.html')));
app.use('/js', express.static(path.join(ROOT, 'js'), staticOpts));
app.use('/css', express.static(path.join(ROOT, 'css'), staticOpts));
app.use('/data', express.static(path.join(ROOT, 'data'), staticOpts));
app.use('/fonts', express.static(path.join(ROOT, 'fonts'), { ...staticOpts, maxAge: '30d' }));
app.use('/admin', express.static(path.join(ROOT, 'admin'), { dotfiles: 'deny', index: 'index.html' }));

app.get('/favicon.ico', (_req, res) => res.status(204).end());

app.use((_req, res) => res.status(404).send('Bulunamadı'));

// Yakalanmamış hatalar: istemciye iç detay sızdırmadan JSON döner
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Geçersiz JSON' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'İstek çok büyük' });
  }
  if (err.code?.startsWith?.('SQLITE_CONSTRAINT')) {
    return res.status(400).json({ error: 'Veri kısıtlamasına uymuyor (zorunlu alan eksik veya geçersiz değer)' });
  }
  console.error(`[${req.method} ${req.originalUrl}]`, err);
  res.status(err.status || 500).json({ error: 'Sunucu hatası' });
});

app.listen(PORT, () => {
  console.log(`ArtikelMeister çalışıyor → http://localhost:${PORT}`);
  console.log(`Yönetim paneli → http://localhost:${PORT}/admin`);
});
