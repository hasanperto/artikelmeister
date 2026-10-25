const LANGS = ['tr', 'en', 'de', 'uk', 'ar'];

function parseJson(val, fallback = {}) {
  try {
    return typeof val === 'string' ? JSON.parse(val) : (val || fallback);
  } catch {
    return fallback;
  }
}

function buildTranslations(body) {
  const fromJson = parseJson(body.translations_json, {});
  const translations = {
    tr: body.tr ?? fromJson.tr ?? '',
    en: body.en ?? fromJson.en ?? '',
    de: body.de ?? fromJson.de ?? body.word ?? '',
    // Eksik çeviri boş bırakılır (Türkçe ile doldurulmaz); istemci İngilizceye düşer
    uk: body.uk ?? fromJson.uk ?? '',
    ar: body.ar ?? fromJson.ar ?? ''
  };
  return translations;
}

function syncWordTranslations(body) {
  const translations = buildTranslations(body);
  body.tr = translations.tr;
  body.en = translations.en;
  body.translations_json = JSON.stringify(translations);
  return body;
}

function mapWordRow(row) {
  const translations = buildTranslations({
    word: row.word,
    tr: row.tr,
    en: row.en,
    translations_json: row.translations_json
  });
  return {
    id: row.id,
    word: row.word,
    article: row.article,
    tr: translations.tr,
    en: translations.en,
    de: translations.de,
    uk: translations.uk,
    ar: translations.ar,
    translations,
    category: row.category,
    difficulty: row.difficulty,
    suffix: row.suffix || null,
    isException: !!row.is_exception,
    active: row.active
  };
}

function mapWordForApp(row) {
  const w = mapWordRow(row);
  return {
    id: w.id,
    word: w.word,
    article: w.article,
    tr: w.tr,
    en: w.en,
    de: w.de,
    uk: w.uk,
    ar: w.ar,
    translations: w.translations,
    category: w.category,
    difficulty: w.difficulty,
    suffix: w.suffix,
    isException: w.isException
  };
}

module.exports = { LANGS, buildTranslations, syncWordTranslations, mapWordRow, mapWordForApp, parseJson };
