const { db, bumpContentVersion } = require('./db');
const { syncWordTranslations, LANGS } = require('./words-helper');
const { callChatAI, CATEGORIES, getSuffixHints, getAiConfig } = require('./ai-word');

async function callChatAIWithRetry(messages, retries = 1) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await callChatAI(messages);
    } catch (err) {
      lastErr = err;
      if (i < retries) await new Promise((r) => setTimeout(r, 800));
    }
  }
  throw lastErr;
}

const CATEGORY_ALIASES = {
  günler: 'days', gunler: 'days', days: 'days', wochentage: 'days', tag: 'days',
  aylar: 'months', months: 'months', monate: 'months',
  mevsimler: 'seasons', seasons: 'seasons', jahreszeiten: 'seasons',
  hava: 'weather', weather: 'weather', 'hava olayları': 'weather',
  yönler: 'directions', directions: 'directions', yonler: 'directions',
  içecekler: 'drinks', drinks: 'drinks', alkollü: 'drinks',
  meyveler: 'food', food: 'food', yiyecek: 'food',
  hayvanlar: 'animals', animals: 'animals', tiere: 'animals',
  meslekler: 'profession', profession: 'profession',
  aile: 'family', family: 'family',
  yerler: 'places', places: 'places', şehir: 'places',
  mobilya: 'furniture', furniture: 'furniture',
  teknoloji: 'technology', technology: 'technology',
  doğa: 'nature', nature: 'nature', doga: 'nature',
  ulaşım: 'transport', transport: 'transport', ulasim: 'transport',
  para: 'money', money: 'money',
  renkler: 'general', metals: 'materials', metaller: 'materials',
  zaman: 'time', time: 'time',
  vücut: 'body', body: 'body', vucut: 'body',
  giyim: 'clothing', clothing: 'clothing',
  hobiler: 'hobbies', hobbies: 'hobbies',
  soyut: 'abstract', abstract: 'abstract',
  okul: 'school', school: 'school',
  insanlar: 'people', people: 'people',
  genel: 'general', general: 'general'
};

const CATEGORY_LABELS = {
  days: 'Günler', months: 'Aylar', seasons: 'Mevsimler', weather: 'Hava olayları',
  directions: 'Yönler', drinks: 'İçecekler', food: 'Yiyecek & Meyve', animals: 'Hayvanlar',
  profession: 'Meslekler', family: 'Aile', places: 'Yerler', furniture: 'Mobilya',
  technology: 'Teknoloji', nature: 'Doğa', transport: 'Ulaşım', money: 'Para',
  time: 'Zaman', body: 'Vücut', clothing: 'Giyim', hobbies: 'Hobiler',
  abstract: 'Soyut kavramlar', school: 'Okul', people: 'İnsanlar', general: 'Genel',
  rooms: 'Odalar', objects: 'Nesneler', materials: 'Materyaller', events: 'Etkinlikler',
  health: 'Sağlık', science: 'Bilim'
};

function normalizeQuery(q) {
  return String(q || '').trim()
    .replace(/\s*\(\d+\s*kelime\)\s*$/i, '')
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
}

function safeJsonArray(val) {
  try { return JSON.parse(val || '[]'); } catch { return []; }
}

function resolveCategory(query) {
  const raw = String(query || '').trim().replace(/\s*\(\d+\s*kelime\)\s*$/i, '');
  const q = normalizeQuery(raw);
  if (!q) throw new Error('Kategori adı girin (örn: Günler, Aylar, Hayvanlar)');

  if (CATEGORIES.includes(q)) {
    return buildCategoryInfo(q, CATEGORY_LABELS[q] || q);
  }

  for (const [alias, key] of Object.entries(CATEGORY_ALIASES)) {
    const na = normalizeQuery(alias);
    if (q === na || q.includes(na) || na.includes(q)) {
      return buildCategoryInfo(key, CATEGORY_LABELS[key] || raw);
    }
  }

  const rule = db.prepare(`
    SELECT * FROM category_rules
    WHERE LOWER(category) LIKE ? OR LOWER(category) LIKE ?
    LIMIT 1
  `).get(`%${raw.toLowerCase()}%`, `%${q}%`);

  if (rule) {
    let examples = [];
    try { examples = JSON.parse(rule.examples_json); } catch { /* */ }
    let key = 'general';
    if (examples[0]) {
      const w = examples[0].replace(/^(der|die|das)\s+/i, '');
      const row = db.prepare('SELECT category FROM words WHERE LOWER(word) = ? LIMIT 1').get(w.toLowerCase());
      if (row) key = row.category;
    }
    return buildCategoryInfo(key, rule.category, rule);
  }

  const wordMatch = db.prepare(`
    SELECT DISTINCT category FROM words
    WHERE LOWER(category) LIKE ? OR LOWER(tr) LIKE ? OR LOWER(en) LIKE ?
    LIMIT 1
  `).get(`%${q}%`, `%${raw}%`, `%${raw}%`);

  if (wordMatch) {
    return buildCategoryInfo(wordMatch.category, CATEGORY_LABELS[wordMatch.category] || raw);
  }

  throw new Error(`"${raw}" kategorisi bulunamadı. Örnek: Günler, Aylar, Hayvanlar, Meslekler`);
}

function buildCategoryInfo(key, label, rule = null) {
  const existingWords = db.prepare(`
    SELECT id, word, article, tr, en, category, difficulty, suffix, is_exception
    FROM words WHERE category = ? AND active = 1 ORDER BY word
  `).all(key);

  const ruleRow = rule || db.prepare(`
    SELECT * FROM category_rules WHERE article = (
      SELECT article FROM words WHERE category = ? LIMIT 1
    ) LIMIT 1
  `).get(key);

  const categoryRules = db.prepare(`
    SELECT category, article, examples_json, icon, priority FROM category_rules
  `).all().filter((r) => {
    try {
      const ex = JSON.parse(r.examples_json);
      return ex.some((e) => {
        const w = e.replace(/^(der|die|das)\s+/i, '');
        return existingWords.some((ew) => ew.word.toLowerCase() === w.toLowerCase());
      });
    } catch { return false; }
  });

  const matchedRule = categoryRules.find((r) => normalizeQuery(r.category).includes(normalizeQuery(label)))
    || categoryRules[0] || ruleRow;

  const wordList = existingWords.map((w) => w.word);
  const cases = wordList.length ? db.prepare(`
    SELECT id, word, case_name, sentence_pre, declined_article
    FROM cases_exercises WHERE active = 1 AND LOWER(word) IN (${wordList.map(() => '?').join(',')})
  `).all(...wordList.map((w) => w.toLowerCase())) : [];

  return {
    key,
    label: label || CATEGORY_LABELS[key] || key,
    articleHint: matchedRule?.article || null,
    ruleDescription: matchedRule?.category || null,
    ruleExamples: matchedRule ? safeJsonArray(matchedRule.examples_json) : [],
    existingWords,
    existingCases: cases,
    wordCount: existingWords.length,
    caseCount: cases.length
  };
}

function getCategoryCatalog() {
  const counts = db.prepare(`
    SELECT category, COUNT(*) AS count FROM words WHERE active = 1 GROUP BY category
  `).all();
  const rules = db.prepare('SELECT category, article, icon, examples_json FROM category_rules WHERE active = 1').all();

  const hasWordInCategory = db.prepare('SELECT 1 FROM words WHERE category = ? AND LOWER(word) = ? LIMIT 1');

  return CATEGORIES.map((key) => {
    const row = counts.find((c) => c.category === key);
    const matchedRules = rules.filter((r) => {
      try {
        const ex = JSON.parse(r.examples_json || '[]');
        return ex.some((e) => {
          const w = e.replace(/^(der|die|das)\s+/i, '');
          return !!hasWordInCategory.get(key, w.toLowerCase());
        });
      } catch { return false; }
    });
    return {
      key,
      label: CATEGORY_LABELS[key] || key,
      wordCount: row?.count || 0,
      rules: matchedRules.map((r) => ({ name: r.category, icon: r.icon, article: r.article }))
    };
  }).sort((a, b) => b.wordCount - a.wordCount);
}

function mapCaseExercise(c) {
  return {
    sentence_pre: c.sentencePre || c.sentence_pre || '',
    word: c.word,
    suffix: c.suffix || '',
    sentence_post: c.sentencePost || c.sentence_post || '',
    tr: c.tr,
    base_article: c.baseArticle || c.base_article,
    declined_article: c.declinedArticle || c.declined_article,
    declined_noun: c.declinedNoun || c.declined_noun || null,
    case_name: c.caseName || c.case_name,
    focus_word: c.focusWord || c.focus_word || null,
    explanation: c.explanation
  };
}

function mapMissingWord(w, categoryKey) {
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
    category: categoryKey,
    difficulty: Math.min(3, Math.max(1, parseInt(w.difficulty, 10) || 1)),
    suffix: w.suffix || null,
    is_exception: !!w.is_exception,
    reason: w.reason || '',
    priority: w.priority || 'normal'
  };
}

async function auditCategory(query, options = {}) {
  const { includeCases = true, maxNewWords = 20 } = options;
  const info = resolveCategory(query);

  const cfg = getAiConfig();
  if (!cfg) {
    return buildRuleBasedAudit(info, includeCases);
  }

  const existingList = info.existingWords.map((w) => `${w.article} ${w.word} (${w.tr})`).join(', ') || 'yok';
  const casesList = info.existingCases.map((c) => `${c.word}→${c.case_name}`).join(', ') || 'yok';
  const suffixHints = getSuffixHints();

  const systemPrompt = `Sen Almanca öğretim içerik uzmanı ve veritabanı denetçisisin. YALNIZCA geçerli JSON döndür.

Görevin: Verilen kategorideki kelime havuzunu denetlemek, eksik standart kelimeleri bulmak ve tam veri üretmek.
- Almanca A1-B2 seviyesi standart kelimeler
- Tekrar etme: mevcut kelimeleri missing_words'a EKLEME
- category_key sabit kalsın: ${info.key}
- translations: tr, en, de, uk, ar
- ${includeCases ? 'Her yeni kelime için 1-2 hal alıştırması (Akkusativ/Dativ/Nominativ) üret' : 'case_exercises boş dizi'}

Son ek ipuçları:
${suffixHints}`;

  const userPrompt = `Kategori: "${info.label}" (key: ${info.key})
Beklenen artikel ipucu: ${info.articleHint || 'kurala göre'}
Kural örnekleri: ${info.ruleExamples.join(', ') || 'yok'}

VERİTABANINDA MEVCUT KELİMELER (${info.wordCount}):
${existingList}

MEVCUT HAL ALIŞTIRMALARI (${info.caseCount}):
${casesList}

1) Bu kategoride olması gereken TÜM standart kelimeleri düşün
2) Eksikleri missing_words olarak üret (max ${maxNewWords})
3) suggestions: Türkçe iyileştirme önerileri (3-5 madde)
4) coverage_percent: mevcut kapsama yüzdesi (0-100)
5) summary_tr: Türkçe özet (1-2 cümle)

JSON:
{
  "category_key": "${info.key}",
  "category_label": "${info.label}",
  "coverage_percent": 70,
  "summary_tr": "...",
  "existing_words": ["Montag", "..."],
  "missing_words": [{ "word", "article", "translations":{}, "difficulty", "suffix", "is_exception", "reason", "priority" }],
  "case_exercises": [{
    "word", "sentencePre", "sentencePost", "suffix", "tr", "baseArticle", "declinedArticle",
    "declinedNoun", "caseName", "focusWord", "explanation"
  }],
  "suggestions": ["..."]
}`;

  const result = await callChatAIWithRetry([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]);

  const missing = (result.missing_words || [])
    .filter((w) => !info.existingWords.some((e) => e.word.toLowerCase() === w.word?.toLowerCase()))
    .slice(0, maxNewWords)
    .map((w) => mapMissingWord(w, info.key));

  const cases = (result.case_exercises || []).map(mapCaseExercise);

  return formatAuditResponse(info, {
    provider: cfg.provider,
    coverage_percent: result.coverage_percent ?? Math.round((info.wordCount / (info.wordCount + missing.length || 1)) * 100),
    summary_tr: result.summary_tr || `${missing.length} eksik kelime bulundu.`,
    missing_words: missing,
    case_exercises: cases,
    suggestions: result.suggestions || [],
    aiUsed: true
  });
}

function buildRuleBasedAudit(info, includeCases) {
  const expected = getExpectedByCategory(info.key);
  const existingSet = new Set(info.existingWords.map((w) => w.word.toLowerCase()));
  const missingNames = expected.filter((item) => {
    const word = typeof item === 'string' ? item : item.word;
    return !existingSet.has(word.toLowerCase());
  });

  return formatAuditResponse(info, {
    provider: 'rules',
    warning: 'AI anahtarı yok — sabit liste ile eksik tespiti (çeviriler eksik)',
    coverage_percent: expected.length
      ? Math.round((info.wordCount / expected.length) * 100) : 0,
    summary_tr: `${missingNames.length} eksik kelime tespit edildi (kural listesi). AI ile tam veri alın.`,
    missing_words: missingNames.map((item) => {
      const word = typeof item === 'string' ? item : item.word;
      const article = typeof item === 'string' ? (info.articleHint || 'der') : (item.article || info.articleHint || 'der');
      return mapMissingWord({
        word,
        article,
        translations: { tr: word, en: word, de: word, uk: word, ar: word },
        difficulty: 1,
        suffix: null,
        is_exception: false,
        reason: 'Kural listesinden'
      }, info.key);
    }),
    case_exercises: [],
    suggestions: ['MINIMAX_API_KEY ekleyerek tam otomasyonu aktifleştirin', 'Eksik kelimeleri AI ile analiz edip çevirileri doldurun'],
    aiUsed: false
  });
}

function formatAuditResponse(info, data) {
  const missing = data.missing_words || [];
  const cases = data.case_exercises || [];
  return {
    provider: data.provider,
    warning: data.warning || null,
    aiUsed: data.aiUsed ?? false,
    category: { key: info.key, label: info.label, articleHint: info.articleHint },
    coverage: {
      percent: data.coverage_percent ?? 0,
      existing: info.wordCount,
      missing: missing.length
    },
    summary: data.summary_tr || '',
    existing: info.existingWords.map((w) => ({ article: w.article, word: w.word, tr: w.tr })),
    missingWords: missing,
    suggestedCases: cases,
    suggestions: data.suggestions || [],
    stats: {
      existingWords: info.wordCount,
      missingWords: missing.length,
      newCases: cases.length,
      existingCases: info.caseCount
    }
  };
}

function getExpectedByCategory(key) {
  const map = {
    days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Wochentag', { word: 'Wochenende', article: 'das' }],
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    seasons: ['Frühling', 'Sommer', 'Herbst', 'Winter'],
    directions: ['Norden', 'Süden', 'Osten', 'Westen'],
    weather: ['Regen', 'Schnee', 'Wind', 'Wetter', 'Sonne', 'Wolke']
  };
  return map[key] || [];
}

function applyAuditResults(audit, options = {}) {
  const { saveWords = true, saveCases = true } = options;
  const payload = {
    missing_words: audit.missingWords || audit.missing_words || [],
    case_exercises: audit.suggestedCases || audit.case_exercises || [],
    category: audit.category
  };
  const savedWords = [];
  const skippedWords = [];
  const savedCases = [];
  const skippedCases = [];

  const insertWord = db.prepare(`
    INSERT INTO words (id, word, article, tr, en, translations_json, category, difficulty, suffix, is_exception, active)
    VALUES (@id, @word, @article, @tr, @en, @translations_json, @category, @difficulty, @suffix, @is_exception, 1)
  `);

  const insertCase = db.prepare(`
    INSERT INTO cases_exercises (
      sentence_pre, word, suffix, sentence_post, tr, base_article, declined_article,
      declined_noun, case_name, focus_word, explanation, active, sort_order
    ) VALUES (
      @sentence_pre, @word, @suffix, @sentence_post, @tr, @base_article, @declined_article,
      @declined_noun, @case_name, @focus_word, @explanation, 1, @sort_order
    )
  `);

  const tx = db.transaction(() => {
    if (saveWords && payload.missing_words?.length) {
      payload.missing_words.forEach((raw) => {
        const exists = db.prepare('SELECT id FROM words WHERE LOWER(word) = ?').get(raw.word.toLowerCase());
        if (exists) {
          skippedWords.push(raw.word);
          return;
        }
        const body = syncWordTranslations({
          word: raw.word,
          article: raw.article,
          tr: raw.tr || raw.translations?.tr,
          en: raw.en || raw.translations?.en,
          de: raw.de || raw.translations?.de || raw.word,
          uk: raw.uk || raw.translations?.uk,
          ar: raw.ar || raw.translations?.ar,
          category: raw.category || payload.category?.key || 'general',
          difficulty: raw.difficulty || 1,
          suffix: raw.suffix || null,
          is_exception: raw.is_exception ? 1 : 0
        });
        const max = db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM words').get().m;
        body.id = max + 1;
        insertWord.run(body);
        savedWords.push({ id: body.id, word: body.word });
      });
    }

    if (saveCases && payload.case_exercises?.length) {
      const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM cases_exercises').get().m;
      payload.case_exercises.forEach((c, i) => {
        const dup = db.prepare(`
          SELECT id FROM cases_exercises
          WHERE LOWER(word) = ? AND case_name = ? AND declined_article = ? AND sentence_pre = ?
        `).get(
          c.word.toLowerCase(),
          c.case_name,
          c.declined_article,
          c.sentence_pre
        );
        if (dup) {
          skippedCases.push(c.word);
          return;
        }
        insertCase.run({ ...c, sort_order: maxOrder + i + 1 });
        savedCases.push(c.word);
      });
    }
  });

  tx();
  bumpContentVersion();

  return {
    savedWords,
    skippedWords,
    savedCases,
    skippedCases,
    wordsSaved: savedWords.length,
    casesSaved: savedCases.length,
    totalSaved: savedWords.length + savedCases.length
  };
}

module.exports = {
  resolveCategory,
  getCategoryCatalog,
  auditCategory,
  applyAuditResults,
  CATEGORY_LABELS,
  CATEGORY_ALIASES
};
