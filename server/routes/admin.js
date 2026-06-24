const express = require('express');
const bcrypt = require('bcryptjs');
const { db, bumpContentVersion } = require('../db');
const { authMiddleware, signToken } = require('../middleware/auth');
const { syncWordTranslations, mapWordRow } = require('../words-helper');
const { analyzeWordsWithAI, getAiStatus } = require('../ai-word');
const { auditCategory, applyAuditResults, getCategoryCatalog, resolveCategory } = require('../ai-automation');

const router = express.Router();

function parseBody(req) {
  return req.body || {};
}

// ── Auth ──
router.post('/login', (req, res) => {
  const { username, password } = parseBody(req);
  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
  }
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Geçersiz giriş bilgileri' });
  }
  const token = signToken({ id: admin.id, username: admin.username });
  res.json({ token, username: admin.username });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ username: req.admin.username });
});

// ── Dashboard ──
router.get('/stats', authMiddleware, (_req, res) => {
  const count = (table) => db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c;
  res.json({
    words: count('words'),
    suffixRules: count('suffix_rules'),
    categoryRules: count('category_rules'),
    exceptions: count('exceptions'),
    cases: count('cases_exercises'),
    achievements: count('achievements'),
    dailyTips: count('daily_tips')
  });
});

// ── Generic CRUD helper ──
function crudRoutes(config) {
  const { table, fields, jsonFields = [], idField = 'id', beforeSave, mapRow } = config;

  router.get(`/${config.path}`, authMiddleware, (_req, res) => {
    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY ${idField}`).all();
    const mapped = rows.map((row) => {
      if (mapRow) return mapRow(row);
      const out = { ...row };
      jsonFields.forEach((f) => {
        if (out[f]) {
          try { out[f] = JSON.parse(out[f]); } catch { /* keep */ }
        }
      });
      return out;
    });
    res.json(mapped);
  });

  router.post(`/${config.path}`, authMiddleware, (req, res) => {
    let body = { ...parseBody(req) };
    if (beforeSave) body = beforeSave(body);

    let cols = fields.filter((f) => body[f] !== undefined);
    if (!cols.length) return res.status(400).json({ error: 'Boş veri' });

    if (table === 'words' && body.id === undefined) {
      const max = db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM words').get().m;
      body.id = max + 1;
      if (!cols.includes('id')) cols = ['id', ...cols];
    }

    const values = cols.map((c) => {
      if (jsonFields.includes(c) && typeof body[c] === 'object') {
        return JSON.stringify(body[c]);
      }
      return body[c];
    });

    const placeholders = cols.map(() => '?').join(', ');
    const result = db.prepare(
      `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders})`
    ).run(...values);

    bumpContentVersion();
    res.status(201).json({ id: body.id ?? result.lastInsertRowid });
  });

  router.put(`/${config.path}/:id`, authMiddleware, (req, res) => {
    let body = { ...parseBody(req) };
    if (beforeSave) body = beforeSave(body);

    const cols = fields.filter((f) => body[f] !== undefined);
    if (!cols.length) return res.status(400).json({ error: 'Güncellenecek alan yok' });

    const sets = cols.map((c) => `${c} = ?`).join(', ');
    const values = cols.map((c) => {
      if (jsonFields.includes(c) && typeof body[c] === 'object') {
        return JSON.stringify(body[c]);
      }
      return body[c];
    });

    const result = db.prepare(
      `UPDATE ${table} SET ${sets} WHERE ${idField} = ?`
    ).run(...values, req.params.id);

    if (result.changes === 0) return res.status(404).json({ error: 'Kayıt bulunamadı' });
    bumpContentVersion();
    res.json({ ok: true });
  });

  router.delete(`/${config.path}/:id`, authMiddleware, (req, res) => {
    const result = db.prepare(`DELETE FROM ${table} WHERE ${idField} = ?`).run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Kayıt bulunamadı' });
    bumpContentVersion();
    res.json({ ok: true });
  });
}

crudRoutes({
  path: 'words',
  table: 'words',
  idField: 'id',
  mapRow: mapWordRow,
  beforeSave: syncWordTranslations,
  fields: [
    'id', 'word', 'article', 'tr', 'en', 'translations_json',
    'category', 'difficulty', 'suffix', 'is_exception', 'active'
  ],
  jsonFields: ['translations_json']
});

crudRoutes({
  path: 'suffix-rules',
  table: 'suffix_rules',
  fields: ['article', 'suffix', 'example', 'desc', 'priority', 'active']
});

crudRoutes({
  path: 'category-rules',
  table: 'category_rules',
  fields: ['article', 'category', 'examples_json', 'icon', 'priority', 'active'],
  jsonFields: ['examples_json']
});

crudRoutes({
  path: 'exceptions',
  table: 'exceptions',
  fields: ['word', 'article', 'category', 'icon', 'active']
});

crudRoutes({
  path: 'cases',
  table: 'cases_exercises',
  fields: [
    'sentence_pre', 'word', 'suffix', 'sentence_post', 'tr', 'base_article',
    'declined_article', 'declined_noun', 'case_name', 'focus_word', 'explanation',
    'active', 'sort_order'
  ]
});

crudRoutes({
  path: 'achievements',
  table: 'achievements',
  idField: 'id',
  fields: ['slug', 'title', 'desc', 'icon', 'xp', 'active']
});

crudRoutes({
  path: 'levels',
  table: 'levels',
  idField: 'level',
  fields: ['level', 'title', 'title_tr', 'xp_required']
});

crudRoutes({
  path: 'tips',
  table: 'tips',
  fields: ['title', 'text', 'icon', 'sort_order', 'active']
});

crudRoutes({
  path: 'daily-tips',
  table: 'daily_tips',
  fields: ['lang', 'icon', 'text', 'active']
});

// ── JSON blobs (case examples, compound rule) ──
router.get('/content-json/:key', authMiddleware, (req, res) => {
  const allowed = ['case_examples', 'compound_rule'];
  if (!allowed.includes(req.params.key)) {
    return res.status(400).json({ error: 'Geçersiz anahtar' });
  }
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get(req.params.key);
  let data = {};
  try { data = JSON.parse(row?.value || '{}'); } catch { /* */ }
  res.json(data);
});

router.put('/content-json/:key', authMiddleware, (req, res) => {
  const allowed = ['case_examples', 'compound_rule'];
  if (!allowed.includes(req.params.key)) {
    return res.status(400).json({ error: 'Geçersiz anahtar' });
  }
  db.prepare(`
    INSERT INTO meta (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(req.params.key, JSON.stringify(req.body || {}));
  bumpContentVersion();
  res.json({ ok: true });
});

// ── AI Kelime Ekleme ──
router.get('/ai/status', authMiddleware, (_req, res) => {
  res.json(getAiStatus());
});

router.post('/ai/analyze', authMiddleware, async (req, res) => {
  try {
    const { words, text } = parseBody(req);
    const input = words ?? text;
    const result = await analyzeWordsWithAI(input);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/ai/save-words', authMiddleware, (req, res) => {
  const { words } = parseBody(req);
  if (!Array.isArray(words) || !words.length) {
    return res.status(400).json({ error: 'Kaydedilecek kelime yok' });
  }

  const insert = db.prepare(`
    INSERT INTO words (id, word, article, tr, en, translations_json, category, difficulty, suffix, is_exception, active)
    VALUES (@id, @word, @article, @tr, @en, @translations_json, @category, @difficulty, @suffix, @is_exception, 1)
  `);

  const saved = [];
  const tx = db.transaction(() => {
    words.forEach((raw) => {
      const body = syncWordTranslations({
        word: raw.word,
        article: raw.article,
        tr: raw.tr || raw.translations?.tr,
        en: raw.en || raw.translations?.en,
        de: raw.de || raw.translations?.de,
        uk: raw.uk || raw.translations?.uk,
        ar: raw.ar || raw.translations?.ar,
        category: raw.category || 'general',
        difficulty: raw.difficulty || 2,
        suffix: raw.suffix || null,
        is_exception: raw.is_exception ? 1 : 0
      });
      const max = db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM words').get().m;
      body.id = max + 1;
      insert.run(body);
      saved.push(body.id);
    });
  });

  try {
    tx();
    bumpContentVersion();
    res.json({ ok: true, saved, count: saved.length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── AI Kategori Otomasyonu ──
router.get('/ai/categories', authMiddleware, (_req, res) => {
  res.json(getCategoryCatalog());
});

router.post('/ai/audit-category', authMiddleware, async (req, res) => {
  try {
    const { query, category, includeCases = true, maxNewWords = 20 } = parseBody(req);
    const q = query || category;
    if (!q) return res.status(400).json({ error: 'Kategori adı gerekli (örn: Günler)' });
    const result = await auditCategory(q, { includeCases, maxNewWords });
    res.json(result);
  } catch (err) {
    console.error('audit-category error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post('/ai/apply-audit', authMiddleware, (req, res) => {
  try {
    const { audit, saveWords = true, saveCases = true } = parseBody(req);
    if (!audit) return res.status(400).json({ error: 'Audit verisi gerekli' });
    const result = applyAuditResults(audit, { saveWords, saveCases });
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/ai/preview-category/:query', authMiddleware, (req, res) => {
  try {
    const info = resolveCategory(req.params.query);
    res.json(info);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
