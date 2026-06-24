// ============================================
// ArtikelMeister — i18n (Internationalization)
// TR, EN, DE, UK (Ukrainian), AR (Arabic)
// ============================================

const i18n = {
  currentLang: 'tr',
  rtlLangs: ['ar'],

  // Language metadata
  languages: [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
  ],

  translations: {
    // ─────────── TÜRKÇE ───────────
    tr: {
      // Login
      login_title: 'ArtikelMeister',
      login_subtitle: 'Profil seç veya yeni oluştur',
      new_profile: 'Yeni Profil',
      new_profile_desc: 'Yeni bir macera başlat',
      create_profile: 'Profil Oluştur',
      create_btn: '✨ Oluştur',
      cancel: 'İptal',
      name_placeholder: 'İsmin...',
      delete_confirm: 'Bu profili silmek istediğinizden emin misiniz?',

      // Header
      app_title: 'ArtikelMeister',

      // Greetings
      greeting_morning: 'Günaydın',
      greeting_afternoon: 'İyi günler',
      greeting_evening: 'İyi akşamlar',
      greeting_night: 'İyi geceler',

      // Home
      daily_tip_label: 'GÜNÜN İPUCU',
      stats_learned: 'Öğrenilen',
      stats_accuracy: 'Doğruluk',
      stats_games: 'Oyun',
      stats_best: 'En İyi Seri',
      modes_title: 'Modlar',

      // Modes
      mode_learn: 'Öğren',
      mode_learn_desc: 'Artikel kurallarını ve ipuçlarını keşfet',
      mode_quiz: 'Quiz',
      mode_quiz_desc: '10 soruluk pratik + combo bonusları',
      mode_speed: 'Hız Turu',
      mode_speed_desc: '60 saniyede kaç doğru yapabilirsin?',
      mode_rules: 'Kurallar',
      mode_rules_desc: 'Son ek kuralları, istisnalar ve tüyolar',
      mode_learn_tip: 'Kuralları öğrenerek başla!',
      mode_cases: 'İsmin Halleri',
      mode_cases_desc: 'Akkusativ, Dativ & Genitiv Çekimleri',

      // Navigation
      nav_home: 'Ana Sayfa',
      nav_learn: 'Öğren',
      nav_quiz: 'Quiz',
      nav_speed: 'Hız',
      nav_profile: 'Profil',

      // Quiz
      quiz_question: 'HANGİ ARTİKEL?',
      quiz_correct: 'Doğru',
      quiz_wrong: 'Yanlış',
      quiz_streak: 'Seri',
      quiz_hint_btn: '💡 İpucu göster',
      quiz_exit: '← Çık',
      quiz_hint_exception: '⚠️ İstisna:',
      quiz_hint_suffix: '💡 Son ek:',
      quiz_hint_usually: '→ genellikle',

      // Speed
      speed_score: 'Skor',
      speed_start: '⚡ Hız Turunu Başlat',
      speed_ready: 'Hazır mısın?',

      // Learn
      learn_title: 'Öğrenme Kartları',
      learn_subtitle: 'Kuralları ve ipuçlarını öğren',
      learn_tab_tips: '💡 Tüyolar',
      learn_suffix_rules: '📝 Son Ek Kuralları',
      learn_category_tips: '📂 Kategori İpuçları',
      learn_mini_tips: '🎯 Mini Tüyolar',
      learn_view_examples: '🔎 Örneklere Bak',
      learn_suffix_examples: '{suffix} Örnekleri',
      learn_category_group: '{category} Grubu',
      learn_suffix_desc: "Bu ek ile biten kelimeler genellikle '{article}' artikeli alır.",
      learn_category_desc: "Bu kategoriye giren kelimeler genellikle '{article}' artikeli alır.",

      // Rules
      rules_title: 'Kural Rehberi',
      rules_subtitle: 'Son ekler, kategori kuralları ve istisnalar',
      rules_tab_exceptions: '⚠️ İstisnalar',
      rules_exceptions_desc: '⚠️ Bu kelimeler genel kurallara uymaz. Bunları ezberlemeniz gerekir!',
      rules_suffix_title: '📝 Son Ek Kuralları',
      rules_category_title: '📂 Kategori Kuralları',

      // Cases
      cases_title: 'İsmin Halleri',
      cases_subtitle: 'Akkusativ, Dativ & Genitiv Çekimleri',
      cases_next: 'Sonraki Örnek ➔',
      cases_hint: 'İpucu',
      cases_intro_title: 'Değişim Macerası',
      cases_intro_desc: 'Almanca\'da artikeller cümledeki görevlerine göre kılık değiştirir. "der" bazen "den" olur, bazen "dem". Neden değiştiğini ve nasıl tahmin edeceğini burada oyun oynayarak öğreneceksin!<br><br><b>Nasıl Oynanır?</b><br>• Cümledeki boşluğa uygun artikeli seç.<br>• İpucuna ihtiyacın olursa 💡 butonuna tıkla.<br>• Doğru bildikçe XP ve Kombo kazan!',
      cases_start_btn: 'Pratiğe Başla 🎮',
      cases_guide_btn: '📖 Kılavuzu Oku',
      cases_guide_table: 'Artikel Çekim Tablosu',
      cases_guide_content: `
<div class="rule-card" style="border-left:4px solid var(--text-primary); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">1. Nominativ (Yalın Hal)</div>
  <div style="margin-bottom:8px; font-size:14px;">Cümlenin öznesidir. Gündelik hayatta ezberlediğimiz artikellerin kök halidir.</div>
  <div class="anim-box"><div class="anim-nom">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Der</u> Mann schläft. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Adam uyuyor.)</span></div></div>
  <button onclick="App.cases.showExamples('Nominativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 +30 Örnek Göster</button>
</div>
<div class="rule-card" style="border-left:4px solid var(--accent); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">2. Akkusativ (-i Hali / Kimi, Neyi?, Nereye?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Sadece "der" artikeli "den" olarak değişir. Eylemin YÖNÜNÜ veya ETKİLEDİĞİ NESNEYİ gösterir.</div>
  <div class="anim-box"><div class="anim-akk-obj">👁️</div><div class="anim-akk-arrow">➡️</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Ich sehe <u>den</u> Mann. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Adam-ı görüyorum.)</span></div></div>
  <button onclick="App.cases.showExamples('Akkusativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 +30 Örnek Göster</button>
</div>
<div class="rule-card" style="border-left:4px solid #F59E0B; background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">3. Dativ (-e/-de Hali / Kime, Nerede?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Tüm artikeller değişir! "der"->dem, "die"->der, "das"->dem. İçinde BULUNMA veya YARDIM/ALICI olma durumu vardır.</div>
  <div class="anim-box"><div class="anim-akk-obj">👩</div><div style="font-size:20px; margin:0 10px;">🤝</div><div class="anim-akk-obj">♿</div><div style="margin-left:15px; font-weight:bold; color:#F59E0B">Ich helfe <u>dem</u> Freund. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Arkadaş-a yardım ediyorum.)</span></div></div>
  <button onclick="App.cases.showExamples('Dativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 +30 Örnek Göster</button>
</div>
<div class="rule-card" style="border-left:4px solid #10B981; background:rgba(255,255,255,0.02); padding:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">4. Genitiv (İyelik / Kimin?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Tamlamalarla "Sahiplik" bildirir. "der/das" -> "des" (+s). "die/Plural" -> "der".</div>
  <div class="anim-box"><div class="anim-akk-obj">🚗</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Das Auto <u>des</u> Mannes. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Adam-ın arabası.)</span></div></div>
  <button onclick="App.cases.showExamples('Genitiv')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 +30 Örnek Göster</button>
</div>`,

      // Results
      results_continue: 'Devam Et',
      results_retry: '🔄 Tekrar Dene',
      examples_title_suffix: 'Örnekleri',
      results_perfect: 'MÜKEMMEL!',
      results_great: 'Harika!',
      results_good: 'Güzel Gidiyorsun!',
      results_try: 'İyi Deneme!',
      results_practice: 'Pratik Yap!',
      results_correct_answers: 'doğru cevap',
      results_in_60s: '60 saniyede',
      results_speed_done: 'Hız Turu Bitti!',
      results_incredible: 'İnanılmaz Hız!',
      results_fast: 'Çok Hızlısın!',
      results_nice_pace: 'İyi Tempo!',

      // Profile
      profile_title: 'Profil & Başarılar',
      profile_article_dist: '📊 Artikel Dağılımı',
      profile_total_xp: 'Toplam XP',
      profile_words: 'Kelime',
      profile_switch: '👤 Profil Değiştir',
      profile_reset: '🗑️ İlerlemeyi Sıfırla',
      profile_reset_confirm: 'Tüm ilerlemeniz silinecek. Emin misiniz?',
      profile_reset_done: 'İlerleme sıfırlandı',
      achievements_title: '🏆 Başarılar',
      achievement_unlocked: '✅ Kazanıldı',
      achievement_locked: '🔒',

      // Combo
      combo_label: 'KOMBO',
      combo_bonus_x2: 'x2 XP!',
      combo_bonus_x3: 'x3 XP!',
      combo_fire: '🔥 Combo Bonus!',

      // Language
      lang_title: 'Dil Seçimi',
      lang_select: '🌍 Dil',

      // Misc
      back: '← Geri',
      level: 'Seviye',
      exception: 'İstisna',
      tip_new: '💡 Yeni ipucu yüklendi!',
      achievement_earned: '🏆 Başarı:',
      level_up: '⬆️ Seviye',
      settings: 'Ayarlar'
    },

    // ─────────── ENGLISH ───────────
    en: {
      login_title: 'ArtikelMeister',
      login_subtitle: 'Select a profile or create new',
      new_profile: 'New Profile',
      new_profile_desc: 'Start a new adventure',
      create_profile: 'Create Profile',
      create_btn: '✨ Create',
      cancel: 'Cancel',
      name_placeholder: 'Your name...',
      delete_confirm: 'Are you sure you want to delete this profile?',

      app_title: 'ArtikelMeister',

      greeting_morning: 'Good morning',
      greeting_afternoon: 'Good afternoon',
      greeting_evening: 'Good evening',
      greeting_night: 'Good night',

      daily_tip_label: 'TIP OF THE DAY',
      stats_learned: 'Learned',
      stats_accuracy: 'Accuracy',
      stats_games: 'Games',
      stats_best: 'Best Streak',
      modes_title: 'Modes',

      mode_learn: 'Learn',
      mode_learn_desc: 'Discover article rules and tips',
      mode_quiz: 'Quiz',
      mode_quiz_desc: '10-question practice + combo bonuses',
      mode_speed: 'Speed Round',
      mode_speed_desc: 'How many can you get right in 60 seconds?',
      mode_rules: 'Rules',
      mode_rules_desc: 'Suffix rules, exceptions and tips',
      mode_learn_tip: 'Start by learning the rules!',
      mode_cases: 'Cases',
      mode_cases_desc: 'Akkusativ, Dativ & Genitiv Declensions',

      nav_home: 'Home',
      nav_learn: 'Learn',
      nav_quiz: 'Quiz',
      nav_speed: 'Speed',
      nav_profile: 'Profile',

      quiz_question: 'WHICH ARTICLE?',
      quiz_correct: 'Correct',
      quiz_wrong: 'Wrong',
      quiz_streak: 'Streak',
      quiz_hint_btn: '💡 Show hint',
      quiz_exit: '← Exit',
      quiz_hint_exception: '⚠️ Exception:',
      quiz_hint_suffix: '💡 Suffix:',
      quiz_hint_usually: '→ usually',

      speed_score: 'Score',
      speed_start: '⚡ Start Speed Round',
      speed_ready: 'Ready?',

      learn_title: 'Learning Cards',
      learn_subtitle: 'Learn the rules and tips',
      learn_tab_tips: '💡 Tips',
      learn_suffix_rules: '📝 Suffix Rules',
      learn_category_tips: '📂 Category Tips',
      learn_mini_tips: '🎯 Quick Tips',
      learn_view_examples: '🔎 View Examples',
      learn_suffix_examples: '{suffix} Examples',
      learn_category_group: '{category} Group',
      learn_suffix_desc: "Words ending in this suffix usually take '{article}'.",
      learn_category_desc: "Words in this category usually take '{article}'.",

      rules_title: 'Rule Guide',
      rules_subtitle: 'Suffixes, category rules and exceptions',
      rules_tab_exceptions: '⚠️ Exceptions',
      rules_exceptions_desc: '⚠️ These words don\'t follow general rules. You need to memorize them!',
      rules_suffix_title: '📝 Suffix Rules',
      rules_category_title: '📂 Category Rules',

      cases_title: 'Cases',
      cases_subtitle: 'Akkusativ, Dativ & Genitiv Declensions',
      cases_next: 'Next Example ➔',
      cases_hint: 'Hint',
      cases_intro_title: 'Adventure of Declensions',
      cases_intro_desc: 'In German, articles change depending on their role in the sentence. "der" sometimes becomes "den", sometimes "dem". Here you will learn why they change and how to guess them by playing a game!<br><br><b>How to Play?</b><br>• Select the correct article for the blank.<br>• Click the 💡 button if you need a hint.<br>• Earn XP and Combos for correct answers!',
      cases_start_btn: 'Start Practice 🎮',
      cases_guide_btn: '📖 Read Guide',
      cases_guide_table: 'Article Declension Table',
      cases_guide_content: `
<div class="rule-card" style="border-left:4px solid var(--text-primary); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">1. Nominativ (Subject)</div>
  <div style="margin-bottom:8px; font-size:14px;">It is the subject of the sentence. The base form of the articles you memorize.</div>
  <div class="anim-box"><div class="anim-nom">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Der</u> Mann schläft. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(The man sleeps.)</span></div></div>
  <button onclick="App.cases.showExamples('Nominativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 Show +30 Examples</button>
</div>
<div class="rule-card" style="border-left:4px solid var(--accent); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">2. Akkusativ (Direct Object / Whom, What?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Only "der" changes to "den". Indicates the DIRECTION or the EFFECTED OBJECT.</div>
  <div class="anim-box"><div class="anim-akk-obj">👁️</div><div class="anim-akk-arrow">➡️</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Ich sehe <u>den</u> Mann. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(I see the man.)</span></div></div>
  <button onclick="App.cases.showExamples('Akkusativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 Show +30 Examples</button>
</div>
<div class="rule-card" style="border-left:4px solid #F59E0B; background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">3. Dativ (Indirect Object / Whom, Where?)</div>
  <div style="margin-bottom:8px; font-size:14px;">All articles change! "der"->dem, "die"->der, "das"->dem. Indicates BEING AT a location or RECEIVING/HELPING.</div>
  <div class="anim-box"><div class="anim-akk-obj">👩</div><div style="font-size:20px; margin:0 10px;">🤝</div><div class="anim-akk-obj">♿</div><div style="margin-left:15px; font-weight:bold; color:#F59E0B">Ich helfe <u>dem</u> Freund. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(I help the friend.)</span></div></div>
  <button onclick="App.cases.showExamples('Dativ')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 Show +30 Examples</button>
</div>
<div class="rule-card" style="border-left:4px solid #10B981; background:rgba(255,255,255,0.02); padding:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">4. Genitiv (Possessive / Whose?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Shows ownership. "der/das" -> "des" (adds "-s" to noun). "die/Plural" -> "der".</div>
  <div class="anim-box"><div class="anim-akk-obj">🚗</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Das Auto <u>des</u> Mannes. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(The man's car.)</span></div></div>
  <button onclick="App.cases.showExamples('Genitiv')" class="btn" style="margin-top:10px; padding:8px 16px; font-size:14px; width:100%; border:1px solid var(--accent); background:rgba(var(--accent-rgb), 0.1); color:white; font-weight:bold; border-radius:8px;">📁 Show +30 Examples</button>
</div>`,

      results_continue: 'Continue',
      results_retry: '🔄 Try Again',
      examples_title_suffix: 'Examples',
      results_perfect: 'PERFECT!',
      results_great: 'Great!',
      results_good: 'Good Going!',
      results_try: 'Nice Try!',
      results_practice: 'Keep Practicing!',
      results_correct_answers: 'correct answers',
      results_in_60s: 'in 60 seconds',
      results_speed_done: 'Speed Round Done!',
      results_incredible: 'Incredible Speed!',
      results_fast: 'So Fast!',
      results_nice_pace: 'Nice Pace!',

      profile_title: 'Profile & Achievements',
      profile_article_dist: '📊 Article Distribution',
      profile_total_xp: 'Total XP',
      profile_words: 'Words',
      profile_switch: '👤 Switch Profile',
      profile_reset: '🗑️ Reset Progress',
      profile_reset_confirm: 'All your progress will be deleted. Are you sure?',
      profile_reset_done: 'Progress reset',
      achievements_title: '🏆 Achievements',
      achievement_unlocked: '✅ Earned',
      achievement_locked: '🔒',

      combo_label: 'COMBO',
      combo_bonus_x2: 'x2 XP!',
      combo_bonus_x3: 'x3 XP!',
      combo_fire: '🔥 Combo Bonus!',

      lang_title: 'Language',
      lang_select: '🌍 Language',

      back: '← Back',
      level: 'Level',
      exception: 'Exception',
      tip_new: '💡 New tip loaded!',
      achievement_earned: '🏆 Achievement:',
      level_up: '⬆️ Level',
      settings: 'Settings'
    },

    // ─────────── DEUTSCH ───────────
    de: {
      login_title: 'ArtikelMeister',
      login_subtitle: 'Profil auswählen oder neu erstellen',
      new_profile: 'Neues Profil',
      new_profile_desc: 'Ein neues Abenteuer beginnen',
      create_profile: 'Profil erstellen',
      create_btn: '✨ Erstellen',
      cancel: 'Abbrechen',
      name_placeholder: 'Dein Name...',
      delete_confirm: 'Möchtest du dieses Profil wirklich löschen?',

      app_title: 'ArtikelMeister',

      greeting_morning: 'Guten Morgen',
      greeting_afternoon: 'Guten Tag',
      greeting_evening: 'Guten Abend',
      greeting_night: 'Gute Nacht',

      daily_tip_label: 'TIPP DES TAGES',
      stats_learned: 'Gelernt',
      stats_accuracy: 'Genauigkeit',
      stats_games: 'Spiele',
      stats_best: 'Beste Serie',
      modes_title: 'Modi',

      mode_learn: 'Lernen',
      mode_learn_desc: 'Artikelregeln und Tipps entdecken',
      mode_quiz: 'Quiz',
      mode_quiz_desc: '10-Fragen-Übung + Combo-Boni',
      mode_speed: 'Geschwindigkeitsrunde',
      mode_speed_desc: 'Wie viele schaffst du in 60 Sekunden?',
      mode_rules: 'Regeln',
      mode_rules_desc: 'Endungsregeln, Ausnahmen und Tipps',
      mode_learn_tip: 'Beginne mit den Regeln!',
      mode_cases: 'Fälle (Kasus)',
      mode_cases_desc: 'Akkusativ, Dativ & Genitiv Deklination',

      nav_home: 'Startseite',
      nav_learn: 'Lernen',
      nav_quiz: 'Quiz',
      nav_speed: 'Speed',
      nav_profile: 'Profil',

      quiz_question: 'WELCHER ARTIKEL?',
      quiz_correct: 'Richtig',
      quiz_wrong: 'Falsch',
      quiz_streak: 'Serie',
      quiz_hint_btn: '💡 Hinweis zeigen',
      quiz_exit: '← Beenden',
      quiz_hint_exception: '⚠️ Ausnahme:',
      quiz_hint_suffix: '💡 Endung:',
      quiz_hint_usually: '→ normalerweise',

      speed_score: 'Punkte',
      speed_start: '⚡ Geschwindigkeitsrunde starten',
      speed_ready: 'Bereit?',

      learn_title: 'Lernkarten',
      learn_subtitle: 'Regeln und Tipps lernen',
      learn_tab_tips: '💡 Tipps',
      learn_suffix_rules: '📝 Endungsregeln',
      learn_category_tips: '📂 Kategorie-Tipps',
      learn_mini_tips: '🎯 Schnelle Tipps',
      learn_view_examples: '🔎 Beispiele ansehen',
      learn_suffix_examples: '{suffix} Beispiele',
      learn_category_group: '{category} Gruppe',
      learn_suffix_desc: "Wörter mit dieser Endung haben meist '{article}'.",
      learn_category_desc: "Wörter in dieser Kategorie haben meist '{article}'.",

      rules_title: 'Regelführer',
      rules_subtitle: 'Endungen, Kategorieregeln und Ausnahmen',
      rules_tab_exceptions: '⚠️ Ausnahmen',
      rules_exceptions_desc: '⚠️ Diese Wörter folgen keinen allgemeinen Regeln. Du musst sie auswendig lernen!',
      rules_suffix_title: '📝 Endungsregeln',
      rules_category_title: '📂 Kategorieregeln',

      cases_title: 'Fälle (Kasus)',
      cases_subtitle: 'Akkusativ, Dativ & Genitiv Deklination',
      cases_next: 'Nächstes Beispiel ➔',
      cases_hint: 'Tipp',
      cases_intro_title: 'Abenteuer der Deklination',
      cases_intro_desc: 'Im Deutschen ändern sich Artikel je nach Funktion im Satz. Hier lernst du spielerisch, warum sie sich ändern und wie man sie errät!<br><br><b>Wie wird gespielt?</b><br>• Wähle den richtigen Artikel für die Lücke.<br>• Klicke auf 💡, wenn du einen Tipp brauchst.<br>• Sammle XP und Kombos!',
      cases_start_btn: 'Übung Starten 🎮',
      cases_guide_btn: '📖 Leitfaden Lesen',
      cases_guide_table: 'Artikel Deklinationstabelle',
      cases_guide_content: `
<div class="rule-card" style="border-left:4px solid var(--text-primary); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">1. Nominativ (Subjekt)</div>
  <div style="margin-bottom:8px; font-size:14px;">Das Subjekt des Satzes. Dies ist die Grundform der Artikel, die wir lernen.</div>
  <div class="anim-box"><div class="anim-nom">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Der</u> Mann schläft.</div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Mehr Beispiele</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👶</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Das</u> Kind spielt.</div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👩</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Die</u> Frau lacht.</div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid var(--accent); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">2. Akkusativ (Direktes Objekt / Wen, Was?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Nur "der" ändert sich zu "den". Zeigt die RICHTUNG oder das BETROFFENE OBJEKT an. Betreten / Bewegen zu einem Ort.</div>
  <div class="anim-box"><div class="anim-akk-obj">👁️</div><div class="anim-akk-arrow">➡️</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Ich sehe <u>den</u> Mann.</div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Mehr Beispiele</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-drive-car">🚗</div><div class="anim-akk-arrow">➡️</div><div class="anim-static-park">🏞️</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Wir fahren in <u>den</u> Park. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(*Richtung)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">🧑</div><div class="anim-eat-apple" style="margin-left:10px;">🍏</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Er isst <u>den</u> Apfel. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(*Objekt)</span></div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid #F59E0B; background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">3. Dativ (Indirektes Objekt / Wem, Wo?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Alle Artikel ändern sich! "der"->dem, "die"->der, "das"->dem. Zeigt an, AN einem Ort zu sein oder EMPFÄNGER zu sein.</div>
  <div class="anim-box"><div class="anim-akk-obj">👩</div><div class="anim-dat-gift">🎁</div><div class="anim-akk-obj" style="margin-left:60px;">🧍</div><div style="margin-left:15px; font-weight:bold; color:#F59E0B">Ich helfe <u>dem</u> Freund.</div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Mehr Beispiele</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-static-park">🏞️</div><div class="anim-nom" style="margin-left:-18px; font-size:20px;">🧍</div><div style="margin-left:25px; font-weight:bold; color:#F59E0B">Wir sind in <u>dem</u> Park. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(*Position)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-bike" style="font-size:22px;">🚴</div><div style="margin-left:35px; font-weight:bold; color:#F59E0B">Er fährt mit <u>dem</u> Rad.</div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid #10B981; background:rgba(255,255,255,0.02); padding:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">4. Genitiv (Besitz / Wessen?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Zeigt Besitz oder Zugehörigkeit an. "der/das" -> "des" (Nomen bekommt "-s"). "die/Plural" -> "der".</div>
  <div class="anim-box"><div class="anim-akk-obj">🚗</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Das Auto <u>des</u> Mannes.</div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Mehr Beispiele</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-akk-obj">🐕</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">👩</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Der Hund <u>der</u> Frau.</div></div>
  </div>
</div>`,

      results_continue: 'Weiter',
      results_retry: '🔄 Nochmal',
      examples_title_suffix: 'Beispiele',
      results_perfect: 'PERFEKT!',
      results_great: 'Toll!',
      results_good: 'Gut gemacht!',
      results_try: 'Guter Versuch!',
      results_practice: 'Weiter üben!',
      results_correct_answers: 'richtige Antworten',
      results_in_60s: 'in 60 Sekunden',
      results_speed_done: 'Geschwindigkeitsrunde vorbei!',
      results_incredible: 'Unglaublich schnell!',
      results_fast: 'Super schnell!',
      results_nice_pace: 'Gutes Tempo!',

      profile_title: 'Profil & Erfolge',
      profile_article_dist: '📊 Artikelverteilung',
      profile_total_xp: 'Gesamt-XP',
      profile_words: 'Wörter',
      profile_switch: '👤 Profil wechseln',
      profile_reset: '🗑️ Fortschritt zurücksetzen',
      profile_reset_confirm: 'Dein gesamter Fortschritt wird gelöscht. Bist du sicher?',
      profile_reset_done: 'Fortschritt zurückgesetzt',
      achievements_title: '🏆 Erfolge',
      achievement_unlocked: '✅ Erhalten',
      achievement_locked: '🔒',

      combo_label: 'KOMBO',
      combo_bonus_x2: 'x2 XP!',
      combo_bonus_x3: 'x3 XP!',
      combo_fire: '🔥 Combo-Bonus!',

      lang_title: 'Sprache',
      lang_select: '🌍 Sprache',

      back: '← Zurück',
      level: 'Level',
      exception: 'Ausnahme',
      tip_new: '💡 Neuer Tipp geladen!',
      achievement_earned: '🏆 Erfolg:',
      level_up: '⬆️ Level',
      settings: 'Einstellungen'
    },

    // ─────────── УКРАЇНСЬКА ───────────
    uk: {
      login_title: 'ArtikelMeister',
      login_subtitle: 'Оберіть профіль або створіть новий',
      new_profile: 'Новий профіль',
      new_profile_desc: 'Почніть нову пригоду',
      create_profile: 'Створити профіль',
      create_btn: '✨ Створити',
      cancel: 'Скасувати',
      name_placeholder: 'Ваше ім\'я...',
      delete_confirm: 'Ви впевнені, що хочете видалити цей профіль?',

      app_title: 'ArtikelMeister',

      greeting_morning: 'Доброго ранку',
      greeting_afternoon: 'Добрий день',
      greeting_evening: 'Добрий вечір',
      greeting_night: 'На добраніч',

      daily_tip_label: 'ПОРАДА ДНЯ',
      stats_learned: 'Вивчено',
      stats_accuracy: 'Точність',
      stats_games: 'Ігри',
      stats_best: 'Найкраща серія',
      modes_title: 'Режими',

      mode_learn: 'Вчити',
      mode_learn_desc: 'Відкрийте правила артиклів та поради',
      mode_quiz: 'Вікторина',
      mode_quiz_desc: '10 запитань + комбо-бонуси',
      mode_speed: 'Швидкий раунд',
      mode_speed_desc: 'Скільки правильних за 60 секунд?',
      mode_rules: 'Правила',
      mode_rules_desc: 'Правила суфіксів, винятки та поради',
      mode_learn_tip: 'Почніть з вивчення правил!',
      mode_cases: 'Відмінки',
      mode_cases_desc: 'Akkusativ, Dativ & Genitiv',

      nav_home: 'Головна',
      nav_learn: 'Вчити',
      nav_quiz: 'Вікторина',
      nav_speed: 'Швидкість',
      nav_profile: 'Профіль',

      quiz_question: 'ЯКИЙ АРТИКЛЬ?',
      quiz_correct: 'Правильно',
      quiz_wrong: 'Неправильно',
      quiz_streak: 'Серія',
      quiz_hint_btn: '💡 Показати підказку',
      quiz_exit: '← Вийти',
      quiz_hint_exception: '⚠️ Виняток:',
      quiz_hint_suffix: '💡 Суфікс:',
      quiz_hint_usually: '→ зазвичай',

      speed_score: 'Рахунок',
      speed_start: '⚡ Почати швидкий раунд',
      speed_ready: 'Готові?',

      learn_title: 'Картки навчання',
      learn_subtitle: 'Вивчайте правила та поради',
      learn_tab_tips: '💡 Поради',
      learn_suffix_rules: '📝 Правила суфіксів',
      learn_category_tips: '📂 Поради за категоріями',
      learn_mini_tips: '🎯 Швидкі поради',
      learn_view_examples: '🔎 Переглянути приклади',
      learn_suffix_examples: 'Приклади {suffix}',
      learn_category_group: 'Група {category}',
      learn_suffix_desc: "Слова з цим суфіксом зазвичай мають '{article}'.",
      learn_category_desc: "Слова в цій категорії зазвичай мають '{article}'.",

      rules_title: 'Довідник правил',
      rules_subtitle: 'Суфікси, правила категорій та винятки',
      rules_tab_exceptions: '⚠️ Винятки',
      rules_exceptions_desc: '⚠️ Ці слова не підпорядковуються загальним правилам. Їх потрібно запам\'ятати!',
      rules_suffix_title: '📝 Правила суфіксів',
      rules_category_title: '📂 Правила категорій',

      cases_title: 'Відмінки',
      cases_subtitle: 'Akkusativ, Dativ & Genitiv',
      cases_next: 'Наступний приклад ➔',
      cases_hint: 'Підказка',
      cases_intro_title: 'Пригода відмінювання',
      cases_intro_desc: 'У німецькій мові артиклі змінюються залежно від їх ролі в реченні. Тут ви граючи дізнаєтесь, чому вони змінюються та як їх вгадати!<br><br><b>Як грати?</b><br>• Виберіть правильний артикль для пропуску.<br>• Натисніть 💡, якщо потрібна підказка.<br>• Отримуйте XP за правильні відповіді!',
      cases_start_btn: 'Почати практику 🎮',
      cases_guide_btn: '📖 Читати посібник',
      cases_guide_table: 'Таблиця відмінювання',
      cases_guide_content: `
<div class="rule-card" style="border-left:4px solid var(--text-primary); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">1. Nominativ (Називний відмінок)</div>
  <div style="margin-bottom:8px; font-size:14px;">Це підмет у реченні. Початкова форма артиклів.</div>
  <div class="anim-box"><div class="anim-nom">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Der</u> Mann schläft. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Чоловік спить.)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Більше прикладів</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👶</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Das</u> Kind spielt. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Дитина грається.)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👩</div><div style="margin-left:15px; font-weight:bold; color:var(--text-primary)"><u>Die</u> Frau lacht. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Жінка сміється.)</span></div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid var(--accent); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">2. Akkusativ (Знахідний / Кого, Що?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Тільки "der" змінюється на "den". Вказує НАПРЯМОК або ОБ'ЄКТ дії. Рух до місця.</div>
  <div class="anim-box"><div class="anim-akk-obj">👁️</div><div class="anim-akk-arrow">➡️</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Ich sehe <u>den</u> Mann. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Я бачу чоловіка.)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Більше прикладів</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-drive-car">🚗</div><div class="anim-akk-arrow">➡️</div><div class="anim-static-park">🏞️</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Wir fahren in <u>den</u> Park. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Їдемо в парк.)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">🧑</div><div class="anim-eat-apple" style="margin-left:10px;">🍏</div><div style="margin-left:15px; font-weight:bold; color:var(--accent)">Er isst <u>den</u> Apfel. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Він їсть яблуко.)</span></div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid #F59E0B; background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">3. Dativ (Давальний / Кому, Де?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Усі артиклі змінюються! "der"->dem, "die"->der, "das"->dem. Вказує на ПЕРЕБУВАННЯ або ОТРИМУВАЧА.</div>
  <div class="anim-box"><div class="anim-akk-obj">👩</div><div class="anim-dat-gift">🎁</div><div class="anim-akk-obj" style="margin-left:60px;">🧍</div><div style="margin-left:15px; font-weight:bold; color:#F59E0B">Ich helfe <u>dem</u> Freund. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Допомагаю другу.)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Більше прикладів</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-static-park">🏞️</div><div class="anim-nom" style="margin-left:-18px; font-size:20px;">🧍</div><div style="margin-left:25px; font-weight:bold; color:#F59E0B">Wir sind in <u>dem</u> Park. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Ми в парку.)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-bike" style="font-size:22px;">🚴</div><div style="margin-left:35px; font-weight:bold; color:#F59E0B">Er fährt mit <u>dem</u> Rad.</div></div>
  </div>
</div>
<div class="rule-card" style="border-left:4px solid #10B981; background:rgba(255,255,255,0.02); padding:12px; border-radius:0 8px 8px 0;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">4. Genitiv (Родовий / Чий?)</div>
  <div style="margin-bottom:8px; font-size:14px;">Вказує на приналежність. "der/das" -> "des" (+s). "die/Plural" -> "der".</div>
  <div class="anim-box"><div class="anim-akk-obj">🚗</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">🧍</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Das Auto <u>des</u> Mannes. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Машина чоловіка.)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ Більше прикладів</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-akk-obj">🐕</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">👩</div><div style="margin-left:15px; font-weight:bold; color:#10B981">Der Hund <u>der</u> Frau. <span style="opacity:0.8; font-weight:normal; margin-left:5px;">(Собака жінки.)</span></div></div>
  </div>
</div>`,

      results_continue: 'Продовжити',
      results_retry: '🔄 Спробувати знову',
      examples_title_suffix: 'Прикладів',
      results_perfect: 'ІДЕАЛЬНО!',
      results_great: 'Чудово!',
      results_good: 'Гарно йде!',
      results_try: 'Непогано!',
      results_practice: 'Тренуйтеся далі!',
      results_correct_answers: 'правильних відповідей',
      results_in_60s: 'за 60 секунд',
      results_speed_done: 'Швидкий раунд завершено!',
      results_incredible: 'Неймовірна швидкість!',
      results_fast: 'Дуже швидко!',
      results_nice_pace: 'Гарний темп!',

      profile_title: 'Профіль і досягнення',
      profile_article_dist: '📊 Розподіл артиклів',
      profile_total_xp: 'Всього XP',
      profile_words: 'Слова',
      profile_switch: '👤 Змінити профіль',
      profile_reset: '🗑️ Скинути прогрес',
      profile_reset_confirm: 'Весь ваш прогрес буде видалено. Ви впевнені?',
      profile_reset_done: 'Прогрес скинуто',
      achievements_title: '🏆 Досягнення',
      achievement_unlocked: '✅ Отримано',
      achievement_locked: '🔒',

      combo_label: 'КОМБО',
      combo_bonus_x2: 'x2 XP!',
      combo_bonus_x3: 'x3 XP!',
      combo_fire: '🔥 Комбо-бонус!',

      lang_title: 'Мова',
      lang_select: '🌍 Мова',

      back: '← Назад',
      level: 'Рівень',
      exception: 'Виняток',
      tip_new: '💡 Нова порада завантажена!',
      achievement_earned: '🏆 Досягнення:',
      level_up: '⬆️ Рівень',
      settings: 'Налаштування'
    },

    // ─────────── العربية ───────────
    ar: {
      login_title: 'ArtikelMeister',
      login_subtitle: 'اختر ملفًا شخصيًا أو أنشئ جديدًا',
      new_profile: 'ملف جديد',
      new_profile_desc: 'ابدأ مغامرة جديدة',
      create_profile: 'إنشاء ملف',
      create_btn: '✨ إنشاء',
      cancel: 'إلغاء',
      name_placeholder: '...اسمك',
      delete_confirm: 'هل أنت متأكد أنك تريد حذف هذا الملف؟',

      app_title: 'ArtikelMeister',

      greeting_morning: 'صباح الخير',
      greeting_afternoon: 'مساء الخير',
      greeting_evening: 'مساء الخير',
      greeting_night: 'تصبح على خير',

      daily_tip_label: 'نصيحة اليوم',
      stats_learned: 'تم تعلمه',
      stats_accuracy: 'الدقة',
      stats_games: 'الألعاب',
      stats_best: 'أفضل سلسلة',
      modes_title: 'الأوضاع',

      mode_learn: 'تعلّم',
      mode_learn_desc: 'اكتشف قواعد الأدوات والنصائح',
      mode_quiz: 'اختبار',
      mode_quiz_desc: '10 أسئلة تدريبية + مكافآت كومبو',
      mode_speed: 'جولة السرعة',
      mode_speed_desc: 'كم إجابة صحيحة في 60 ثانية؟',
      mode_rules: 'القواعد',
      mode_rules_desc: 'قواعد اللواحق والاستثناءات والنصائح',
      mode_learn_tip: 'ابدأ بتعلم القواعد!',
      mode_cases: 'الحالات الإعرابية',
      mode_cases_desc: 'Akkusativ, Dativ & Genitiv',

      nav_home: 'الرئيسية',
      nav_learn: 'تعلّم',
      nav_quiz: 'اختبار',
      nav_speed: 'سرعة',
      nav_profile: 'الملف',

      quiz_question: 'أي أداة تعريف؟',
      quiz_correct: 'صحيح',
      quiz_wrong: 'خطأ',
      quiz_streak: 'سلسلة',
      quiz_hint_btn: '💡 إظهار تلميح',
      quiz_exit: 'خروج ←',
      quiz_hint_exception: '⚠️ استثناء:',
      quiz_hint_suffix: '💡 اللاحقة:',
      quiz_hint_usually: '→ عادة',

      speed_score: 'النتيجة',
      speed_start: '⚡ بدء جولة السرعة',
      speed_ready: 'مستعد؟',

      learn_title: 'بطاقات التعلم',
      learn_subtitle: 'تعلم القواعد والنصائح',
      learn_tab_tips: '💡 نصائح',
      learn_suffix_rules: '📝 قواعد اللواحق',
      learn_category_tips: '📂 نصائح الفئات',
      learn_mini_tips: '🎯 نصائح سريعة',
      learn_view_examples: '🔎 عرض الأمثلة',
      learn_suffix_examples: 'أمثلة {suffix}',
      learn_category_group: 'مجموعة {category}',
      learn_suffix_desc: "الكلمات المنتهية بهذه اللاحقة عادة تأخذ '{article}'.",
      learn_category_desc: "الكلمات في هذه الفئة عادة تأخذ '{article}'.",

      rules_title: 'دليل القواعد',
      rules_subtitle: 'اللواحق وقواعد الفئات والاستثناءات',
      rules_tab_exceptions: '⚠️ استثناءات',
      rules_exceptions_desc: '⚠️ هذه الكلمات لا تتبع القواعد العامة. يجب حفظها!',
      rules_suffix_title: '📝 قواعد اللواحق',
      rules_category_title: '📂 قواعد الفئات',

      cases_title: 'الحالات الإعرابية',
      cases_subtitle: 'Akkusativ, Dativ & Genitiv',
      cases_next: 'المثال التالي ➔',
      cases_hint: 'تلميح',
      cases_intro_title: 'مغامرة الإعراب',
      cases_intro_desc: 'في الألمانية، تتغير الأدوات بناءً على دورها في الجملة. هنا ستتعلم لماذا تتغير وكيف تخمنها عن طريق اللعب!<br><br><b>كيف تلعب؟</b><br>• اختر الأداة الصحيحة للفراغ.<br>• اضغط 💡 إذا احتجت إلى تلميح.<br>• اكسب XP مع كل إجابة صحيحة!',
      cases_start_btn: 'بدء التدريب 🎮',
      cases_guide_btn: '📖 اقرأ الدليل',
      cases_guide_table: 'جدول تصريف الأدوات',
      cases_guide_content: `
<div class="rule-card" style="border-right:4px solid var(--text-primary); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:8px 0 0 8px; text-align:right;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">1. Nominativ (حالة الرفع)</div>
  <div style="margin-bottom:8px; font-size:14px;">إنه الفاعل في الجملة. الشكل الأساسي للأدوات.</div>
  <div class="anim-box"><div class="anim-nom">🧍</div><div style="margin-right:15px; font-weight:bold; color:var(--text-primary)"><u>Der</u> Mann schläft. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(الرجل ينام)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ المزيد من الأمثلة</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👶</div><div style="margin-right:15px; font-weight:bold; color:var(--text-primary)"><u>Das</u> Kind spielt. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(الطفل يلعب)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">👩</div><div style="margin-right:15px; font-weight:bold; color:var(--text-primary)"><u>Die</u> Frau lacht. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(المرأة تضحك)</span></div></div>
  </div>
</div>
<div class="rule-card" style="border-right:4px solid var(--accent); background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:8px 0 0 8px; text-align:right;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">2. Akkusativ (حالة النصب / مفعول به مباشر)</div>
  <div style="margin-bottom:8px; font-size:14px;">"der" فقط يتغير إلى "den". يشير للاتجاه أو المفعول به! دخول / اتجاه إلى مكان.</div>
  <div class="anim-box"><div class="anim-akk-obj">👁️</div><div class="anim-akk-arrow" style="transform:scaleX(-1)">⬅️</div><div class="anim-akk-obj">🧍</div><div style="margin-right:15px; font-weight:bold; color:var(--accent)">Ich sehe <u>den</u> Mann. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(أنا أرى الرجل)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ المزيد من الأمثلة</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-drive-car" style="animation-name:driveCarAr">🚗</div><div class="anim-akk-arrow" style="transform:scaleX(-1)">⬅️</div><div class="anim-static-park">🏞️</div><div style="margin-right:15px; font-weight:bold; color:var(--accent)">Wir fahren in <u>den</u> Park. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(نذهب للحديقة)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-nom">🧑</div><div class="anim-eat-apple" style="margin-right:10px;">🍏</div><div style="margin-right:15px; font-weight:bold; color:var(--accent)">Er isst <u>den</u> Apfel. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(يأكل التفاحة)</span></div></div>
  </div>
</div>
<div class="rule-card" style="border-right:4px solid #F59E0B; background:rgba(255,255,255,0.02); padding:12px; margin-bottom:12px; border-radius:8px 0 0 8px; text-align:right;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">3. Dativ (حالة الجر / مفعول به غير مباشر)</div>
  <div style="margin-bottom:8px; font-size:14px;">تتغير كل الأدوات! "der"->dem, "die"->der, "das"->dem. تشير للوجود في مكان أو استلام شيء.</div>
  <div class="anim-box"><div class="anim-akk-obj" style="margin-right:60px;">👩</div><div class="anim-dat-gift" style="right:50px; left:auto; animation-name: giveDatAr">🎁</div><div class="anim-akk-obj">🧍</div><div style="margin-right:15px; font-weight:bold; color:#F59E0B">Ich helfe <u>dem</u> Freund. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(أنا أساعد الصديق)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ المزيد من الأمثلة</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-static-park">🏞️</div><div class="anim-nom" style="margin-right:-18px; font-size:20px;">🧍</div><div style="margin-right:25px; font-weight:bold; color:#F59E0B">Wir sind in <u>dem</u> Park. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(نحن في الحديقة)</span></div></div>
    <div class="anim-box" style="height:40px;"><div class="anim-bike" style="font-size:22px;">🚴</div><div style="margin-right:35px; font-weight:bold; color:#F59E0B">Er fährt mit <u>dem</u> Rad.</div></div>
  </div>
</div>
<div class="rule-card" style="border-right:4px solid #10B981; background:rgba(255,255,255,0.02); padding:12px; border-radius:8px 0 0 8px; text-align:right;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:8px;">4. Genitiv (حالة الإضافة / لمن؟)</div>
  <div style="margin-bottom:8px; font-size:14px;">تُظهر الملكية. "der/das" -> "des" (+s). "die/الجمع" -> "der". حروف الجر: <b>wegen, während, trotz</b>.</div>
  <div class="anim-box"><div class="anim-akk-obj">🚗</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">🧍</div><div style="margin-right:15px; font-weight:bold; color:#10B981">Das Auto <u>des</u> Mannes. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(سيارة الرجل)</span></div></div>
  <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'" class="btn" style="margin-top:10px; padding:6px 14px; font-size:13px; width:100%; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:white;">➕ المزيد من الأمثلة</button>
  <div style="display:none; margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">
    <div class="anim-box" style="height:40px;"><div class="anim-akk-obj">🐕</div><div class="anim-gen-link">🔗</div><div class="anim-akk-obj">👩</div><div style="margin-right:15px; font-weight:bold; color:#10B981">Der Hund <u>der</u> Frau. <span style="opacity:0.8; font-weight:normal; margin-right:5px;">(كلب المرأة)</span></div></div>
  </div>
</div>`,

      results_continue: 'متابعة',
      results_retry: '🔄 حاول مرة أخرى',
      examples_title_suffix: 'أمثلة',
      results_perfect: '!ممتاز',
      results_great: '!رائع',
      results_good: '!جيد',
      results_try: '!محاولة جيدة',
      results_practice: '!تدرب أكثر',
      results_correct_answers: 'إجابات صحيحة',
      results_in_60s: 'في 60 ثانية',
      results_speed_done: 'انتهت جولة السرعة!',
      results_incredible: 'سرعة لا تصدق!',
      results_fast: 'سريع جدًا!',
      results_nice_pace: 'إيقاع جيد!',

      profile_title: 'الملف والإنجازات',
      profile_article_dist: '📊 توزيع الأدوات',
      profile_total_xp: 'إجمالي XP',
      profile_words: 'كلمات',
      profile_switch: '👤 تغيير الملف',
      profile_reset: '🗑️ إعادة ضبط التقدم',
      profile_reset_confirm: 'سيتم حذف كل تقدمك. هل أنت متأكد؟',
      profile_reset_done: 'تم إعادة ضبط التقدم',
      achievements_title: '🏆 الإنجازات',
      achievement_unlocked: '✅ حصلت عليه',
      achievement_locked: '🔒',

      combo_label: 'كومبو',
      combo_bonus_x2: '!x2 XP',
      combo_bonus_x3: '!x3 XP',
      combo_fire: '🔥 !مكافأة كومبو',

      lang_title: 'اللغة',
      lang_select: '🌍 اللغة',

      back: 'رجوع ←',
      level: 'المستوى',
      exception: 'استثناء',
      tip_new: '💡 تم تحميل نصيحة جديدة!',
      achievement_earned: '🏆 :إنجاز',
      level_up: '⬆️ المستوى',
      settings: 'الإعدادات'
    }
  },

  // ── Helper: Get translation ──
  t(key, vars) {
    let text = this.translations[this.currentLang]?.[key]
      || this.translations['en']?.[key]
      || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replaceAll(`{${k}}`, v);
      });
    }
    return text;
  },

  // ── Set language ──
  setLang(code) {
    this.currentLang = code;
    const langData = this.languages.find(l => l.code === code);
    const dir = langData?.dir || 'ltr';

    document.documentElement.lang = code;
    document.documentElement.dir = dir;
    document.body.classList.toggle('rtl', dir === 'rtl');

    localStorage.setItem('artikelmeister_lang', code);
    this.applyTranslations();
  },

  // ── Load saved language ──
  loadSaved() {
    const saved = localStorage.getItem('artikelmeister_lang');
    if (saved && this.translations[saved]) {
      this.currentLang = saved;
    }
  },

  // ── Apply translations to all [data-i18n] elements ──
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (el.tagName === 'INPUT') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
  }
};
