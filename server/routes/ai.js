// Uygulamaya açık AI Koç uçları (giriş gerektirmez; IP sınırı + günlük bütçe ile korunur)
const express = require('express');
const coach = require('../ai-coach');
const { createRateLimiter } = require('../security');

const router = express.Router();

router.use(createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: parseInt(process.env.AI_PUBLIC_RATE_LIMIT || '60', 10),
  message: 'Çok fazla AI isteği. Birkaç dakika sonra tekrar deneyin.'
}));

router.get('/status', (_req, res) => {
  res.json(coach.status());
});

function handler(task) {
  return async (req, res) => {
    if (!coach.status().enabled) return res.status(503).json({ error: 'AI şu an kullanılamıyor' });
    try {
      const out = await task(req.body || {});
      res.json({ ok: true, provider: out.provider, cached: out.cached, result: out.data });
    } catch (err) {
      const status = err.status || 502;
      if (status >= 500) console.error('AI koç hatası:', err.message);
      res.status(status).json({ error: status >= 500 ? 'AI şu an yanıt veremedi' : err.message });
    }
  };
}

router.post('/explain', handler(coach.explain));
router.post('/lookup', handler(coach.lookup));
router.post('/sentences', handler(coach.sentences));
router.post('/analyze', handler(coach.analyze));

module.exports = router;
