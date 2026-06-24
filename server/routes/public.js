const express = require('express');
const { buildBundle, buildDailyTips } = require('../bundle');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'ArtikelMeister API' });
});

router.get('/version', (_req, res) => {
  const bundle = buildBundle();
  res.json(bundle.meta);
});

router.get('/bundle', (_req, res) => {
  const bundle = buildBundle();
  res.set('Cache-Control', 'public, max-age=60');
  res.json(bundle);
});

router.get('/daily-tips', (_req, res) => {
  res.json(buildDailyTips());
});

module.exports = router;
