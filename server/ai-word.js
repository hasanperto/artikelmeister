const { db } = require('./db');
const { LANGS } = require('./words-helper');
const providers = require('./ai-providers');

const CATEGORIES = [
  'people', 'family', 'profession', 'animals', 'furniture', 'school',
  'technology', 'food', 'nature', 'transport', 'days', 'months', 'seasons',
  'weather', 'directions', 'money', 'drinks', 'places', 'rooms', 'abstract',
  'hobbies', 'clothing', 'objects', 'body', 'materials', 'time', 'events',
  'health', 'science', 'general'
];

function getSuffixHints() {
  const rows = db.prepare(`
    SELECT article, suffix, desc, priority FROM suffix_rules WHERE active = 1 ORDER BY priority DESC LIMIT 30
  `).all();
  return rows.map((r) => `${r.suffix} → ${r.article} (${r.desc})`).join('\n');
}

function parseWordList(input) {
  if (Array.isArray(input)) {
    return [...new Set(input.map((w) => String(w).trim()).filter(Boolean))];
  }
  return [...new Set(
    String(input || '')
      .split(/[\n,;]+/)
      .map((w) => w.trim().replace(/^(der|die|das)\s+/i, ''))
      .filter(Boolean)
  )];
}

// Sağlayıcı seçimi ve çağrılar ortak katmanda (Gemini, Claude, MiniMax, OpenAI)
function resolveAiProvider() {
  return providers.resolveProvider();
}

function getAiConfig() {
  const id = providers.resolveProvider();
  return id ? { provider: id, model: providers.providerInfo(id).model } : null;
}

const { parseJsonContent } = providers;

async function callChatAI(messages, provider) {
  const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
  const user = messages.filter((m) => m.role !== 'system').map((m) => m.content).join('\n\n');
  const { data } = await providers.chatJSON({ system, user, provider, maxTokens: 8192 });
  return data;
}

function guessSuffix(word) {
  const w = word.toLowerCase();
  const rules = db.prepare(`
    SELECT article, suffix FROM suffix_rules WHERE active = 1 ORDER BY priority DESC
  `).all();
  for (const r of rules) {
    const s = r.suffix.replace(/^-/, '');
    if (w.endsWith(s)) return { suffix: r.suffix, article: r.article };
  }
  return { suffix: null, article: null };
}

function ruleBasedFallback(word) {
  const clean = word.trim().replace(/^(der|die|das)\s+/i, '');
  const guess = guessSuffix(clean);
  return {
    word: clean,
    article: guess.article || 'der',
    translations: { tr: clean, en: clean, de: clean, uk: clean, ar: clean },
    category: 'general',
    difficulty: 2,
    suffix: guess.suffix,
    is_exception: false,
    reason: 'AI anahtarı yok — kural tabanlı tahmin (çevirileri düzenleyin)',
    ai_generated: false
  };
}

function mapAnalyzedWords(result, provider) {
  const analyzed = (result.words || []).map((w) => {
    const translations = {};
    LANGS.forEach((lang) => {
      translations[lang] = w.translations?.[lang] || (lang === 'de' ? w.word : '');
    });
    return {
      word: w.word,
      article: w.article,
      translations,
      tr: translations.tr,
      en: translations.en,
      de: translations.de,
      uk: translations.uk,
      ar: translations.ar,
      category: CATEGORIES.includes(w.category) ? w.category : 'general',
      difficulty: Math.min(3, Math.max(1, parseInt(w.difficulty, 10) || 2)),
      suffix: w.suffix || null,
      is_exception: !!w.is_exception,
      reason: w.reason || '',
      ai_generated: true
    };
  });
  return { words: analyzed, provider };
}

async function analyzeWordsWithAI(wordsInput) {
  const words = parseWordList(wordsInput).slice(0, 15);
  if (!words.length) throw new Error('En az bir Almanca kelime girin');

  const cfg = getAiConfig();
  if (!cfg) {
    return {
      words: words.map(ruleBasedFallback),
      provider: 'rules',
      warning: 'AI anahtarı yok (GEMINI/ANTHROPIC/MINIMAX/OPENAI) — sadece artikel tahmini yapıldı.'
    };
  }

  const suffixHints = getSuffixHints();
  const systemPrompt = `Sen Almanca artikel (der/die/das) uzmanısın. Verilen Almanca isim(ler) için YALNIZCA geçerli JSON üret, başka metin yazma.
Kurallar:
- word: sadece isim (artikel olmadan), ilk harf büyük
- article: der, die veya das
- translations: tr, en, de, uk, ar — doğal çeviri (de = Almanca kelime)
- category: şunlardan biri: ${CATEGORIES.join(', ')}
- difficulty: 1 (kolay) - 3 (zor)
- suffix: varsa -ung, -chen gibi; yoksa null
- is_exception: genel kurala uymayan kelime ise true
- reason: Türkçe kısa açıklama (neden bu artikel)

Mevcut son ek ipuçları:
${suffixHints}`;

  const userPrompt = `Bu Almanca kelimeleri analiz et: ${words.join(', ')}

JSON formatı:
{
  "words": [
    {
      "word": "Haus",
      "article": "das",
      "translations": { "tr": "Ev", "en": "House", "de": "Haus", "uk": "Будинок", "ar": "منزل" },
      "category": "places",
      "difficulty": 1,
      "suffix": null,
      "is_exception": false,
      "reason": "..."
    }
  ]
}`;

  const result = await callChatAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]);

  return mapAnalyzedWords(result, cfg.provider);
}

// uk/ar (ve varsa tr/en) çevirisi eksik kelimeleri AI ile toplu doldurur
function findWordsMissingTranslations(limit) {
  const rows = db.prepare('SELECT id, word, article, tr, en, translations_json FROM words ORDER BY id').all();
  const missing = rows.filter((r) => {
    let t = {};
    try { t = JSON.parse(r.translations_json || '{}'); } catch { /* */ }
    return ['tr', 'en', 'uk', 'ar'].some((lang) => !String(t[lang] || '').trim());
  });
  return { total: missing.length, batch: limit ? missing.slice(0, limit) : missing };
}

async function fillMissingTranslations(batchSize = 15) {
  const cfg = getAiConfig();
  if (!cfg) throw new Error('Çeviri doldurmak için bir AI anahtarı gerekli (GEMINI_API_KEY, ANTHROPIC_API_KEY veya MINIMAX_API_KEY).');

  const size = Math.min(25, Math.max(1, parseInt(batchSize, 10) || 15));
  const { total, batch } = findWordsMissingTranslations(size);
  if (!batch.length) return { updated: 0, remaining: 0, total: 0 };

  const list = batch.map((r) => `${r.id}: ${r.article} ${r.word} (tr: ${r.tr || '?'}, en: ${r.en || '?'})`).join('\n');
  const result = await callChatAI([
    {
      role: 'system',
      content: 'Sen Almanca-çok dilli sözlük uzmanısın. YALNIZCA geçerli JSON döndür. Her Almanca isim için doğal, kısa sözlük çevirisi ver: tr (Türkçe), en (İngilizce), uk (Ukraynaca, Kiril), ar (Arapça). Artikel ekleme.'
    },
    {
      role: 'user',
      content: `Kelimeler (id: kelime):
${list}

JSON formatı:
{ "items": [ { "id": 1, "tr": "Ev", "en": "House", "uk": "Будинок", "ar": "منزل" } ] }`
    }
  ]);

  const byId = new Map(batch.map((r) => [r.id, r]));
  const upd = db.prepare('UPDATE words SET tr = ?, en = ?, translations_json = ? WHERE id = ?');
  let updated = 0;
  db.transaction(() => {
    (result.items || []).forEach((item) => {
      const row = byId.get(Number(item.id));
      if (!row) return;
      let t = {};
      try { t = JSON.parse(row.translations_json || '{}'); } catch { /* */ }
      const pick = (lang) => String(t[lang] || '').trim() || String(item[lang] || '').trim();
      const next = { ...t, tr: pick('tr'), en: pick('en'), de: t.de || row.word, uk: pick('uk'), ar: pick('ar') };
      if (JSON.stringify(next) === JSON.stringify(t)) return;
      upd.run(next.tr || row.tr, next.en || row.en, JSON.stringify(next), row.id);
      updated++;
    });
  })();

  return { updated, remaining: findWordsMissingTranslations(0).total, total };
}

function getAiStatus() {
  const cfg = getAiConfig();
  return {
    configured: !!cfg,
    provider: cfg?.provider || null,
    model: cfg?.model || null,
    providers: providers.listConfigured().map(providers.providerInfo)
  };
}

module.exports = {
  analyzeWordsWithAI,
  fillMissingTranslations,
  findWordsMissingTranslations,
  parseWordList,
  CATEGORIES,
  getAiStatus,
  getAiConfig,
  resolveAiProvider,
  callChatAI,
  getSuffixHints,
  mapAnalyzedWords,
  parseJsonContent
};
