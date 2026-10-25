// AI Koç (sunucu): uygulamaya açık AI görevleri. Görev mantığı ortak çekirdekte (ai-core/coach-tasks).
// Maliyet kontrolü: kelime bazlı yanıtlar 30 gün önbelleklenir, günlük AI çağrısı sınırlıdır.
const crypto = require('crypto');
const { db } = require('./db');
const { chatJSON, resolveProvider, listConfigured, providerInfo } = require('./ai-providers');
const { runTask, contextLines } = require('./ai-core/coach-tasks');

db.exec(`
  CREATE TABLE IF NOT EXISTS ai_cache (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    provider TEXT,
    created_at INTEGER NOT NULL
  );
`);

const CACHE_TTL = 30 * 86400000;

// ── Günlük bütçe (önbellekten gelen yanıtlar sayılmaz) ──
const budget = { day: '', used: 0 };
function takeBudget() {
  const day = new Date().toISOString().slice(0, 10);
  if (budget.day !== day) { budget.day = day; budget.used = 0; }
  const limit = parseInt(process.env.AI_PUBLIC_DAILY_LIMIT || '2000', 10);
  if (budget.used >= limit) {
    throw Object.assign(new Error('Günlük AI kullanım sınırına ulaşıldı. Yarın tekrar deneyin.'), { status: 429 });
  }
  budget.used++;
}

// ── Önbellek (sağlayıcıya göre ayrı) ──
function makeCache(providerId) {
  const key = (parts) => crypto.createHash('sha256').update([providerId, ...parts].join('|')).digest('hex');
  return {
    get(parts) {
      const row = db.prepare('SELECT value, provider, created_at FROM ai_cache WHERE key = ?').get(key(parts));
      if (!row || Date.now() - row.created_at > CACHE_TTL) return null;
      try { return { data: JSON.parse(row.value), provider: row.provider }; } catch { return null; }
    },
    set(parts, data, provider) {
      db.prepare(`
        INSERT INTO ai_cache (key, value, provider, created_at) VALUES (?, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, provider = excluded.provider, created_at = excluded.created_at
      `).run(key(parts), JSON.stringify(data), provider, Date.now());
    }
  };
}

// ── Veritabanından bağlam ──
function dbContext(word) {
  const entry = db.prepare(`
    SELECT word, article, tr, en, category FROM words WHERE LOWER(word) = LOWER(?) AND active = 1 LIMIT 1
  `).get(word);
  const exception = db.prepare('SELECT article, category FROM exceptions WHERE LOWER(word) = LOWER(?) AND active = 1 LIMIT 1').get(word);
  const suffixes = db.prepare('SELECT article, suffix, desc FROM suffix_rules WHERE active = 1 ORDER BY priority DESC').all()
    .filter((r) => word.toLowerCase().endsWith(r.suffix.replace(/^-/, '').toLowerCase()));
  return { lines: contextLines({ entry, exception, suffixes }), dictArticle: entry?.article };
}

function run(name) {
  return (input) => {
    const id = resolveProvider(input.provider);
    return runTask(name, input, {
      chat: (req) => chatJSON({ provider: id, ...req }),
      context: dbContext,
      cache: makeCache(id),
      budget: takeBudget
    });
  };
}

function status() {
  const configured = listConfigured();
  const enabled = process.env.AI_PUBLIC_ENABLED !== 'false' && configured.length > 0;
  return {
    enabled,
    default: enabled ? resolveProvider() : null,
    providers: enabled ? configured.map((id) => ({ id, label: providerInfo(id).label })) : []
  };
}

module.exports = {
  explain: run('explain'),
  lookup: run('lookup'),
  sentences: run('sentences'),
  analyze: run('analyze'),
  status
};
