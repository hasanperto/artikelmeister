const { db } = require('./db');
const { LANGS } = require('./words-helper');

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

function resolveAiProvider() {
  const forced = (process.env.AI_PROVIDER || '').toLowerCase();
  if (forced === 'minimax' || forced === 'openai') return forced;
  if (process.env.MINIMAX_API_KEY) return 'minimax';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

function getAiConfig() {
  const provider = resolveAiProvider();
  if (provider === 'minimax') {
    return {
      provider: 'minimax',
      apiKey: process.env.MINIMAX_API_KEY,
      baseUrl: (process.env.MINIMAX_BASE_URL || 'https://api.minimax.io/v1').replace(/\/$/, ''),
      model: process.env.MINIMAX_MODEL || 'MiniMax-M3'
    };
  }
  if (provider === 'openai') {
    return {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
    };
  }
  return null;
}

function extractBalancedJson(str, start = 0) {
  if (str[start] !== '{') return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < str.length; i++) {
    const c = str[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (c === '\\') escape = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') { inString = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return str.slice(start, i + 1);
    }
  }
  return null;
}

function findJsonObjects(text) {
  const objects = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      const chunk = extractBalancedJson(text, i);
      if (chunk) {
        objects.push(chunk);
        i += chunk.length - 1;
      }
    }
  }
  return objects;
}

function parseJsonContent(content) {
  let text = String(content || '').trim();
  if (!text) throw new Error('AI boş yanıt döndü');

  // MiniMax M3 thinking bloğu JSON'dan önce gelir
  text = text
    .replace(/<think>[\s\S]*?<\/redacted_thinking>/gi, '')
    .replace(/[\s\S]*?<\/think>/gi, '')
    .trim();

  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(text);
  } catch { /* devam */ }

  const candidates = findJsonObjects(text);
  for (let i = candidates.length - 1; i >= 0; i--) {
    try {
      const parsed = JSON.parse(candidates[i]);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch { /* önceki adayı dene */ }
  }

  throw new Error('AI yanıtı JSON olarak ayrıştırılamadı');
}

async function callChatAI(messages) {
  const cfg = getAiConfig();
  if (!cfg?.apiKey) {
    throw new Error('AI anahtarı yok. .env dosyasına MINIMAX_API_KEY veya OPENAI_API_KEY ekleyin.');
  }

  const body = {
    model: cfg.model,
    temperature: 0.2,
    max_tokens: 8192,
    messages
  };

  // OpenAI ve MiniMax OpenAI-uyumlu endpoint JSON modunu destekler
  body.response_format = { type: 'json_object' };

  const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data.error?.message || data.base_resp?.status_msg || data.message || `AI API hatası (${res.status})`;
    throw new Error(msg);
  }

  const content = data.choices?.[0]?.message?.content;
  return parseJsonContent(content);
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
      warning: 'MINIMAX_API_KEY veya OPENAI_API_KEY yok — sadece artikel tahmini yapıldı.'
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

function getAiStatus() {
  const cfg = getAiConfig();
  return {
    configured: !!cfg,
    provider: cfg?.provider || null,
    model: cfg?.model || null
  };
}

module.exports = {
  analyzeWordsWithAI,
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
