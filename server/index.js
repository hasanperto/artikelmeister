require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { seedIfEmpty } = require('./seed');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();

seedIfEmpty();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'index.html'));
});

app.get('/favicon.ico', (_req, res) => res.status(204).end());

app.listen(PORT, () => {
  console.log(`ArtikelMeister çalışıyor → http://localhost:${PORT}`);
  console.log(`Uygulama      → http://localhost:${PORT}/index.html`);
  console.log(`Yönetim paneli → http://localhost:${PORT}/admin`);
});
