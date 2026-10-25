// AI Koç görevleri — ortama bağımsız: istemler, şemalar, girdi doğrulama ve sonuç düzeltmeleri.
// Sunucu (server/ai-coach.js) ve uygulama (js/ai-coach.js, kullanıcının kendi anahtarıyla) aynı kodu kullanır.
const { z } = require('zod');

const LANG_NAMES = { tr: 'Turkish', en: 'English', de: 'German', uk: 'Ukrainian', ar: 'Arabic' };
const WORD_RE = /^[\p{L}][\p{L}\-']{0,39}$/u;
const ARTS = ['der', 'die', 'das', 'den', 'dem', 'des'];
const CASES = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
// Model hal adını İngilizce/Türkçe yazarsa Almanca adına çevir
const CASE_ALIASES = {
  nom: 'Nominativ', yal: 'Nominativ',
  akk: 'Akkusativ', acc: 'Akkusativ', bel: 'Akkusativ',
  dat: 'Dativ', yön: 'Dativ',
  gen: 'Genitiv', ila: 'Genitiv', ilg: 'Genitiv'
};

const Article = z.enum(['der', 'die', 'das']);

const ExplainSchema = z.object({
  rule: z.string(),
  trick: z.string(),
  mistake_note: z.string(),
  examples: z.array(z.object({ article: Article, word: z.string() }))
});

const LookupSchema = z.object({
  is_noun: z.boolean(),
  word: z.string(),
  article: Article.nullable(),
  translation: z.string(),
  plural: z.string(),
  rule: z.string(),
  trick: z.string(),
  example_de: z.string(),
  example_translation: z.string(),
  confidence: z.enum(['high', 'medium', 'low'])
});

const SentenceSchema = z.object({
  items: z.array(z.object({
    word: z.string(),
    sentence: z.string(),
    answer: z.string(),
    options: z.array(z.string()),
    case: z.string(),
    translation: z.string(),
    explanation: z.string()
  }))
});

const AnalysisSchema = z.object({
  summary: z.string(),
  patterns: z.array(z.string()),
  advice: z.array(z.string())
});

const PingSchema = z.object({ ok: z.boolean() });

function badRequest(msg) {
  return Object.assign(new Error(msg), { status: 400 });
}

function cleanWord(w) {
  const s = String(w || '').trim().replace(/^(der|die|das)\s+/i, '');
  if (!WORD_RE.test(s)) throw badRequest('Geçersiz kelime');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cleanLang(l) {
  return LANG_NAMES[l] ? l : 'tr';
}

function cleanArticle(a) {
  return ['der', 'die', 'das'].includes(a) ? a : null;
}

function normalizeCase(name) {
  const key = String(name || '').trim().toLowerCase().slice(0, 3);
  return CASE_ALIASES[key] || String(name || '').trim();
}

/**
 * Sözlük bağlamı satırları (AI'ın uydurmasını azaltır).
 * @param {{entry?: {article, word, tr, en, category}, exception?: {article, category}, suffixes?: Array<{suffix, article, desc}>}} c
 */
function contextLines({ entry, exception, suffixes = [] }) {
  const lines = [];
  if (entry) lines.push(`Dictionary entry: ${entry.article} ${entry.word} (tr: ${entry.tr}, en: ${entry.en}, category: ${entry.category})`);
  if (exception) lines.push(`Known exception (${exception.article}): ${exception.category}`);
  suffixes.slice(0, 2).forEach((s) => lines.push(`Suffix rule ${s.suffix} → ${s.article}: ${s.desc}`));
  return lines;
}

const TUTOR = (lang) => `You are a friendly, precise German teacher who specialises in noun genders (der/die/das).
Write every explanation in ${LANG_NAMES[lang]} (German words and example sentences stay in German).
Be concise: each text field is at most 2 short sentences. Never invent a rule; if no rule applies, say the noun must be memorised and give a memory trick.
Reply with JSON only.`;

// ── Görev tanımları ──
const TASKS = {
  // 1) Yanlış cevaptan sonra püf noktası
  explain: {
    prepare(input) {
      const p = {
        word: cleanWord(input.word),
        article: cleanArticle(input.article),
        chosen: cleanArticle(input.chosen),
        lang: cleanLang(input.lang)
      };
      if (!p.article) throw badRequest('Geçersiz artikel');
      return p;
    },
    cacheKey: (p) => ['explain', p.lang, p.article, p.word, p.chosen || ''],
    request: (p, ctx) => ({
      schema: ExplainSchema,
      maxTokens: 1024,
      system: TUTOR(p.lang),
      user: `The learner answered "${p.chosen || '?'} ${p.word}" but the correct form is "${p.article} ${p.word}".
${ctx.lines.join('\n') || 'No dictionary entry.'}

Return JSON:
{
  "rule": "why ${p.word} takes ${p.article} (the rule, suffix, category, or compound rule that applies)",
  "trick": "a short, memorable tip or mnemonic (püf noktası) so the learner never forgets ${p.article} ${p.word}",
  "mistake_note": "why ${p.chosen || 'the other article'} is a tempting but wrong choice here",
  "examples": [{ "article": "${p.article}", "word": "..." }]  // 3 common nouns with the same article and the same rule
}`
    }),
    finalize: (data) => ({ ...data, examples: data.examples.slice(0, 4) })
  },

  // 2) Artikel Dedektifi: herhangi bir kelime
  lookup: {
    prepare: (input) => ({ word: cleanWord(input.word), lang: cleanLang(input.lang) }),
    cacheKey: (p) => ['lookup', p.lang, p.word.toLowerCase()],
    request: (p, ctx) => ({
      schema: LookupSchema,
      maxTokens: 1024,
      system: TUTOR(p.lang),
      user: `Analyse the German word "${p.word}".
${ctx.lines.join('\n') || 'No dictionary entry.'}

Return JSON:
{
  "is_noun": true,                 // false if it is not a German noun
  "word": "singular noun, capitalised, without article",
  "article": "der" | "die" | "das" | null,   // null only if not a noun
  "translation": "translation in ${LANG_NAMES[p.lang]}",
  "plural": "plural with article, e.g. die Tische (or '—' if none)",
  "rule": "which rule decides the article, or that it must be memorised",
  "trick": "short memory trick",
  "example_de": "simple A1-B1 German sentence using the noun",
  "example_translation": "that sentence in ${LANG_NAMES[p.lang]}",
  "confidence": "high" | "medium" | "low"
}`
    }),
    // Sözlükte kayıtlı artikel her zaman esas alınır
    finalize: (data, p, ctx) => {
      const out = ctx.dictArticle && data.article !== ctx.dictArticle
        ? { ...data, article: ctx.dictArticle, is_noun: true, confidence: 'high' }
        : { ...data };
      out.inDictionary = !!ctx.dictArticle;
      return out;
    }
  },

  // 3) Cümle Ustası: zayıf kelimelerle hal alıştırması
  sentences: {
    prepare(input) {
      const list = (Array.isArray(input.words) ? input.words : []).slice(0, 6)
        .map((w) => ({ word: cleanWord(w?.word), article: cleanArticle(w?.article) }))
        .filter((w) => w.article);
      if (!list.length) throw badRequest('Kelime listesi boş');
      return { list, lang: cleanLang(input.lang) };
    },
    cacheKey: null,
    request: (p) => ({
      schema: SentenceSchema,
      maxTokens: 3000,
      system: TUTOR(p.lang),
      user: `Create one fill-in-the-blank exercise per noun to practise German cases (mix Nominativ, Akkusativ, Dativ and some Genitiv).
Nouns: ${p.list.map((w) => `${w.article} ${w.word}`).join(', ')}

Rules:
- "sentence": a natural A2-B1 German sentence where the article before the noun is replaced by "___" (exactly one blank).
- "answer": the correctly declined definite article that fills the blank (der/die/das/den/dem/des).
- "options": exactly 4 distinct choices from der, die, das, den, dem, des, including the answer.
- "translation": the full sentence translated to ${LANG_NAMES[p.lang]}.
- "explanation": why this case and this article (e.g. "mit + Dativ → dem").

Return JSON: { "items": [{ "word", "sentence", "answer", "options", "case", "translation", "explanation" }] }`
    }),
    finalize(data) {
      const items = data.items
        .map((it) => ({
          ...it,
          case: normalizeCase(it.case),
          answer: it.answer.toLowerCase().trim(),
          options: [...new Set(it.options.map((o) => o.toLowerCase().trim()))]
        }))
        .filter((it) => ARTS.includes(it.answer) && it.sentence.includes('___'))
        .map((it) => {
          const opts = it.options.filter((o) => ARTS.includes(o));
          if (!opts.includes(it.answer)) opts.unshift(it.answer);
          ARTS.forEach((a) => { if (opts.length < 4 && !opts.includes(a)) opts.push(a); });
          return { ...it, options: opts.slice(0, 4) };
        });
      if (!items.length) throw new Error('AI geçerli alıştırma üretemedi, tekrar deneyin');
      return { items };
    }
  },

  // 4) Tur sonu kişisel hata analizi
  analyze: {
    prepare(input) {
      const list = (Array.isArray(input.mistakes) ? input.mistakes : []).slice(0, 20)
        .map((m) => ({ word: cleanWord(m?.word), article: cleanArticle(m?.article), chosen: cleanArticle(m?.chosen) }))
        .filter((m) => m.article);
      if (!list.length) throw badRequest('Hata listesi boş');
      return { list, total: parseInt(input.total, 10) || 10, lang: cleanLang(input.lang) };
    },
    cacheKey: null,
    request: (p) => ({
      schema: AnalysisSchema,
      maxTokens: 1500,
      system: TUTOR(p.lang),
      user: `A learner finished a quiz with ${p.list.length} mistakes out of ${p.total} questions.
Mistakes (correct → learner's answer):
${p.list.map((m) => `- ${m.article} ${m.word} → ${m.chosen || '?'}`).join('\n')}

Find patterns (e.g. confuses -e endings, ignores compound rule, exceptions) and give practical advice.
Return JSON: { "summary": "1-2 encouraging sentences", "patterns": ["max 3"], "advice": ["max 3 concrete next steps"] }`
    }),
    finalize: (data) => ({ ...data, patterns: data.patterns.slice(0, 3), advice: data.advice.slice(0, 3) })
  },

  // Anahtar testi: en küçük geçerli istek
  ping: {
    prepare: () => ({ lang: 'en' }),
    cacheKey: null,
    request: () => ({
      schema: PingSchema,
      maxTokens: 64,
      system: 'Reply with JSON only.',
      user: 'Return exactly: {"ok": true}'
    }),
    finalize: (data) => data
  }
};

/**
 * Bir görevi çalıştırır.
 * @param {string} name   explain | lookup | sentences | analyze | ping
 * @param {object} input  Ham girdi (doğrulanır)
 * @param {object} deps
 * @param {(req) => Promise<{data, provider}>} deps.chat     Sağlayıcı çağrısı
 * @param {(word) => {lines: string[], dictArticle?: string}} [deps.context]  Sözlük bağlamı
 * @param {{get(parts), set(parts, data, provider)}} [deps.cache]
 * @param {() => void} [deps.budget]  AI çağrısından önce çağrılır (sınır aşılırsa hata fırlatır)
 */
async function runTask(name, input, { chat, context, cache, budget }) {
  const task = TASKS[name];
  if (!task) throw badRequest('Bilinmeyen görev');
  const p = task.prepare(input || {});
  const ctx = p.word && context ? context(p.word) : { lines: [] };
  const keyParts = task.cacheKey && cache ? task.cacheKey(p) : null;

  if (keyParts) {
    const hit = cache.get(keyParts);
    if (hit) return { data: task.finalize(hit.data, p, ctx), provider: hit.provider, cached: true };
  }
  if (budget) budget();
  const res = await chat(task.request(p, ctx));
  if (keyParts) cache.set(keyParts, res.data, res.provider);
  return { data: task.finalize(res.data, p, ctx), provider: res.provider, cached: false };
}

module.exports = { runTask, contextLines, cleanWord, LANG_NAMES, TASKS };
