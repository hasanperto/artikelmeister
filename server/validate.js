const ARTICLES = ['der', 'die', 'das'];
const DECLINED_ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines'];

function isBlank(v) {
  return v === undefined || v === null || String(v).trim() === '';
}

function checkLength(errors, body, field, max) {
  if (body[field] != null && String(body[field]).length > max) {
    errors.push(`${field} en fazla ${max} karakter olabilir`);
  }
}

// partial = true → yalnızca gönderilen alanlar denetlenir (PUT)
function validateWord(body, { partial = false } = {}) {
  const errors = [];
  const has = (f) => body[f] !== undefined;

  if (!partial || has('word')) {
    if (isBlank(body.word)) errors.push('word zorunlu');
    else if (!/^[\p{L}][\p{L}\s\-']*$/u.test(String(body.word).trim())) errors.push(`word geçersiz: "${body.word}"`);
  }
  if (!partial || has('article')) {
    if (!ARTICLES.includes(body.article)) errors.push(`article der/die/das olmalı (gelen: "${body.article}")`);
  }
  if (!partial || has('tr')) if (isBlank(body.tr)) errors.push('tr çevirisi zorunlu');
  if (!partial || has('en')) if (isBlank(body.en)) errors.push('en çevirisi zorunlu');
  if (has('difficulty') && body.difficulty !== null) {
    const d = Number(body.difficulty);
    if (!Number.isInteger(d) || d < 1 || d > 3) errors.push('difficulty 1-3 arası tam sayı olmalı');
  }
  ['word', 'tr', 'en', 'de', 'uk', 'ar', 'category', 'suffix'].forEach((f) => checkLength(errors, body, f, 120));
  return errors;
}

function validateCase(c) {
  const errors = [];
  ['word', 'sentence_pre', 'tr', 'base_article', 'declined_article', 'case_name', 'explanation'].forEach((f) => {
    if (isBlank(c[f])) errors.push(`${f} zorunlu`);
  });
  if (c.base_article && !ARTICLES.includes(c.base_article)) errors.push('base_article der/die/das olmalı');
  if (c.declined_article && !DECLINED_ARTICLES.includes(String(c.declined_article).toLowerCase())) {
    errors.push(`declined_article geçersiz: "${c.declined_article}"`);
  }
  return errors;
}

// Genel CRUD tabloları için artikel alanı ve JSON dizisi denetimi
function validateGeneric(body, { articleFields = [], arrayFields = [] } = {}) {
  const errors = [];
  articleFields.forEach((f) => {
    if (body[f] !== undefined && !ARTICLES.includes(body[f])) errors.push(`${f} der/die/das olmalı`);
  });
  arrayFields.forEach((f) => {
    if (body[f] === undefined) return;
    let v = body[f];
    if (typeof v === 'string') {
      try { v = JSON.parse(v); } catch { errors.push(`${f} geçerli bir JSON dizisi olmalı`); return; }
    }
    if (!Array.isArray(v)) errors.push(`${f} dizi olmalı`);
  });
  return errors;
}

module.exports = { ARTICLES, validateWord, validateCase, validateGeneric };
