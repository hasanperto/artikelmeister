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
      content_updated: '📥 Yeni içerik indirildi!',
      press_back_exit: 'Çıkmak için tekrar geri tuşuna basın',
      text_size: '🔤 Yazı boyutu',
      text_size_small: 'Küçük',
      text_size_normal: 'Normal',
      text_size_large: 'Büyük',
      text_size_xlarge: 'Çok büyük',
      srs_due_badge: '🔁 {n} tekrar',
      srs_stats: 'Ustalaşılan: {mastered} · Tekrar bekleyen: {due}',
      weak_title: '🧠 Zayıf kelimelerim',
      weak_empty: 'Henüz zayıf kelime yok — quiz çözdükçe burada görünecek.',
      weak_practice: '🎯 Bunları çalış',
      speech_auto: '🔊 Cevaptan sonra sesli oku',
      speech_unavailable: 'Almanca ses bulunamadı. Telefon Ayarlar → Metin okuma (TTS) bölümünden Almanca dil paketini yükleyin.',
      backup_title: '💾 Yedekleme',
      backup_desc: 'İlerlemeni dosyaya kaydet, telefon değiştirince geri yükle.',
      backup_export: '📤 Dışa aktar',
      backup_import: '📥 İçe aktar',
      backup_done: '✅ Yedek hazır',
      backup_import_confirm: '{n} profil içe aktarılsın mı? Aynı profiller yedekteki haliyle değiştirilecek.',
      backup_import_done: '✅ {n} profil geri yüklendi',
      backup_invalid: '⚠️ Geçersiz yedek dosyası',
      mode_ai: 'AI Koç',
      mode_ai_desc: 'Gemini · Claude · MiniMax ile kişisel öğretmen',
      ai_title: '🤖 AI Koç',
      ai_subtitle: 'Yapay zekâ destekli kişisel artikel öğretmenin',
      ai_status_online: '🟢 AI çevrimiçi · {provider}',
      ai_status_offline: '⚪ Çevrimdışı mod — ipuçları uygulamadaki kurallardan üretilir',
      ai_provider: 'AI motoru',
      ai_provider_auto: 'Otomatik',
      ai_quiz_title: '🎯 AI Quiz',
      ai_quiz_desc: 'Yanlış cevapta püf noktası, tur sonunda hata analizi',
      ai_lookup_title: '🔍 Artikel Dedektifi',
      ai_lookup_desc: 'Herhangi bir kelimeyi sor: artikel, kural, çoğul, örnek cümle',
      ai_sentence_title: '✍️ Cümle Ustası',
      ai_sentence_desc: 'Zayıf kelimelerinle AI cümleleri — ismin halleri pratiği',
      ai_needs_online: '🌐 İnternet ve AI sunucusu gerekli',
      ai_menu_back: '← AI Koç',
      ai_tip_title: '💡 Püf noktası',
      ai_tip_ai: '🤖 {provider} açıklaması',
      ai_loading: 'AI düşünüyor…',
      ai_error: 'AI şu an yanıt veremedi — yukarıdaki kural tabanlı ipucu geçerli.',
      ai_continue: 'Devam ➔',
      ai_correct_was: 'Doğrusu: {answer}',
      ai_examples: 'Aynı kurala uyanlar',
      ai_rule_suffix: '"{suffix}" ile biten kelimeler genelde {article} alır ({desc}).',
      ai_rule_category: 'Kategori kuralı: "{category}" → {article}.',
      ai_rule_exception: '⚠️ İstisna: {desc}',
      ai_rule_compound: 'Bileşik kelime: artikeli son parça belirler → {part}.',
      ai_rule_none: 'Bu kelime belirgin bir kurala uymuyor; artikeliyle birlikte ezberle.',
      ai_rule_group: '"{group}" grubundaki kelimelerde {article} oranı %{pct} — güçlü bir eğilim, ama kesin kural değil.',
      ai_type_group: 'Grup eğilimi',
      ai_advice_group: 'Kelimeleri konu gruplarıyla öğren; çoğu grupta bir artikel baskındır.',
      ai_trick_suffix: '"{suffix}" görünce aklına hemen {article} gelsin!',
      ai_trick_category: '"{category}" grubunu düşün: hepsi {article}.',
      ai_trick_exception: 'Bu bir istisna — "{article} {word}" ifadesini kalıp olarak ezberle.',
      ai_trick_compound: 'Sadece son parçaya bak: {part} → {article} {word}.',
      ai_trick_color: '"{article} {word}" ifadesini {color} renkte hayal et; renk artikeli hatırlatır.',
      color_der: 'mavi',
      color_die: 'kırmızı',
      color_das: 'yeşil',
      ai_analysis_title: '🧠 Hata analizi',
      ai_type_suffix: 'Son ek kuralı',
      ai_type_category: 'Kategori kuralı',
      ai_type_exception: 'İstisna',
      ai_type_compound: 'Bileşik kelime',
      ai_type_memorize: 'Ezber',
      ai_advice_suffix: 'Kurallar → son ekler bölümünü tekrar et; eki görünce artikeli hatırla.',
      ai_advice_category: 'Kategori kurallarını (günler, meslekler, renkler…) gözden geçir.',
      ai_advice_exception: 'Kurallar → İstisnalar sekmesini incele; bunlar ezber ister.',
      ai_advice_compound: 'Bileşik kelimelerde sadece son kelimeye bak.',
      ai_advice_memorize: 'Profil → "Zayıf kelimelerim" ile bu kelimeleri tekrar et.',
      ai_no_mistakes: '🎉 Hiç hata yok, harika!',
      ai_play_again: '🔄 Yeni tur',
      ai_lookup_placeholder: 'Almanca kelime yaz… (örn. Zeitung)',
      ai_lookup_btn: '🔍 Bul',
      ai_lookup_recent: 'Son aramalar',
      ai_lookup_notfound: 'Sözlükte yok; son eke göre tahmin: {article} (kesin değil).',
      ai_lookup_unknown: 'Bu kelime sözlükte yok ve bir kurala uymuyor. AI için internet gerekli.',
      ai_lookup_not_noun: 'Bu bir isim değil gibi görünüyor — artikel yalnızca isimlerle kullanılır.',
      ai_lookup_invalid: 'Lütfen tek bir Almanca kelime yazın.',
      ai_source_db: '📚 Sözlük',
      ai_source_rules: '📏 Kural tahmini',
      ai_source_ai: '🤖 {provider}',
      ai_plural: 'Çoğul',
      ai_example: 'Örnek',
      ai_confidence_low: '⚠️ Düşük güven',
      ai_sentence_loading: 'Sana özel cümleler hazırlanıyor…',
      ai_sentence_case: 'Hal: {case}',
      ai_sentence_done: '{correct}/{total} doğru',
      ai_keys_title: '🔑 AI anahtarlarım',
      ai_keys_desc: 'Kendi Gemini, Claude veya MiniMax anahtarını ekle: AI Koç sunucu olmadan doğrudan bu telefondan çalışır.',
      ai_keys_privacy: '🔒 Anahtar yalnızca bu cihazda saklanır, yedeğe eklenmez ve sadece ilgili AI şirketine gönderilir. Kullanım ücreti senin hesabına yansır.',
      ai_keys_hint: 'Kendi AI anahtarını ekle (Profil)',
      ai_key_none: 'Eklenmedi',
      ai_key_saved: '✓ Kayıtlı {mask}',
      ai_key_add: '➕ Ekle',
      ai_key_change: '✏️ Değiştir',
      ai_key_remove: '🗑️ Sil',
      ai_key_placeholder: 'API anahtarını yapıştır',
      ai_key_test_save: 'Test et ve kaydet',
      ai_key_get: 'Anahtar al ↗',
      ai_key_testing: '⏳ Anahtar test ediliyor…',
      ai_key_ok: '✅ Anahtar çalışıyor ve kaydedildi',
      ai_key_fail: '❌ Anahtar çalışmadı: {error}',
      ai_key_removed: 'Anahtar bu cihazdan silindi',
      ai_key_remove_confirm: '{provider} anahtarı bu cihazdan silinsin mi?',
      ai_key_offline: 'Anahtarı test etmek için internet gerekli.',
      ai_own_key: 'kendi anahtarın',
      ai_key_default: '⭐ Varsayılan',
      ai_key_make_default: '⭐ Varsayılan yap',
      ai_key_default_set: '⭐ {provider} artık varsayılan AI',
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
      content_updated: '📥 New content downloaded!',
      press_back_exit: 'Press back again to exit',
      text_size: '🔤 Text size',
      text_size_small: 'Small',
      text_size_normal: 'Normal',
      text_size_large: 'Large',
      text_size_xlarge: 'Extra large',
      srs_due_badge: '🔁 {n} to review',
      srs_stats: 'Mastered: {mastered} · Due for review: {due}',
      weak_title: '🧠 My weak words',
      weak_empty: 'No weak words yet — they will appear here as you play quizzes.',
      weak_practice: '🎯 Practice these',
      speech_auto: '🔊 Read aloud after answering',
      speech_unavailable: 'No German voice found. Install the German language pack under phone Settings → Text-to-speech.',
      backup_title: '💾 Backup',
      backup_desc: 'Save your progress to a file and restore it on a new phone.',
      backup_export: '📤 Export',
      backup_import: '📥 Import',
      backup_done: '✅ Backup ready',
      backup_import_confirm: 'Import {n} profile(s)? Matching profiles will be replaced with the backup.',
      backup_import_done: '✅ {n} profile(s) restored',
      backup_invalid: '⚠️ Invalid backup file',
      mode_ai: 'AI Coach',
      mode_ai_desc: 'Personal tutor powered by Gemini · Claude · MiniMax',
      ai_title: '🤖 AI Coach',
      ai_subtitle: 'Your AI-powered personal article tutor',
      ai_status_online: '🟢 AI online · {provider}',
      ai_status_offline: '⚪ Offline mode — tips are generated from the built-in rules',
      ai_provider: 'AI engine',
      ai_provider_auto: 'Automatic',
      ai_quiz_title: '🎯 AI Quiz',
      ai_quiz_desc: 'Key tip on every mistake, mistake analysis at the end',
      ai_lookup_title: '🔍 Article Detective',
      ai_lookup_desc: 'Ask about any word: article, rule, plural, example sentence',
      ai_sentence_title: '✍️ Sentence Master',
      ai_sentence_desc: 'AI sentences with your weak words — practise cases',
      ai_needs_online: '🌐 Requires internet and the AI server',
      ai_menu_back: '← AI Coach',
      ai_tip_title: '💡 Key tip',
      ai_tip_ai: '🤖 {provider} explains',
      ai_loading: 'AI is thinking…',
      ai_error: 'AI could not answer right now — the rule-based tip above still applies.',
      ai_continue: 'Continue ➔',
      ai_correct_was: 'Correct: {answer}',
      ai_examples: 'Same rule',
      ai_rule_suffix: 'Words ending in "{suffix}" usually take {article} ({desc}).',
      ai_rule_category: 'Category rule: "{category}" → {article}.',
      ai_rule_exception: '⚠️ Exception: {desc}',
      ai_rule_compound: 'Compound word: the last part decides the article → {part}.',
      ai_rule_none: 'This word follows no clear rule; memorise it together with its article.',
      ai_rule_group: '{pct}% of the words in the "{group}" group take {article} — a strong tendency, not a strict rule.',
      ai_type_group: 'Group tendency',
      ai_advice_group: 'Learn words in topic groups; one article dominates most groups.',
      ai_trick_suffix: 'See "{suffix}" → think {article} right away!',
      ai_trick_category: 'Think of the "{category}" group: they are all {article}.',
      ai_trick_exception: 'This is an exception — learn "{article} {word}" as a fixed phrase.',
      ai_trick_compound: 'Only look at the last part: {part} → {article} {word}.',
      ai_trick_color: 'Picture "{article} {word}" in {color}; the colour reminds you of the article.',
      color_der: 'blue',
      color_die: 'red',
      color_das: 'green',
      ai_analysis_title: '🧠 Mistake analysis',
      ai_type_suffix: 'Suffix rule',
      ai_type_category: 'Category rule',
      ai_type_exception: 'Exception',
      ai_type_compound: 'Compound word',
      ai_type_memorize: 'Memorise',
      ai_advice_suffix: 'Review Rules → suffixes; recall the article when you see the ending.',
      ai_advice_category: 'Review the category rules (days, jobs, colours…).',
      ai_advice_exception: 'Study Rules → Exceptions; these need memorising.',
      ai_advice_compound: 'In compound words, look only at the last word.',
      ai_advice_memorize: 'Practise these with Profile → "My weak words".',
      ai_no_mistakes: '🎉 No mistakes, great job!',
      ai_play_again: '🔄 New round',
      ai_lookup_placeholder: 'Type a German word… (e.g. Zeitung)',
      ai_lookup_btn: '🔍 Find',
      ai_lookup_recent: 'Recent searches',
      ai_lookup_notfound: 'Not in the dictionary; guess by ending: {article} (not certain).',
      ai_lookup_unknown: 'Not in the dictionary and no rule applies. AI needs internet.',
      ai_lookup_not_noun: 'This does not look like a noun — articles are only used with nouns.',
      ai_lookup_invalid: 'Please type a single German word.',
      ai_source_db: '📚 Dictionary',
      ai_source_rules: '📏 Rule-based guess',
      ai_source_ai: '🤖 {provider}',
      ai_plural: 'Plural',
      ai_example: 'Example',
      ai_confidence_low: '⚠️ Low confidence',
      ai_sentence_loading: 'Preparing sentences just for you…',
      ai_sentence_case: 'Case: {case}',
      ai_sentence_done: '{correct}/{total} correct',
      ai_keys_title: '🔑 My AI keys',
      ai_keys_desc: 'Add your own Gemini, Claude or MiniMax key: the AI Coach then works directly from this phone, without a server.',
      ai_keys_privacy: '🔒 Keys are stored only on this device, are not included in backups and are sent only to that AI company. Usage is billed to your account.',
      ai_keys_hint: 'Add your own AI key (Profile)',
      ai_key_none: 'Not added',
      ai_key_saved: '✓ Saved {mask}',
      ai_key_add: '➕ Add',
      ai_key_change: '✏️ Change',
      ai_key_remove: '🗑️ Remove',
      ai_key_placeholder: 'Paste your API key',
      ai_key_test_save: 'Test & save',
      ai_key_get: 'Get a key ↗',
      ai_key_testing: '⏳ Testing key…',
      ai_key_ok: '✅ Key works and was saved',
      ai_key_fail: '❌ Key did not work: {error}',
      ai_key_removed: 'Key removed from this device',
      ai_key_remove_confirm: 'Remove the {provider} key from this device?',
      ai_key_offline: 'Internet is required to test the key.',
      ai_own_key: 'your key',
      ai_key_default: '⭐ Default',
      ai_key_make_default: '⭐ Make default',
      ai_key_default_set: '⭐ {provider} is now the default AI',
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
      content_updated: '📥 Neue Inhalte geladen!',
      press_back_exit: 'Zum Beenden erneut zurück drücken',
      text_size: '🔤 Schriftgröße',
      text_size_small: 'Klein',
      text_size_normal: 'Normal',
      text_size_large: 'Groß',
      text_size_xlarge: 'Sehr groß',
      srs_due_badge: '🔁 {n} wiederholen',
      srs_stats: 'Gemeistert: {mastered} · Zur Wiederholung: {due}',
      weak_title: '🧠 Meine schwachen Wörter',
      weak_empty: 'Noch keine schwachen Wörter — sie erscheinen hier, sobald du Quizze spielst.',
      weak_practice: '🎯 Diese üben',
      speech_auto: '🔊 Nach der Antwort vorlesen',
      speech_unavailable: 'Keine deutsche Stimme gefunden. Installiere das deutsche Sprachpaket unter Einstellungen → Text-in-Sprache.',
      backup_title: '💾 Sicherung',
      backup_desc: 'Speichere deinen Fortschritt als Datei und stelle ihn auf einem neuen Handy wieder her.',
      backup_export: '📤 Exportieren',
      backup_import: '📥 Importieren',
      backup_done: '✅ Sicherung erstellt',
      backup_import_confirm: '{n} Profil(e) importieren? Gleiche Profile werden durch die Sicherung ersetzt.',
      backup_import_done: '✅ {n} Profil(e) wiederhergestellt',
      backup_invalid: '⚠️ Ungültige Sicherungsdatei',
      mode_ai: 'KI-Coach',
      mode_ai_desc: 'Persönlicher Tutor mit Gemini · Claude · MiniMax',
      ai_title: '🤖 KI-Coach',
      ai_subtitle: 'Dein KI-gestützter Artikel-Tutor',
      ai_status_online: '🟢 KI online · {provider}',
      ai_status_offline: '⚪ Offline-Modus — Tipps aus den eingebauten Regeln',
      ai_provider: 'KI-Modell',
      ai_provider_auto: 'Automatisch',
      ai_quiz_title: '🎯 KI-Quiz',
      ai_quiz_desc: 'Merktipp bei jedem Fehler, Fehleranalyse am Ende',
      ai_lookup_title: '🔍 Artikel-Detektiv',
      ai_lookup_desc: 'Frag nach jedem Wort: Artikel, Regel, Plural, Beispielsatz',
      ai_sentence_title: '✍️ Satz-Meister',
      ai_sentence_desc: 'KI-Sätze mit deinen schwachen Wörtern — Fälle üben',
      ai_needs_online: '🌐 Internet und KI-Server erforderlich',
      ai_menu_back: '← KI-Coach',
      ai_tip_title: '💡 Merktipp',
      ai_tip_ai: '🤖 {provider} erklärt',
      ai_loading: 'KI denkt nach…',
      ai_error: 'Die KI konnte gerade nicht antworten — der Regeltipp oben gilt weiterhin.',
      ai_continue: 'Weiter ➔',
      ai_correct_was: 'Richtig: {answer}',
      ai_examples: 'Gleiche Regel',
      ai_rule_suffix: 'Wörter auf "{suffix}" haben meist {article} ({desc}).',
      ai_rule_category: 'Kategorieregel: "{category}" → {article}.',
      ai_rule_exception: '⚠️ Ausnahme: {desc}',
      ai_rule_compound: 'Kompositum: der letzte Teil bestimmt den Artikel → {part}.',
      ai_rule_none: 'Für dieses Wort gibt es keine klare Regel; lerne es mit Artikel.',
      ai_rule_group: '{pct} % der Wörter der Gruppe "{group}" haben {article} — eine starke Tendenz, keine feste Regel.',
      ai_type_group: 'Gruppentendenz',
      ai_advice_group: 'Lerne Wörter in Themengruppen; meist überwiegt ein Artikel.',
      ai_trick_suffix: 'Siehst du "{suffix}", denk sofort an {article}!',
      ai_trick_category: 'Denk an die Gruppe "{category}": alle {article}.',
      ai_trick_exception: 'Das ist eine Ausnahme — lerne "{article} {word}" als feste Einheit.',
      ai_trick_compound: 'Achte nur auf den letzten Teil: {part} → {article} {word}.',
      ai_trick_color: 'Stell dir "{article} {word}" in {color} vor; die Farbe erinnert an den Artikel.',
      color_der: 'Blau',
      color_die: 'Rot',
      color_das: 'Grün',
      ai_analysis_title: '🧠 Fehleranalyse',
      ai_type_suffix: 'Endungsregel',
      ai_type_category: 'Kategorieregel',
      ai_type_exception: 'Ausnahme',
      ai_type_compound: 'Kompositum',
      ai_type_memorize: 'Auswendig lernen',
      ai_advice_suffix: 'Wiederhole Regeln → Endungen; denk bei der Endung an den Artikel.',
      ai_advice_category: 'Wiederhole die Kategorieregeln (Tage, Berufe, Farben…).',
      ai_advice_exception: 'Schau dir Regeln → Ausnahmen an; die musst du auswendig lernen.',
      ai_advice_compound: 'Bei Komposita zählt nur das letzte Wort.',
      ai_advice_memorize: 'Übe diese Wörter mit Profil → "Meine schwachen Wörter".',
      ai_no_mistakes: '🎉 Keine Fehler, super!',
      ai_play_again: '🔄 Neue Runde',
      ai_lookup_placeholder: 'Deutsches Wort eingeben… (z.B. Zeitung)',
      ai_lookup_btn: '🔍 Suchen',
      ai_lookup_recent: 'Letzte Suchen',
      ai_lookup_notfound: 'Nicht im Wörterbuch; Vermutung nach Endung: {article} (unsicher).',
      ai_lookup_unknown: 'Nicht im Wörterbuch und keine Regel passt. Die KI braucht Internet.',
      ai_lookup_not_noun: 'Das scheint kein Nomen zu sein — Artikel stehen nur vor Nomen.',
      ai_lookup_invalid: 'Bitte gib ein einzelnes deutsches Wort ein.',
      ai_source_db: '📚 Wörterbuch',
      ai_source_rules: '📏 Regelbasierte Vermutung',
      ai_source_ai: '🤖 {provider}',
      ai_plural: 'Plural',
      ai_example: 'Beispiel',
      ai_confidence_low: '⚠️ Unsicher',
      ai_sentence_loading: 'Sätze werden für dich erstellt…',
      ai_sentence_case: 'Fall: {case}',
      ai_sentence_done: '{correct}/{total} richtig',
      ai_keys_title: '🔑 Meine KI-Schlüssel',
      ai_keys_desc: 'Füge deinen eigenen Gemini-, Claude- oder MiniMax-Schlüssel hinzu: Der KI-Coach läuft dann direkt auf diesem Handy, ohne Server.',
      ai_keys_privacy: '🔒 Schlüssel werden nur auf diesem Gerät gespeichert, nicht gesichert und nur an den jeweiligen KI-Anbieter gesendet. Die Nutzung wird deinem Konto berechnet.',
      ai_keys_hint: 'Eigenen KI-Schlüssel hinzufügen (Profil)',
      ai_key_none: 'Nicht hinzugefügt',
      ai_key_saved: '✓ Gespeichert {mask}',
      ai_key_add: '➕ Hinzufügen',
      ai_key_change: '✏️ Ändern',
      ai_key_remove: '🗑️ Entfernen',
      ai_key_placeholder: 'API-Schlüssel einfügen',
      ai_key_test_save: 'Testen & speichern',
      ai_key_get: 'Schlüssel holen ↗',
      ai_key_testing: '⏳ Schlüssel wird getestet…',
      ai_key_ok: '✅ Schlüssel funktioniert und wurde gespeichert',
      ai_key_fail: '❌ Schlüssel funktioniert nicht: {error}',
      ai_key_removed: 'Schlüssel von diesem Gerät entfernt',
      ai_key_remove_confirm: '{provider}-Schlüssel von diesem Gerät entfernen?',
      ai_key_offline: 'Zum Testen des Schlüssels wird Internet benötigt.',
      ai_own_key: 'eigener Schlüssel',
      ai_key_default: '⭐ Standard',
      ai_key_make_default: '⭐ Als Standard',
      ai_key_default_set: '⭐ {provider} ist jetzt die Standard-KI',
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
      content_updated: '📥 Новий вміст завантажено!',
      press_back_exit: 'Натисніть «Назад» ще раз, щоб вийти',
      text_size: '🔤 Розмір тексту',
      text_size_small: 'Малий',
      text_size_normal: 'Звичайний',
      text_size_large: 'Великий',
      text_size_xlarge: 'Дуже великий',
      srs_due_badge: '🔁 {n} на повторення',
      srs_stats: 'Засвоєно: {mastered} · Чекають повторення: {due}',
      weak_title: '🧠 Мої слабкі слова',
      weak_empty: 'Слабких слів поки немає — вони з’являться тут під час вікторин.',
      weak_practice: '🎯 Повторити їх',
      speech_auto: '🔊 Озвучувати після відповіді',
      speech_unavailable: 'Німецький голос не знайдено. Встановіть німецький мовний пакет у Налаштування → Синтез мовлення.',
      backup_title: '💾 Резервна копія',
      backup_desc: 'Збережіть прогрес у файл і відновіть його на новому телефоні.',
      backup_export: '📤 Експорт',
      backup_import: '📥 Імпорт',
      backup_done: '✅ Резервну копію створено',
      backup_import_confirm: 'Імпортувати профілі ({n})? Однакові профілі буде замінено копією.',
      backup_import_done: '✅ Відновлено профілів: {n}',
      backup_invalid: '⚠️ Недійсний файл резервної копії',
      mode_ai: 'AI-тренер',
      mode_ai_desc: 'Особистий викладач на базі Gemini · Claude · MiniMax',
      ai_title: '🤖 AI-тренер',
      ai_subtitle: 'Твій особистий викладач артиклів на основі ШІ',
      ai_status_online: '🟢 ШІ онлайн · {provider}',
      ai_status_offline: '⚪ Офлайн-режим — підказки з вбудованих правил',
      ai_provider: 'Модель ШІ',
      ai_provider_auto: 'Автоматично',
      ai_quiz_title: '🎯 AI-вікторина',
      ai_quiz_desc: 'Підказка при кожній помилці, аналіз помилок наприкінці',
      ai_lookup_title: '🔍 Детектив артиклів',
      ai_lookup_desc: 'Запитай про будь-яке слово: артикль, правило, множина, приклад',
      ai_sentence_title: '✍️ Майстер речень',
      ai_sentence_desc: 'Речення від ШІ з твоїми слабкими словами — практика відмінків',
      ai_needs_online: '🌐 Потрібні інтернет і сервер ШІ',
      ai_menu_back: '← AI-тренер',
      ai_tip_title: '💡 Ключова підказка',
      ai_tip_ai: '🤖 Пояснення {provider}',
      ai_loading: 'ШІ думає…',
      ai_error: 'ШІ зараз не відповідає — підказка за правилом вище залишається чинною.',
      ai_continue: 'Далі ➔',
      ai_correct_was: 'Правильно: {answer}',
      ai_examples: 'За тим самим правилом',
      ai_rule_suffix: 'Слова на "{suffix}" зазвичай мають {article} ({desc}).',
      ai_rule_category: 'Правило категорії: "{category}" → {article}.',
      ai_rule_exception: '⚠️ Виняток: {desc}',
      ai_rule_compound: 'Складне слово: артикль визначає остання частина → {part}.',
      ai_rule_none: 'Це слово не підпадає під чітке правило; запам’ятай його разом з артиклем.',
      ai_rule_group: '{pct}% слів у групі "{group}" мають {article} — сильна тенденція, але не суворе правило.',
      ai_type_group: 'Тенденція групи',
      ai_advice_group: 'Вчи слова тематичними групами; у більшості груп переважає один артикль.',
      ai_trick_suffix: 'Бачиш "{suffix}" — одразу думай {article}!',
      ai_trick_category: 'Згадай групу "{category}": усі вони {article}.',
      ai_trick_exception: 'Це виняток — запам’ятай "{article} {word}" як сталий вираз.',
      ai_trick_compound: 'Дивись лише на останню частину: {part} → {article} {word}.',
      ai_trick_color: 'Уяви "{article} {word}" у кольорі «{color}» — колір нагадає артикль.',
      color_der: 'синій',
      color_die: 'червоний',
      color_das: 'зелений',
      ai_analysis_title: '🧠 Аналіз помилок',
      ai_type_suffix: 'Правило суфікса',
      ai_type_category: 'Правило категорії',
      ai_type_exception: 'Виняток',
      ai_type_compound: 'Складне слово',
      ai_type_memorize: 'Запам’ятовування',
      ai_advice_suffix: 'Повтори Правила → суфікси; згадуй артикль, побачивши закінчення.',
      ai_advice_category: 'Переглянь правила категорій (дні, професії, кольори…).',
      ai_advice_exception: 'Вивчи Правила → Винятки; їх треба запам’ятати.',
      ai_advice_compound: 'У складних словах дивись лише на останнє слово.',
      ai_advice_memorize: 'Повтори ці слова через Профіль → «Мої слабкі слова».',
      ai_no_mistakes: '🎉 Жодної помилки, чудово!',
      ai_play_again: '🔄 Новий раунд',
      ai_lookup_placeholder: 'Введи німецьке слово… (напр. Zeitung)',
      ai_lookup_btn: '🔍 Знайти',
      ai_lookup_recent: 'Останні пошуки',
      ai_lookup_notfound: 'Немає у словнику; припущення за закінченням: {article} (неточно).',
      ai_lookup_unknown: 'Немає у словнику, і жодне правило не підходить. ШІ потребує інтернету.',
      ai_lookup_not_noun: 'Схоже, це не іменник — артиклі вживаються лише з іменниками.',
      ai_lookup_invalid: 'Будь ласка, введи одне німецьке слово.',
      ai_source_db: '📚 Словник',
      ai_source_rules: '📏 Припущення за правилом',
      ai_source_ai: '🤖 {provider}',
      ai_plural: 'Множина',
      ai_example: 'Приклад',
      ai_confidence_low: '⚠️ Низька впевненість',
      ai_sentence_loading: 'Готуємо речення спеціально для тебе…',
      ai_sentence_case: 'Відмінок: {case}',
      ai_sentence_done: '{correct}/{total} правильно',
      ai_keys_title: '🔑 Мої ключі ШІ',
      ai_keys_desc: 'Додай власний ключ Gemini, Claude або MiniMax: AI-тренер працюватиме прямо з цього телефона, без сервера.',
      ai_keys_privacy: '🔒 Ключі зберігаються лише на цьому пристрої, не входять до резервної копії й надсилаються тільки відповідній компанії ШІ. Оплата — з твого облікового запису.',
      ai_keys_hint: 'Додай власний ключ ШІ (Профіль)',
      ai_key_none: 'Не додано',
      ai_key_saved: '✓ Збережено {mask}',
      ai_key_add: '➕ Додати',
      ai_key_change: '✏️ Змінити',
      ai_key_remove: '🗑️ Видалити',
      ai_key_placeholder: 'Встав API-ключ',
      ai_key_test_save: 'Перевірити й зберегти',
      ai_key_get: 'Отримати ключ ↗',
      ai_key_testing: '⏳ Перевірка ключа…',
      ai_key_ok: '✅ Ключ працює і збережений',
      ai_key_fail: '❌ Ключ не спрацював: {error}',
      ai_key_removed: 'Ключ видалено з пристрою',
      ai_key_remove_confirm: 'Видалити ключ {provider} з цього пристрою?',
      ai_key_offline: 'Для перевірки ключа потрібен інтернет.',
      ai_own_key: 'твій ключ',
      ai_key_default: '⭐ За замовчуванням',
      ai_key_make_default: '⭐ Зробити основним',
      ai_key_default_set: '⭐ {provider} тепер основний ШІ',
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
      content_updated: '📥 تم تنزيل محتوى جديد!',
      press_back_exit: 'اضغط رجوع مرة أخرى للخروج',
      text_size: '🔤 حجم الخط',
      text_size_small: 'صغير',
      text_size_normal: 'عادي',
      text_size_large: 'كبير',
      text_size_xlarge: 'كبير جدًا',
      srs_due_badge: '🔁 {n} للمراجعة',
      srs_stats: 'متقنة: {mastered} · بانتظار المراجعة: {due}',
      weak_title: '🧠 كلماتي الضعيفة',
      weak_empty: 'لا توجد كلمات ضعيفة بعد — ستظهر هنا أثناء حل الاختبارات.',
      weak_practice: '🎯 تدرّب عليها',
      speech_auto: '🔊 القراءة بصوت عالٍ بعد الإجابة',
      speech_unavailable: 'لم يتم العثور على صوت ألماني. ثبّت حزمة اللغة الألمانية من الإعدادات ← تحويل النص إلى كلام.',
      backup_title: '💾 النسخ الاحتياطي',
      backup_desc: 'احفظ تقدمك في ملف واستعده على هاتف جديد.',
      backup_export: '📤 تصدير',
      backup_import: '📥 استيراد',
      backup_done: '✅ النسخة الاحتياطية جاهزة',
      backup_import_confirm: 'استيراد {n} ملف(ات) شخصية؟ سيتم استبدال الملفات المطابقة بالنسخة الاحتياطية.',
      backup_import_done: '✅ تمت استعادة {n} ملف(ات) شخصية',
      backup_invalid: '⚠️ ملف نسخ احتياطي غير صالح',
      mode_ai: 'مدرّب الذكاء الاصطناعي',
      mode_ai_desc: 'معلم شخصي يعمل بـ Gemini · Claude · MiniMax',
      ai_title: '🤖 مدرّب الذكاء الاصطناعي',
      ai_subtitle: 'معلمك الشخصي لأدوات التعريف بالذكاء الاصطناعي',
      ai_status_online: '🟢 الذكاء الاصطناعي متصل · {provider}',
      ai_status_offline: '⚪ وضع عدم الاتصال — النصائح من القواعد المدمجة',
      ai_provider: 'محرك الذكاء الاصطناعي',
      ai_provider_auto: 'تلقائي',
      ai_quiz_title: '🎯 اختبار ذكي',
      ai_quiz_desc: 'نصيحة عند كل خطأ وتحليل للأخطاء في النهاية',
      ai_lookup_title: '🔍 محقق الأدوات',
      ai_lookup_desc: 'اسأل عن أي كلمة: الأداة، القاعدة، الجمع، جملة مثال',
      ai_sentence_title: '✍️ أستاذ الجمل',
      ai_sentence_desc: 'جمل من الذكاء الاصطناعي بكلماتك الضعيفة — تدريب على حالات الإعراب',
      ai_needs_online: '🌐 يتطلب الإنترنت وخادم الذكاء الاصطناعي',
      ai_menu_back: '← المدرّب',
      ai_tip_title: '💡 نصيحة مهمة',
      ai_tip_ai: '🤖 شرح {provider}',
      ai_loading: 'الذكاء الاصطناعي يفكر…',
      ai_error: 'تعذر على الذكاء الاصطناعي الرد الآن — النصيحة المبنية على القاعدة أعلاه ما زالت صالحة.',
      ai_continue: 'متابعة ➔',
      ai_correct_was: 'الصحيح: {answer}',
      ai_examples: 'كلمات بنفس القاعدة',
      ai_rule_suffix: 'الكلمات المنتهية بـ "{suffix}" تأخذ غالبًا {article} ({desc}).',
      ai_rule_category: 'قاعدة الفئة: "{category}" ← {article}.',
      ai_rule_exception: '⚠️ استثناء: {desc}',
      ai_rule_compound: 'كلمة مركبة: الجزء الأخير يحدد الأداة ← {part}.',
      ai_rule_none: 'لا تتبع هذه الكلمة قاعدة واضحة؛ احفظها مع أداتها.',
      ai_rule_group: '{pct}% من كلمات مجموعة "{group}" تأخذ {article} — ميل قوي وليس قاعدة صارمة.',
      ai_type_group: 'ميل المجموعة',
      ai_advice_group: 'تعلّم الكلمات ضمن مجموعات موضوعية؛ غالبًا ما تسود أداة واحدة في كل مجموعة.',
      ai_trick_suffix: 'عندما ترى "{suffix}" فكّر فورًا في {article}!',
      ai_trick_category: 'تذكّر مجموعة "{category}": كلها {article}.',
      ai_trick_exception: 'هذا استثناء — احفظ "{article} {word}" كعبارة ثابتة.',
      ai_trick_compound: 'انظر إلى الجزء الأخير فقط: {part} ← {article} {word}.',
      ai_trick_color: 'تخيّل "{article} {word}" باللون {color}؛ اللون يذكّرك بالأداة.',
      color_der: 'الأزرق',
      color_die: 'الأحمر',
      color_das: 'الأخضر',
      ai_analysis_title: '🧠 تحليل الأخطاء',
      ai_type_suffix: 'قاعدة اللاحقة',
      ai_type_category: 'قاعدة الفئة',
      ai_type_exception: 'استثناء',
      ai_type_compound: 'كلمة مركبة',
      ai_type_memorize: 'حفظ',
      ai_advice_suffix: 'راجع القواعد ← اللواحق؛ تذكّر الأداة عند رؤية النهاية.',
      ai_advice_category: 'راجع قواعد الفئات (الأيام، المهن، الألوان…).',
      ai_advice_exception: 'ادرس القواعد ← الاستثناءات؛ تحتاج إلى حفظ.',
      ai_advice_compound: 'في الكلمات المركبة انظر إلى الكلمة الأخيرة فقط.',
      ai_advice_memorize: 'تدرّب على هذه الكلمات من الملف الشخصي ← "كلماتي الضعيفة".',
      ai_no_mistakes: '🎉 لا أخطاء، رائع!',
      ai_play_again: '🔄 جولة جديدة',
      ai_lookup_placeholder: 'اكتب كلمة ألمانية… (مثل Zeitung)',
      ai_lookup_btn: '🔍 بحث',
      ai_lookup_recent: 'عمليات البحث الأخيرة',
      ai_lookup_notfound: 'غير موجودة في القاموس؛ تخمين حسب النهاية: {article} (غير مؤكد).',
      ai_lookup_unknown: 'غير موجودة في القاموس ولا تنطبق عليها قاعدة. الذكاء الاصطناعي يحتاج إلى الإنترنت.',
      ai_lookup_not_noun: 'يبدو أن هذه ليست اسمًا — الأدوات تُستخدم مع الأسماء فقط.',
      ai_lookup_invalid: 'يرجى كتابة كلمة ألمانية واحدة.',
      ai_source_db: '📚 القاموس',
      ai_source_rules: '📏 تخمين بالقاعدة',
      ai_source_ai: '🤖 {provider}',
      ai_plural: 'الجمع',
      ai_example: 'مثال',
      ai_confidence_low: '⚠️ ثقة منخفضة',
      ai_sentence_loading: 'نحضّر جملًا خاصة بك…',
      ai_sentence_case: 'الحالة: {case}',
      ai_sentence_done: '{correct}/{total} صحيحة',
      ai_keys_title: '🔑 مفاتيح الذكاء الاصطناعي',
      ai_keys_desc: 'أضف مفتاحك الخاص من Gemini أو Claude أو MiniMax: يعمل المدرّب حينها مباشرة من هذا الهاتف دون خادم.',
      ai_keys_privacy: '🔒 يُحفظ المفتاح على هذا الجهاز فقط، ولا يُضمَّن في النسخ الاحتياطي، ويُرسل فقط إلى شركة الذكاء الاصطناعي المعنية. تُحتسب التكلفة على حسابك.',
      ai_keys_hint: 'أضف مفتاحك الخاص (الملف الشخصي)',
      ai_key_none: 'غير مضاف',
      ai_key_saved: '✓ محفوظ {mask}',
      ai_key_add: '➕ إضافة',
      ai_key_change: '✏️ تغيير',
      ai_key_remove: '🗑️ حذف',
      ai_key_placeholder: 'الصق مفتاح API',
      ai_key_test_save: 'اختبار وحفظ',
      ai_key_get: 'احصل على مفتاح ↗',
      ai_key_testing: '⏳ جارٍ اختبار المفتاح…',
      ai_key_ok: '✅ المفتاح يعمل وتم حفظه',
      ai_key_fail: '❌ المفتاح لم يعمل: {error}',
      ai_key_removed: 'تم حذف المفتاح من هذا الجهاز',
      ai_key_remove_confirm: 'حذف مفتاح {provider} من هذا الجهاز؟',
      ai_key_offline: 'يلزم الاتصال بالإنترنت لاختبار المفتاح.',
      ai_own_key: 'مفتاحك',
      ai_key_default: '⭐ افتراضي',
      ai_key_make_default: '⭐ اجعله افتراضيًا',
      ai_key_default_set: '⭐ {provider} هو الآن الذكاء الاصطناعي الافتراضي',
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
