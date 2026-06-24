const { db, getMeta } = require('./db');
const { mapWordForApp, parseJson } = require('./words-helper');

function buildSuffixRules() {
  const rows = db.prepare(`
    SELECT article, suffix, example, desc, priority
    FROM suffix_rules WHERE active = 1
    ORDER BY priority DESC
  `).all();
  const out = { der: [], die: [], das: [] };
  rows.forEach((r) => {
    if (out[r.article]) {
      out[r.article].push({
        suffix: r.suffix,
        example: r.example,
        desc: r.desc,
        priority: r.priority
      });
    }
  });
  return out;
}

function buildCategoryRules() {
  const rows = db.prepare(`
    SELECT article, category, examples_json, icon, priority
    FROM category_rules WHERE active = 1
    ORDER BY priority DESC
  `).all();
  const out = { der: [], die: [], das: [] };
  rows.forEach((r) => {
    if (out[r.article]) {
      out[r.article].push({
        category: r.category,
        examples: parseJson(r.examples_json, []),
        icon: r.icon,
        priority: r.priority
      });
    }
  });
  return out;
}

function buildBundle() {
  const words = db.prepare(`
    SELECT id, word, article, tr, en, translations_json, category, difficulty, suffix,
           is_exception, active
    FROM words WHERE active = 1 ORDER BY id
  `).all().map(mapWordForApp);

  const exceptions = db.prepare(`
    SELECT word, article, category, icon FROM exceptions WHERE active = 1
  `).all();

  const casesExercises = db.prepare(`
    SELECT sentence_pre AS sentencePre, word, suffix, sentence_post AS sentencePost,
           tr, base_article AS baseArticle, declined_article AS declinedArticle,
           declined_noun AS declinedNoun, case_name AS caseName, focus_word AS focusWord,
           explanation
    FROM cases_exercises WHERE active = 1 ORDER BY sort_order, id
  `).all();

  const achievements = db.prepare(`
    SELECT slug AS id, title, desc, icon, xp FROM achievements WHERE active = 1
  `).all();

  const levels = db.prepare(`
    SELECT level, title, title_tr AS titleTr, xp_required AS xpRequired FROM levels ORDER BY level
  `).all();

  const tips = db.prepare(`
    SELECT title, text, icon FROM tips WHERE active = 1 ORDER BY sort_order, id
  `).all();

  const caseExamples = parseJson(getMeta('case_examples', '{}'), {});

  const compoundRule = parseJson(getMeta('compound_rule', '{}'), {
    title: 'Bileşik Kelime Kuralı',
    description: 'Bileşik kelimelerde artikel, SON kelimeye göre belirlenir.',
    examples: []
  });

  return {
    meta: {
      version: parseInt(getMeta('content_version', '1'), 10),
      updatedAt: getMeta('updated_at', new Date().toISOString())
    },
    suffixRules: buildSuffixRules(),
    categoryRules: buildCategoryRules(),
    exceptions,
    words,
    compoundRule,
    achievements,
    levels,
    tips,
    casesExercises,
    caseExamples
  };
}

function buildDailyTips() {
  const rows = db.prepare(`
    SELECT lang, icon, text FROM daily_tips WHERE active = 1
  `).all();
  const out = {};
  rows.forEach((r) => {
    if (!out[r.lang]) out[r.lang] = [];
    out[r.lang].push({ icon: r.icon, text: r.text });
  });
  return out;
}

module.exports = { buildBundle, buildDailyTips };
