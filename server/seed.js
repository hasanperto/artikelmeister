require('dotenv').config();
const bcrypt = require('bcryptjs');
const legacyDB = require('../data/database.js');
const { db, getMeta, setMeta, bumpContentVersion } = require('./db');

const DAILY_TIPS_SEED = {
  tr: [
    { icon: '💡', text: '-chen ve -lein ile biten TÜM kelimeler "das" alır! Örn: das Mädchen, das Brötchen' },
    { icon: '🔑', text: '-ung ile biten kelimeler neredeyse her zaman "die" alır. Örn: die Übung, die Zeitung' },
    { icon: '📅', text: 'Günler, aylar ve mevsimler hep "der" alır! der Montag, der Januar, der Sommer' },
    { icon: '🧩', text: 'Bileşik kelimelerde artikel SON kelimeye göre belirlenir.' },
    { icon: '🎨', text: 'Renkler isim olarak kullanıldığında "das" alır. das Blau, das Rot' }
  ],
  en: [
    { icon: '💡', text: 'ALL words ending in -chen and -lein take "das"! E.g.: das Mädchen' },
    { icon: '🔑', text: 'Words ending in -ung almost always take "die". E.g.: die Übung' },
    { icon: '📅', text: 'Days, months and seasons always take "der"! der Montag, der Januar' },
    { icon: '🧩', text: 'In compound words, the article is determined by the LAST word.' },
    { icon: '🎨', text: 'Colors as nouns take "das". das Blau, das Rot' }
  ],
  de: [
    { icon: '💡', text: 'ALLE Wörter auf -chen und -lein sind "das"! z.B.: das Mädchen' },
    { icon: '🔑', text: 'Wörter auf -ung sind fast immer "die". z.B.: die Übung' },
    { icon: '📅', text: 'Tage, Monate und Jahreszeiten sind immer "der"!' },
    { icon: '🧩', text: 'Bei zusammengesetzten Wörtern bestimmt das LETZTE Wort den Artikel.' },
    { icon: '🎨', text: 'Farben als Nomen sind "das". das Blau, das Rot' }
  ],
  uk: [
    { icon: '💡', text: 'УСІ слова на -chen та -lein мають "das"!' },
    { icon: '🔑', text: 'Слова на -ung майже завжди мають "die".' },
    { icon: '📅', text: 'Дні, місяці та пори року завжди "der"!' },
    { icon: '🧩', text: 'У складних словах артикль визначається ОСТАННІМ словом.' },
    { icon: '🎨', text: 'Кольори як іменники мають "das".' }
  ],
  ar: [
    { icon: '💡', text: '"das" جميع الكلمات المنتهية بـ -chen و -lein تأخذ.' },
    { icon: '🔑', text: '"die" الكلمات المنتهية بـ -ung تأخذ دائمًا تقريبًا.' },
    { icon: '📅', text: '"der" الأيام والأشهر والفصول تأخذ دائمًا!' },
    { icon: '🧩', text: 'في الكلمات المركبة، تُحدد الأداة بالكلمة الأخيرة' },
    { icon: '🎨', text: '"das" الألوان كأسماء تأخذ.' }
  ]
};

function seedIfEmpty() {
  const seeded = getMeta('seeded');
  if (seeded === '1') {
    console.log('Veritabanı zaten dolu, seed atlandı.');
    return;
  }

  console.log('İlk kurulum: legacy veri aktarılıyor...');

  const insertWord = db.prepare(`
    INSERT INTO words (id, word, article, tr, en, translations_json, category, difficulty, suffix, is_exception)
    VALUES (@id, @word, @article, @tr, @en, @translations_json, @category, @difficulty, @suffix, @is_exception)
  `);

  const insertSuffix = db.prepare(`
    INSERT INTO suffix_rules (article, suffix, example, desc, priority)
    VALUES (@article, @suffix, @example, @desc, @priority)
  `);

  const insertCategory = db.prepare(`
    INSERT INTO category_rules (article, category, examples_json, icon, priority)
    VALUES (@article, @category, @examples_json, @icon, @priority)
  `);

  const insertException = db.prepare(`
    INSERT INTO exceptions (word, article, category, icon)
    VALUES (@word, @article, @category, @icon)
  `);

  const insertCase = db.prepare(`
    INSERT INTO cases_exercises (
      sentence_pre, word, suffix, sentence_post, tr, base_article, declined_article,
      declined_noun, case_name, focus_word, explanation, sort_order
    ) VALUES (
      @sentencePre, @word, @suffix, @sentencePost, @tr, @baseArticle, @declinedArticle,
      @declinedNoun, @caseName, @focusWord, @explanation, @sort_order
    )
  `);

  const insertAchievement = db.prepare(`
    INSERT INTO achievements (slug, title, desc, icon, xp)
    VALUES (@slug, @title, @desc, @icon, @xp)
  `);

  const insertLevel = db.prepare(`
    INSERT INTO levels (level, title, title_tr, xp_required)
    VALUES (@level, @title, @titleTr, @xpRequired)
  `);

  const insertTip = db.prepare(`
    INSERT INTO tips (title, text, icon, sort_order)
    VALUES (@title, @text, @icon, @sort_order)
  `);

  const insertDailyTip = db.prepare(`
    INSERT INTO daily_tips (lang, icon, text)
    VALUES (@lang, @icon, @text)
  `);

  const tx = db.transaction(() => {
    legacyDB.words.forEach((w) => {
      insertWord.run({
        id: w.id,
        word: w.word,
        article: w.article,
        tr: w.tr,
        en: w.en,
        translations_json: JSON.stringify({
          tr: w.tr,
          en: w.en,
          de: w.word,
          uk: w.tr,
          ar: w.tr
        }),
        category: w.category || 'general',
        difficulty: w.difficulty || 1,
        suffix: w.suffix || null,
        is_exception: w.isException ? 1 : 0
      });
    });

    ['der', 'die', 'das'].forEach((article) => {
      (legacyDB.suffixRules[article] || []).forEach((s) => {
        insertSuffix.run({ article, ...s });
      });
      (legacyDB.categoryRules[article] || []).forEach((c) => {
        insertCategory.run({
          article,
          category: c.category,
          examples_json: JSON.stringify(c.examples || []),
          icon: c.icon || '📂',
          priority: c.priority || 50
        });
      });
    });

    legacyDB.exceptions.forEach((e) => insertException.run(e));

    legacyDB.casesExercises.forEach((ex, i) => {
      insertCase.run({
        ...ex,
        suffix: ex.suffix || '',
        sentencePost: ex.sentencePost || '',
        declinedNoun: ex.declinedNoun || null,
        focusWord: ex.focusWord || null,
        sort_order: i
      });
    });

    legacyDB.achievements.forEach((a) => {
      insertAchievement.run({
        slug: a.id,
        title: a.title,
        desc: a.desc,
        icon: a.icon,
        xp: a.xp
      });
    });

    legacyDB.levels.forEach((l) => insertLevel.run(l));

    legacyDB.tips.forEach((t, i) => {
      insertTip.run({ ...t, sort_order: i });
    });

    Object.entries(DAILY_TIPS_SEED).forEach(([lang, tips]) => {
      tips.forEach((t) => insertDailyTip.run({ lang, ...t }));
    });

    setMeta('case_examples', JSON.stringify(legacyDB.caseExamples || {}));
    setMeta('compound_rule', JSON.stringify(legacyDB.compoundRule || {}));
    setMeta('content_version', '1');
    setMeta('updated_at', new Date().toISOString());
    setMeta('seeded', '1');
  });

  tx();

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash);

  console.log(`Seed tamamlandı. Admin: ${username}`);
}

if (require.main === module) {
  seedIfEmpty();
}

module.exports = { seedIfEmpty };
