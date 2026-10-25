const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'artikelmeister.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY,
      word TEXT NOT NULL,
      article TEXT NOT NULL CHECK(article IN ('der','die','das')),
      tr TEXT NOT NULL,
      en TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      difficulty INTEGER NOT NULL DEFAULT 1,
      suffix TEXT,
      is_exception INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS suffix_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article TEXT NOT NULL CHECK(article IN ('der','die','das')),
      suffix TEXT NOT NULL,
      example TEXT NOT NULL,
      desc TEXT NOT NULL,
      priority INTEGER NOT NULL DEFAULT 50,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS category_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article TEXT NOT NULL CHECK(article IN ('der','die','das')),
      category TEXT NOT NULL,
      examples_json TEXT NOT NULL DEFAULT '[]',
      icon TEXT NOT NULL DEFAULT '📂',
      priority INTEGER NOT NULL DEFAULT 50,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS exceptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      article TEXT NOT NULL CHECK(article IN ('der','die','das')),
      category TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT '⚠️',
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS cases_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sentence_pre TEXT NOT NULL,
      word TEXT NOT NULL,
      suffix TEXT DEFAULT '',
      sentence_post TEXT DEFAULT '',
      tr TEXT NOT NULL,
      base_article TEXT NOT NULL,
      declined_article TEXT NOT NULL,
      declined_noun TEXT,
      case_name TEXT NOT NULL,
      focus_word TEXT,
      explanation TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      icon TEXT NOT NULL,
      xp INTEGER NOT NULL DEFAULT 10,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS levels (
      level INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      title_tr TEXT NOT NULL,
      xp_required INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT '💡',
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS daily_tips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT '💡',
      text TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
  `);
}

initSchema();

function migrateSchema() {
  const wordCols = db.prepare('PRAGMA table_info(words)').all().map((c) => c.name);
  if (!wordCols.includes('translations_json')) {
    db.exec('ALTER TABLE words ADD COLUMN translations_json TEXT');
    const rows = db.prepare('SELECT id, word, tr, en FROM words').all();
    const upd = db.prepare('UPDATE words SET translations_json = ? WHERE id = ?');
    rows.forEach((r) => {
      upd.run(JSON.stringify({
        tr: r.tr,
        en: r.en,
        de: r.word,
        uk: '',
        ar: ''
      }), r.id);
    });
  }

  // Eski seed uk/ar alanlarına Türkçe metin yazıyordu — bunları boşalt
  const row = db.prepare("SELECT value FROM meta WHERE key = 'migration_clear_fake_uk_ar'").get();
  if (!row) {
    const rows = db.prepare('SELECT id, tr, translations_json FROM words').all();
    const upd = db.prepare('UPDATE words SET translations_json = ? WHERE id = ?');
    let cleared = 0;
    db.transaction(() => {
      rows.forEach((r) => {
        let t;
        try { t = JSON.parse(r.translations_json || '{}'); } catch { return; }
        let changed = false;
        ['uk', 'ar'].forEach((lang) => {
          if (t[lang] && t[lang] === (t.tr || r.tr)) { t[lang] = ''; changed = true; }
        });
        if (changed) { upd.run(JSON.stringify(t), r.id); cleared++; }
      });
      db.prepare("INSERT INTO meta (key, value) VALUES ('migration_clear_fake_uk_ar', '1')").run();
    })();
    if (cleared) console.log(`${cleared} kelimede Türkçe kopyası olan uk/ar çevirisi temizlendi.`);
  }
}

migrateSchema();

// Silinen kelimelerin ID'leri tekrar kullanılmaz (istemci ilerlemesi ID ile tutulur)
function syncWordIdSeq() {
  const maxId = db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM words').get().m;
  const seq = parseInt(getMeta('word_id_seq', '0'), 10) || 0;
  if (maxId > seq) setMeta('word_id_seq', maxId);
}

function nextWordId() {
  return db.transaction(() => {
    const maxId = db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM words').get().m;
    const seq = parseInt(getMeta('word_id_seq', '0'), 10) || 0;
    const next = Math.max(maxId, seq) + 1;
    setMeta('word_id_seq', next);
    return next;
  })();
}

function getMeta(key, fallback = null) {
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get(key);
  return row ? row.value : fallback;
}

function setMeta(key, value) {
  db.prepare(`
    INSERT INTO meta (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, String(value));
}

function bumpContentVersion() {
  const v = parseInt(getMeta('content_version', '0'), 10) + 1;
  setMeta('content_version', String(v));
  setMeta('updated_at', new Date().toISOString());
  return v;
}

syncWordIdSeq();

module.exports = { db, getMeta, setMeta, bumpContentVersion, nextWordId, syncWordIdSeq };
