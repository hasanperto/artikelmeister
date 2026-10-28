// ============================================
// ArtikelMeister — İçerik çevirileri (DB metinleri)
// Kurallar, istisnalar, başarımlar, ipuçları, seviyeler ve alıştırma metinleri
// veritabanında Türkçe tutulur; burada kaynak metne göre çevrilir.
// Çevirisi olmayan metin (ör. admin panelinden yeni eklenen) olduğu gibi kalır.
// ============================================

const ContentI18n = {
  COLS: { de: 1, en: 2, uk: 3, ar: 4 },

  // [tr, de, en, uk, ar]
  TEXT: [
    // ── Son ek kuralları ──
    ['Alet/Özne (Çok yaygın)', 'Geräte/Handelnde (sehr häufig)', 'Tools/agents (very common)', 'Знаряддя/діячі (дуже часто)', 'أدوات/فاعلون (شائع جدًا)'],
    ['İzmler/Düşünce', 'Ismen/Denkrichtungen', 'Isms/ideologies', 'Ізми/світогляди', 'المذاهب/الأفكار'],
    ['Teknik aletler', 'Technische Geräte', 'Technical devices', 'Технічні пристрої', 'أجهزة تقنية'],
    ['Meslekler', 'Berufe', 'Professions', 'Професії', 'المهن'],
    ['Müzisyen', 'Musiker', 'Musicians', 'Музиканти', 'الموسيقيون'],
    ['Kıta/Nesne', 'Kontinente/Gegenstände', 'Continents/objects', 'Континенти/предмети', 'القارات/الأشياء'],
    ['Çırak/Kişi', 'Lehrlinge/Personen', 'Apprentices/people', 'Учні/особи', 'المتدربون/الأشخاص'],
    ['Emekli/Kişi', 'Rentner/Personen', 'Pensioners/people', 'Пенсіонери/особи', 'المتقاعدون/الأشخاص'],
    ['Uzmanlar', 'Fachleute', 'Experts', 'Фахівці', 'الخبراء'],
    ['Nesneler', 'Gegenstände', 'Objects', 'Предмети', 'الأشياء'],
    ['Milyoner', 'Millionäre/Personen', 'Millionaires/people', 'Мільйонери/особи', 'أصحاب الملايين/الأشخاص'],
    ['Soyut isimler', 'Abstrakte Nomen', 'Abstract nouns', 'Абстрактні іменники', 'أسماء مجردة'],
    ['Peygamber/Kişi', 'Propheten/Personen', 'Prophets/people', 'Пророки/особи', 'الأنبياء/الأشخاص'],
    ['Latince kökenli', 'Lateinischen Ursprungs', 'Of Latin origin', 'Латинського походження', 'من أصل لاتيني'],
    ['der Virus (istisnalar var)', 'der Virus (mit Ausnahmen)', 'der Virus (with exceptions)', 'der Virus (є винятки)', 'der Virus (توجد استثناءات)'],
    ['Eylemden türeyenler', 'Von Verben abgeleitet', 'Derived from verbs', 'Утворені від дієслів', 'مشتقة من أفعال'],
    ['Yetenekler', 'Eigenschaften/Fähigkeiten', 'Qualities/abilities', 'Якості/здібності', 'الصفات/القدرات'],
    ['Topluluk/Durum', 'Gemeinschaft/Zustand', 'Community/state', 'Спільнота/стан', 'الجماعة/الحالة'],
    ['Kadın meslekleri', 'Weibliche Berufe', 'Female professions', 'Жіночі професії', 'مهن النساء'],
    ['%90 dişi kuralı', 'Zu ca. 90 % feminin', 'About 90% feminine', 'Близько 90 % — жіночий рід', 'نحو 90% مؤنث'],
    ['Uluslararası kelimeler', 'Internationale Wörter', 'International words', 'Інтернаціональні слова', 'كلمات دولية'],
    ['Özellik/Durum', 'Eigenschaft/Zustand', 'Quality/state', 'Властивість/стан', 'الصفة/الحالة'],
    ['Kavramlar', 'Begriffe', 'Concepts', 'Поняття', 'مفاهيم'],
    ['Bilim dalları', 'Wissenschaften', 'Fields of science', 'Галузі науки', 'فروع العلوم'],
    ['Yapı/Kavram', 'Struktur/Begriff', 'Structure/concept', 'Структура/поняття', 'البنية/المفهوم'],
    ['Yerler/Eylemler', 'Orte/Tätigkeiten', 'Places/activities', 'Місця/види діяльності', 'الأماكن/الأنشطة'],
    ['Fransızca kökenli', 'Französischen Ursprungs', 'Of French origin', 'Французького походження', 'من أصل فرنسي'],
    ['Kurumlar', 'Einrichtungen', 'Institutions', 'Установи', 'المؤسسات'],
    ['Tıbbi/Teknik', 'Medizinisch/Fachsprachlich', 'Medical/technical', 'Медичні/технічні', 'طبية/تقنية'],
    ['Aletler', 'Geräte/Maschinen', 'Devices/machines', 'Пристрої/машини', 'الأجهزة/الآلات'],
    ['Küçültme (Kesin)', 'Verkleinerung (immer)', 'Diminutive (always)', 'Зменшувальні (завжди)', 'صيغة التصغير (دائمًا)'],
    ['Resmi/Teknik', 'Formell/Fachsprachlich', 'Formal/technical', 'Офіційні/технічні', 'رسمية/تقنية'],
    ['Yerler/Kavramlar', 'Orte/Begriffe', 'Places/concepts', 'Місця/поняття', 'الأماكن/المفاهيم'],
    ['Grekçe kökenli', 'Griechischen Ursprungs', 'Of Greek origin', 'Грецького походження', 'من أصل يوناني'],
    ['Yabancı kökenli', 'Fremdwörter', 'Loanwords', 'Іншомовні слова', 'كلمات دخيلة'],
    ['Eylemden türeyen', 'Von Verben abgeleitet', 'Derived from verbs', 'Утворені від дієслів', 'مشتقة من أفعال'],
    ['Kesirler/Birimler', 'Bruchteile/Einheiten', 'Fractions/units', 'Дроби/одиниці', 'الكسور/الوحدات'],

    // ── Kategori kuralları ──
    ['Erkek canlılar', 'Männliche Lebewesen', 'Male beings', 'Істоти чоловічої статі', 'الكائنات المذكرة'],
    ['Günler', 'Wochentage', 'Days of the week', 'Дні тижня', 'أيام الأسبوع'],
    ['Aylar', 'Monate', 'Months', 'Місяці', 'الأشهر'],
    ['Mevsimler', 'Jahreszeiten', 'Seasons', 'Пори року', 'الفصول'],
    ['Hava olayları', 'Wetterphänomene', 'Weather', 'Погодні явища', 'الظواهر الجوية'],
    ['Yönler', 'Himmelsrichtungen', 'Compass directions', 'Сторони світу', 'الاتجاهات'],
    ['Alkollü içecekler', 'Alkoholische Getränke', 'Alcoholic drinks', 'Алкогольні напої', 'المشروبات الكحولية'],
    ['Araba markaları', 'Automarken', 'Car brands', 'Марки автомобілів', 'ماركات السيارات'],
    ['Para birimleri', 'Währungen', 'Currencies', 'Валюти', 'العملات'],
    ['Dişi canlılar', 'Weibliche Lebewesen', 'Female beings', 'Істоти жіночої статі', 'الكائنات المؤنثة'],
    ['Bitkiler & Meyveler', 'Pflanzen & Früchte', 'Plants & fruits', 'Рослини та фрукти', 'النباتات والفواكه'],
    ['Uçak & Gemiler', 'Flugzeuge & Schiffe', 'Planes & ships', 'Літаки та кораблі', 'الطائرات والسفن'],
    ['Sayılar', 'Zahlen', 'Numbers', 'Числа', 'الأرقام'],
    ['Alman Nehirleri', 'Deutsche Flüsse', 'German rivers', 'Німецькі річки', 'الأنهار الألمانية'],
    ['Yavru canlılar', 'Junge Lebewesen', 'Young beings', 'Дитинчата', 'صغار الكائنات'],
    ['Fiilden türeyen isimler', 'Substantivierte Verben', 'Nouns from verbs', 'Іменники від дієслів', 'أسماء مشتقة من أفعال'],
    ['Renkler', 'Farben', 'Colours', 'Кольори', 'الألوان'],
    ['Metaller', 'Metalle', 'Metals', 'Метали', 'المعادن'],
    ['Diller', 'Sprachen', 'Languages', 'Мови', 'اللغات'],
    ['Kimyasal elementler', 'Chemische Elemente', 'Chemical elements', 'Хімічні елементи', 'العناصر الكيميائية'],
    ['Birimler', 'Maßeinheiten', 'Units of measure', 'Одиниці виміру', 'وحدات القياس'],

    // ── İstisnalar ──
    ['Alkollü içecekler genelde der, ama...', 'Alkoholische Getränke sind meist der, aber...', 'Alcoholic drinks are usually der, but...', 'Алкогольні напої зазвичай der, але...', 'المشروبات الكحولية عادةً der، لكن...'],
    ['Meyveler genelde die, ama...', 'Früchte sind meist die, aber...', 'Fruits are usually die, but...', 'Фрукти зазвичай die, але...', 'الفواكه عادةً die، لكن...'],
    ['-e ile bitenler genelde die, ama...', 'Wörter auf -e sind meist die, aber...', 'Words ending in -e are usually die, but...', 'Слова на -e зазвичай die, але...', 'الكلمات المنتهية بـ -e عادةً die، لكن...'],
    ['Dişi canlı ama -chen eki nedeniyle...', 'Weiblich, aber wegen der Endung -chen...', 'Female, but because of the -chen ending...', 'Жіноча істота, але через суфікс -chen...', 'مؤنث، لكن بسبب اللاحقة -chen...'],
    ['-tum ile bitenler genelde das, ama...', 'Wörter auf -tum sind meist das, aber...', 'Words ending in -tum are usually das, but...', 'Слова на -tum зазвичай das, але...', 'الكلمات المنتهية بـ -tum عادةً das، لكن...'],
    ['Alman nehirleri genelde die, ama...', 'Deutsche Flüsse sind meist die, aber...', 'German rivers are usually die, but...', 'Німецькі річки зазвичай die, але...', 'الأنهار الألمانية عادةً die، لكن...'],
    ['Metaller genelde das, ama...', 'Metalle sind meist das, aber...', 'Metals are usually das, but...', 'Метали зазвичай das, але...', 'المعادن عادةً das، لكن...'],

    // ── Başarımlar ──
    ['İlk Adım', 'Erster Schritt', 'First Step', 'Перший крок', 'الخطوة الأولى'],
    ['İlk quizi tamamla', 'Schließe dein erstes Quiz ab', 'Complete your first quiz', 'Пройди першу вікторину', 'أكمل اختبارك الأول'],
    ['3 Gün Seri', '3-Tage-Serie', '3-Day Streak', 'Серія 3 дні', 'سلسلة 3 أيام'],
    ['3 gün üst üste çalış', 'Lerne 3 Tage in Folge', 'Study 3 days in a row', 'Навчайся 3 дні поспіль', 'ادرس 3 أيام متتالية'],
    ['Haftalık Savaşçı', 'Wochenkämpfer', 'Weekly Warrior', 'Воїн тижня', 'محارب الأسبوع'],
    ['7 gün üst üste çalış', 'Lerne 7 Tage in Folge', 'Study 7 days in a row', 'Навчайся 7 днів поспіль', 'ادرس 7 أيام متتالية'],
    ['Ay Ustası', 'Monatsmeister', 'Master of the Month', 'Майстер місяця', 'سيد الشهر'],
    ['30 gün üst üste çalış', 'Lerne 30 Tage in Folge', 'Study 30 days in a row', 'Навчайся 30 днів поспіль', 'ادرس 30 يومًا متتاليًا'],
    ['Mükemmeliyetçi', 'Perfektionist', 'Perfectionist', 'Перфекціоніст', 'الساعي للكمال'],
    ['Bir quizde 10/10 yap', 'Erreiche 10/10 in einem Quiz', 'Score 10/10 in a quiz', 'Набери 10/10 у вікторині', 'احصل على 10/10 في اختبار'],
    ['Hız Şeytanı', 'Temposünder', 'Speed Demon', 'Демон швидкості', 'شيطان السرعة'],
    ['Hız turunda 20+ doğru yap', 'Schaffe 20+ richtige Antworten in der Geschwindigkeitsrunde', 'Get 20+ right in a Speed Round', 'Дай 20+ правильних відповідей у швидкому раунді', 'أجب 20+ إجابة صحيحة في جولة السرعة'],
    ['DER Ustası', 'DER-Meister', 'DER Master', 'Майстер DER', 'سيد DER'],
    ['50 DER kelimesini öğren', 'Lerne 50 DER-Wörter', 'Learn 50 DER words', 'Вивчи 50 слів з DER', 'تعلّم 50 كلمة مع DER'],
    ['DIE Ustası', 'DIE-Meister', 'DIE Master', 'Майстер DIE', 'سيد DIE'],
    ['50 DIE kelimesini öğren', 'Lerne 50 DIE-Wörter', 'Learn 50 DIE words', 'Вивчи 50 слів з DIE', 'تعلّم 50 كلمة مع DIE'],
    ['DAS Ustası', 'DAS-Meister', 'DAS Master', 'Майстер DAS', 'سيد DAS'],
    ['50 DAS kelimesini öğren', 'Lerne 50 DAS-Wörter', 'Learn 50 DAS words', 'Вивчи 50 слів з DAS', 'تعلّم 50 كلمة مع DAS'],
    ['İstisna Avcısı', 'Ausnahmenjäger', 'Exception Hunter', 'Мисливець за винятками', 'صائد الاستثناءات'],
    ['Tüm istisnaları doğru bil', 'Beantworte alle Ausnahmen richtig', 'Get all exceptions right', 'Правильно назви всі винятки', 'أجب عن كل الاستثناءات بشكل صحيح'],
    ['Kural Bilgini', 'Regelkenner', 'Rule Scholar', 'Знавець правил', 'عالِم القواعد'],
    ['Tüm kural kartlarını oku', 'Lies alle Regelkarten', 'Read all rule cards', 'Прочитай усі картки правил', 'اقرأ كل بطاقات القواعد'],
    ['Kelime Koleksiyoncusu', 'Wortsammler', 'Word Collector', 'Колекціонер слів', 'جامع الكلمات'],
    ['100 kelime öğren', 'Lerne 100 Wörter', 'Learn 100 words', 'Вивчи 100 слів', 'تعلّم 100 كلمة'],
    ['Seviye 10', 'Level 10', 'Level 10', 'Рівень 10', 'المستوى 10'],
    ["Seviye 10'a ulaş", 'Erreiche Level 10', 'Reach level 10', 'Досягни 10 рівня', 'صِل إلى المستوى 10'],
    ['İsmin Halleri Ustası', 'Kasus-Meister', 'Cases Master', 'Майстер відмінків', 'سيد الحالات الإعرابية'],
    ['Değişim Macerasında %80+ yap', 'Erreiche 80 %+ im Deklinations-Abenteuer', 'Score 80%+ in the Declension Adventure', 'Набери 80 %+ у «Пригоді відмінювання»', 'احصل على 80%+ في مغامرة الإعراب'],

    // ── Seviye adları (titleTr) ──
    ['Başlangıç', 'Anfänger', 'Beginner', 'Початківець', 'مبتدئ'],
    ['Öğrenci', 'Lernender', 'Learner', 'Учень', 'متعلّم'],
    ['İlerleyen', 'Fortgeschritten', 'Advanced', 'Просунутий', 'متقدّم'],
    ['Pratikçi', 'Praktikant', 'Practitioner', 'Практик', 'متمرّس'],
    ['Bilen', 'Kenner', 'Connoisseur', 'Знавець', 'عارف'],
    ['Uzman', 'Experte', 'Expert', 'Експерт', 'خبير'],
    ['Profesyonel', 'Profi', 'Pro', 'Профі', 'محترف'],
    ['Usta', 'Meister', 'Master', 'Майстер', 'أستاذ'],
    ['Büyük Usta', 'Großmeister', 'Grandmaster', 'Гросмейстер', 'أستاذ كبير'],
    ['Artikel Kralı', 'Artikelkönig', 'Article King', 'Король артиклів', 'ملك الأدوات'],

    // ── Öğrenme kartı ipuçları ──
    ['Çoğul Kural', 'Pluralregel', 'Plural Rule', 'Правило множини', 'قاعدة الجمع'],
    ["Tüm kelimelerin çoğul artikeli DIE'dir. (die Männer, die Frauen, die Kinder)",
      'Im Plural ist der Artikel immer DIE. (die Männer, die Frauen, die Kinder)',
      'In the plural, the article is always DIE. (die Männer, die Frauen, die Kinder)',
      'У множині артикль завжди DIE. (die Männer, die Frauen, die Kinder)',
      'في الجمع تكون الأداة دائمًا DIE. (die Männer, die Frauen, die Kinder)'],
    ['Bileşik Kelime', 'Komposita', 'Compound Words', 'Складні слова', 'الكلمات المركبة'],
    ['Bileşik kelimelerde artikel SON kelimeye göre belirlenir. der Tisch + die Decke = die Tischdecke',
      'Bei zusammengesetzten Wörtern bestimmt das LETZTE Wort den Artikel. der Tisch + die Decke = die Tischdecke',
      'In compound words, the LAST word decides the article. der Tisch + die Decke = die Tischdecke',
      'У складних словах артикль визначає ОСТАННЄ слово. der Tisch + die Decke = die Tischdecke',
      'في الكلمات المركبة تحدد الكلمةُ الأخيرة الأداة. der Tisch + die Decke = die Tischdecke'],
    ['Küçültme Eki', 'Verkleinerungsendung', 'Diminutive Suffix', 'Зменшувальний суфікс', 'لاحقة التصغير'],
    ['-chen ve -lein ile biten tüm kelimeler DAS alır. das Mädchen, das Brötchen',
      'Alle Wörter auf -chen und -lein haben DAS. das Mädchen, das Brötchen',
      'All words ending in -chen and -lein take DAS. das Mädchen, das Brötchen',
      'Усі слова на -chen та -lein мають DAS. das Mädchen, das Brötchen',
      'كل الكلمات المنتهية بـ -chen و-lein تأخذ DAS. das Mädchen, das Brötchen'],
    ['-e Kuralı', '-e-Regel', 'The -e Rule', 'Правило -e', 'قاعدة -e'],
    ["-e ile biten kelimelerin yaklaşık %90'ı DIE alır. die Lampe, die Schule, die Straße",
      'Etwa 90 % der Wörter auf -e haben DIE. die Lampe, die Schule, die Straße',
      'About 90% of words ending in -e take DIE. die Lampe, die Schule, die Straße',
      'Близько 90 % слів на -e мають DIE. die Lampe, die Schule, die Straße',
      'نحو 90% من الكلمات المنتهية بـ -e تأخذ DIE. die Lampe, die Schule, die Straße'],
    ['Fiil → İsim', 'Verb → Nomen', 'Verb → Noun', 'Дієслово → іменник', 'فعل ← اسم'],
    ['Fiilden türeyen isimler (mastar hali) DAS alır. das Essen, das Trinken, das Lesen',
      'Substantivierte Verben (Infinitive) haben DAS. das Essen, das Trinken, das Lesen',
      'Nouns made from verbs (infinitives) take DAS. das Essen, das Trinken, das Lesen',
      'Іменники, утворені від дієслів (інфінітиви), мають DAS. das Essen, das Trinken, das Lesen',
      'الأسماء المشتقة من الأفعال (المصدر) تأخذ DAS. das Essen, das Trinken, das Lesen'],
    ['Altın Kural', 'Goldene Regel', 'Golden Rule', 'Золоте правило', 'القاعدة الذهبية'],
    ['Kelimeleri artikelleriyle birlikte öğrenin! "Tisch" değil, "der Tisch" olarak ezberleyin.',
      'Lerne Wörter immer mit Artikel! Merke dir nicht „Tisch", sondern „der Tisch".',
      'Always learn words with their article! Memorise "der Tisch", not just "Tisch".',
      'Завжди вчи слова разом з артиклем! Запам’ятовуй не «Tisch», а «der Tisch».',
      'تعلّم الكلمات دائمًا مع أداتها! لا تحفظ "Tisch" بل "der Tisch".'],
    ['Bileşik Kelime Kuralı', 'Komposita-Regel', 'Compound Word Rule', 'Правило складних слів', 'قاعدة الكلمات المركبة'],
    ['Bileşik kelimelerde artikel, SON kelimeye göre belirlenir.', 'Bei Komposita bestimmt das LETZTE Wort den Artikel.',
      'In compound words, the LAST word decides the article.', 'У складних словах артикль визначає ОСТАННЄ слово.',
      'في الكلمات المركبة تحدد الكلمةُ الأخيرة الأداة.'],

    // ── İsmin halleri alıştırmaları ──
    ["'Hund' erkek (der) cinsidir. 'sehen' (görmek) fiili Akkusativ (-i hali) gerektirir. 'der' Akkusativ'de 'den' olur.",
      "'Hund' ist maskulin (der). Das Verb 'sehen' verlangt den Akkusativ. 'der' wird im Akkusativ zu 'den'.",
      "'Hund' is masculine (der). The verb 'sehen' (to see) takes the Akkusativ. 'der' becomes 'den' in the Akkusativ.",
      "'Hund' — чоловічого роду (der). Дієслово 'sehen' (бачити) вимагає Akkusativ. В Akkusativ 'der' стає 'den'.",
      "'Hund' مذكر (der). الفعل 'sehen' (يرى) يتطلب حالة Akkusativ. في حالة Akkusativ تتحول 'der' إلى 'den'."],
    ["'Freund' erkek (der) cinsidir. 'helfen' (yardım etmek) fiili Dativ (-e hali) gerektirir. 'der' Dativ'de 'dem' olur.",
      "'Freund' ist maskulin (der). Das Verb 'helfen' verlangt den Dativ. 'der' wird im Dativ zu 'dem'.",
      "'Freund' is masculine (der). The verb 'helfen' (to help) takes the Dativ. 'der' becomes 'dem' in the Dativ.",
      "'Freund' — чоловічого роду (der). Дієслово 'helfen' (допомагати) вимагає Dativ. У Dativ 'der' стає 'dem'.",
      "'Freund' مذكر (der). الفعل 'helfen' (يساعد) يتطلب حالة Dativ. في حالة Dativ تتحول 'der' إلى 'dem'."],
    ["'Bäckerei' kelimesi '-ei' eki ile bittiği için dişidir (die). 'zu' edatı her zaman Dativ gerektirir. 'die' Dativ'de 'der' olur.",
      "'Bäckerei' endet auf '-ei' und ist daher feminin (die). Die Präposition 'zu' verlangt immer den Dativ. 'die' wird im Dativ zu 'der'.",
      "'Bäckerei' ends in '-ei', so it is feminine (die). The preposition 'zu' always takes the Dativ. 'die' becomes 'der' in the Dativ.",
      "'Bäckerei' закінчується на '-ei', тому жіночого роду (die). Прийменник 'zu' завжди вимагає Dativ. У Dativ 'die' стає 'der'.",
      "'Bäckerei' تنتهي بـ '-ei' لذا فهي مؤنثة (die). حرف الجر 'zu' يتطلب دائمًا حالة Dativ. في حالة Dativ تتحول 'die' إلى 'der'."],
    ["'Mädchen' kelimesi '-chen' küçültme eki aldığı için nötrdür (das). 'Kızın arabası' anlamında iyelik (Genitiv) durumu vardır. 'das' Genitiv'de 'des' olur.",
      "'Mädchen' hat die Verkleinerungsendung '-chen' und ist daher neutral (das). 'Das Auto des Mädchens' drückt Besitz aus (Genitiv). 'das' wird im Genitiv zu 'des'.",
      "'Mädchen' has the diminutive suffix '-chen', so it is neuter (das). 'The girl's car' expresses possession (Genitiv). 'das' becomes 'des' in the Genitiv.",
      "'Mädchen' має зменшувальний суфікс '-chen', тому середнього роду (das). «Машина дівчинки» виражає приналежність (Genitiv). У Genitiv 'das' стає 'des'.",
      "'Mädchen' فيها لاحقة التصغير '-chen' لذا فهي محايدة (das). «سيارة الفتاة» تعبّر عن الملكية (Genitiv). في حالة Genitiv تتحول 'das' إلى 'des'."],
    ["'Wald' erkek (der) cinsidir. 'durch' (içinden/vasıtasıyla) edatı her zaman Akkusativ gerektirir. 'der' Akkusativ'de 'den' olur.",
      "'Wald' ist maskulin (der). Die Präposition 'durch' verlangt immer den Akkusativ. 'der' wird im Akkusativ zu 'den'.",
      "'Wald' is masculine (der). The preposition 'durch' (through) always takes the Akkusativ. 'der' becomes 'den' in the Akkusativ.",
      "'Wald' — чоловічого роду (der). Прийменник 'durch' (крізь) завжди вимагає Akkusativ. В Akkusativ 'der' стає 'den'.",
      "'Wald' مذكر (der). حرف الجر 'durch' (عبر) يتطلب دائمًا حالة Akkusativ. في حالة Akkusativ تتحول 'der' إلى 'den'."],
    ["'Tisch' erkek (der) cinsidir. 'auf' edatı burada bulunma (nerede?) bildirdiği için Dativ gerektirir. 'der' Dativ'de 'dem' olur.",
      "'Tisch' ist maskulin (der). 'auf' beschreibt hier einen Ort (Wo?) und verlangt daher den Dativ. 'der' wird im Dativ zu 'dem'.",
      "'Tisch' is masculine (der). Here 'auf' describes a location (where?), so it takes the Dativ. 'der' becomes 'dem' in the Dativ.",
      "'Tisch' — чоловічого роду (der). Тут 'auf' означає місце (де?), тому вимагає Dativ. У Dativ 'der' стає 'dem'.",
      "'Tisch' مذكر (der). هنا يدل 'auf' على المكان (أين؟) لذا يتطلب حالة Dativ. في حالة Dativ تتحول 'der' إلى 'dem'."],
    ["'-er' ile biten meslek/alet isimleri genelde 'der' olur. 'brauchen' (ihtiyacı olmak) fiili Akkusativ gerektirir. 'der' -> 'den' olur.",
      "Berufs- und Gerätenamen auf '-er' sind meist 'der'. Das Verb 'brauchen' verlangt den Akkusativ. 'der' -> 'den'.",
      "Job and device names ending in '-er' are usually 'der'. The verb 'brauchen' (to need) takes the Akkusativ. 'der' -> 'den'.",
      "Назви професій і пристроїв на '-er' зазвичай мають 'der'. Дієслово 'brauchen' (потребувати) вимагає Akkusativ. 'der' -> 'den'.",
      "أسماء المهن والأجهزة المنتهية بـ '-er' تأخذ عادةً 'der'. الفعل 'brauchen' (يحتاج) يتطلب حالة Akkusativ. 'der' -> 'den'."],
    ["'-in' eki kadın mesleklerini belirtir ve 'die' alır. 'mit' edatı her zaman Dativ gerektirir. 'die' -> 'der' olur.",
      "Die Endung '-in' bezeichnet weibliche Berufe und hat 'die'. Die Präposition 'mit' verlangt immer den Dativ. 'die' -> 'der'.",
      "The suffix '-in' marks female professions and takes 'die'. The preposition 'mit' always takes the Dativ. 'die' -> 'der'.",
      "Суфікс '-in' позначає жіночі професії й має 'die'. Прийменник 'mit' завжди вимагає Dativ. 'die' -> 'der'.",
      "اللاحقة '-in' تدل على مهن النساء وتأخذ 'die'. حرف الجر 'mit' يتطلب دائمًا حالة Dativ. 'die' -> 'der'."]
  ],

  // Kelime kategorisi anahtarı → [tr, de, en, uk, ar]
  WORD_CATEGORIES: {
    people: ['Kişiler', 'Menschen', 'People', 'Люди', 'الناس'],
    family: ['Aile', 'Familie', 'Family', 'Сім’я', 'العائلة'],
    profession: ['Meslekler', 'Berufe', 'Professions', 'Професії', 'المهن'],
    animals: ['Hayvanlar', 'Tiere', 'Animals', 'Тварини', 'الحيوانات'],
    furniture: ['Mobilya', 'Möbel', 'Furniture', 'Меблі', 'الأثاث'],
    school: ['Okul', 'Schule', 'School', 'Школа', 'المدرسة'],
    technology: ['Teknoloji', 'Technik', 'Technology', 'Техніка', 'التكنولوجيا'],
    food: ['Yiyecekler', 'Essen', 'Food', 'Їжа', 'الطعام'],
    nature: ['Doğa', 'Natur', 'Nature', 'Природа', 'الطبيعة'],
    transport: ['Ulaşım', 'Verkehr', 'Transport', 'Транспорт', 'المواصلات'],
    days: ['Günler', 'Wochentage', 'Days', 'Дні тижня', 'أيام الأسبوع'],
    months: ['Aylar', 'Monate', 'Months', 'Місяці', 'الأشهر'],
    seasons: ['Mevsimler', 'Jahreszeiten', 'Seasons', 'Пори року', 'الفصول'],
    weather: ['Hava', 'Wetter', 'Weather', 'Погода', 'الطقس'],
    directions: ['Yönler', 'Himmelsrichtungen', 'Directions', 'Сторони світу', 'الاتجاهات'],
    money: ['Para', 'Geld', 'Money', 'Гроші', 'المال'],
    drinks: ['İçecekler', 'Getränke', 'Drinks', 'Напої', 'المشروبات'],
    clothing: ['Giyim', 'Kleidung', 'Clothing', 'Одяг', 'الملابس'],
    objects: ['Eşyalar', 'Gegenstände', 'Objects', 'Предмети', 'الأشياء'],
    places: ['Yerler', 'Orte', 'Places', 'Місця', 'الأماكن'],
    rooms: ['Odalar', 'Räume', 'Rooms', 'Кімнати', 'الغرف'],
    abstract: ['Soyut kavramlar', 'Abstrakte Begriffe', 'Abstract', 'Абстрактні поняття', 'مفاهيم مجردة'],
    hobbies: ['Hobiler', 'Hobbys', 'Hobbies', 'Хобі', 'الهوايات'],
    time: ['Zaman', 'Zeit', 'Time', 'Час', 'الوقت'],
    materials: ['Malzemeler', 'Materialien', 'Materials', 'Матеріали', 'المواد'],
    events: ['Etkinlikler', 'Ereignisse', 'Events', 'Події', 'المناسبات'],
    body: ['Vücut', 'Körper', 'Body', 'Тіло', 'الجسم'],
    health: ['Sağlık', 'Gesundheit', 'Health', 'Здоров’я', 'الصحة'],
    science: ['Bilim', 'Wissenschaft', 'Science', 'Наука', 'العلوم'],
    plants: ['Bitkiler & meyveler', 'Pflanzen & Obst', 'Plants & fruit', 'Рослини й фрукти', 'النباتات والفواكه'],
    vessels: ['Uçak & gemiler', 'Flugzeuge & Schiffe', 'Aircraft & ships', 'Літаки й кораблі', 'الطائرات والسفن'],
    numbers: ['Sayılar', 'Zahlen', 'Numbers', 'Числа', 'الأرقام'],
    rivers: ['Nehirler', 'Flüsse', 'Rivers', 'Річки', 'الأنهار'],
    colors: ['Renkler', 'Farben', 'Colours', 'Кольори', 'الألوان'],
    languages: ['Diller', 'Sprachen', 'Languages', 'Мови', 'اللغات'],
    units: ['Birimler', 'Maßeinheiten', 'Units', 'Одиниці виміру', 'الوحدات'],
    brands: ['Markalar', 'Marken', 'Brands', 'Бренди', 'العلامات التجارية']
  },

  // Alıştırma kelimelerinin anlamı → [en, uk, ar] (DE'de anlam gösterilmez)
  WORD_MEANINGS: {
    Hund: ['dog', 'собака', 'كلب'],
    Freund: ['friend', 'друг', 'صديق'],
    Bäckerei: ['bakery', 'пекарня', 'مخبز'],
    Mädchen: ['girl', 'дівчинка', 'فتاة'],
    Wald: ['forest', 'ліс', 'غابة'],
    Tisch: ['table', 'стіл', 'طاولة'],
    Computer: ['computer', 'комп’ютер', 'حاسوب'],
    Lehrerin: ['teacher (f)', 'вчителька', 'معلّمة']
  },

  // Örnek cümle (Almanca) → [en, uk, ar] (DE'de anlam gösterilmez)
  GLOSSES: [
    // Nominativ
    ['Der Mann schläft.', 'The man is sleeping.', 'Чоловік спить.', 'الرجل نائم.'],
    ['Die Frau lacht.', 'The woman is laughing.', 'Жінка сміється.', 'المرأة تضحك.'],
    ['Das Kind spielt.', 'The child is playing.', 'Дитина грається.', 'الطفل يلعب.'],
    ['Die Katze rennt.', 'The cat is running.', 'Кішка біжить.', 'القطة تجري.'],
    ['Der Hund bellt.', 'The dog is barking.', 'Собака гавкає.', 'الكلب ينبح.'],
    ['Der Baum ist groß.', 'The tree is big.', 'Дерево велике.', 'الشجرة كبيرة.'],
    ['Die Sonne scheint.', 'The sun is shining.', 'Сонце світить.', 'الشمس مشرقة.'],
    ['Das Auto ist neu.', 'The car is new.', 'Машина нова.', 'السيارة جديدة.'],
    ['Das Haus ist alt.', 'The house is old.', 'Будинок старий.', 'البيت قديم.'],
    ['Der Apfel ist rot.', 'The apple is red.', 'Яблуко червоне.', 'التفاحة حمراء.'],
    ['Die Suppe ist heiß.', 'The soup is hot.', 'Суп гарячий.', 'الحساء ساخن.'],
    ['Der Vogel singt.', 'The bird is singing.', 'Птах співає.', 'الطائر يغرّد.'],
    ['Der Zug kommt.', 'The train is coming.', 'Потяг прибуває.', 'القطار قادم.'],
    ['Der Computer ist aus.', 'The computer is off.', 'Комп’ютер вимкнений.', 'الحاسوب مطفأ.'],
    ['Das Buch ist dick.', 'The book is thick.', 'Книжка товста.', 'الكتاب سميك.'],
    ['Die Stadt ist laut.', 'The city is noisy.', 'Місто галасливе.', 'المدينة صاخبة.'],
    ['Das Meer ist tief.', 'The sea is deep.', 'Море глибоке.', 'البحر عميق.'],
    ['Der Berg ist hoch.', 'The mountain is high.', 'Гора висока.', 'الجبل عالٍ.'],
    ['Die Schule ist nah.', 'The school is nearby.', 'Школа поруч.', 'المدرسة قريبة.'],
    ['Die Tasche ist schwer.', 'The bag is heavy.', 'Сумка важка.', 'الحقيبة ثقيلة.'],
    ['Der Schlüssel passt.', 'The key fits.', 'Ключ підходить.', 'المفتاح مناسب.'],
    ['Der Tee schmeckt.', 'The tea tastes good.', 'Чай смачний.', 'الشاي لذيذ.'],
    ['Der Kaffee ist bitter.', 'The coffee is bitter.', 'Кава гірка.', 'القهوة مُرّة.'],
    ['Der Ball ist rund.', 'The ball is round.', 'М’яч круглий.', 'الكرة مستديرة.'],
    ['Das Fahrrad ist kaputt.', 'The bike is broken.', 'Велосипед зламаний.', 'الدراجة معطّلة.'],
    ['Das Handy klingelt.', 'The phone is ringing.', 'Телефон дзвонить.', 'الهاتف يرنّ.'],
    ['Der Stift schreibt.', 'The pen writes.', 'Ручка пише.', 'القلم يكتب.'],
    ['Der Mantel ist lang.', 'The coat is long.', 'Пальто довге.', 'المعطف طويل.'],
    ['Der Schuh drückt.', 'The shoe pinches.', 'Черевик тисне.', 'الحذاء ضيّق.'],
    ['Die Blume blüht.', 'The flower is blooming.', 'Квітка цвіте.', 'الزهرة تتفتّح.'],
    ['Der Berg ruft.', 'The mountain is calling.', 'Гори кличуть.', 'الجبل ينادي.'],
    ['Die Kerze brennt.', 'The candle is burning.', 'Свічка горить.', 'الشمعة مشتعلة.'],
    ['Das Sofa ist weich.', 'The sofa is soft.', 'Диван м’який.', 'الأريكة ناعمة.'],
    ['Das Radio spielt.', 'The radio is playing.', 'Радіо грає.', 'الراديو يعمل.'],
    ['Das Büro ist offen.', 'The office is open.', 'Офіс відчинений.', 'المكتب مفتوح.'],
    ['Die Familie wohnt hier.', 'The family lives here.', 'Сім’я живе тут.', 'العائلة تسكن هنا.'],
    ['Das Glas ist leer.', 'The glass is empty.', 'Склянка порожня.', 'الكأس فارغة.'],
    ['Das Brot riecht gut.', 'The bread smells good.', 'Хліб гарно пахне.', 'رائحة الخبز طيبة.'],
    ['Der Ballon fliegt.', 'The balloon is flying.', 'Повітряна кулька летить.', 'البالون يطير.'],
    ['Der Wecker klingelt.', 'The alarm clock is ringing.', 'Будильник дзвонить.', 'المنبّه يرنّ.'],
    // Akkusativ
    ['Ich sehe den Mann.', 'I see the man.', 'Я бачу чоловіка.', 'أرى الرجل.'],
    ['Er isst den Apfel.', 'He is eating the apple.', 'Він їсть яблуко.', 'هو يأكل التفاحة.'],
    ['Sie liest das Buch.', 'She is reading the book.', 'Вона читає книжку.', 'هي تقرأ الكتاب.'],
    ['Das Kind trinkt das Wasser.', 'The child is drinking the water.', 'Дитина п’є воду.', 'الطفل يشرب الماء.'],
    ['Ich brauche den Computer.', 'I need the computer.', 'Мені потрібен комп’ютер.', 'أحتاج إلى الحاسوب.'],
    ['Wir kaufen das Brot.', 'We are buying the bread.', 'Ми купуємо хліб.', 'نشتري الخبز.'],
    ['Er sucht den Schlüssel.', 'He is looking for the key.', 'Він шукає ключ.', 'هو يبحث عن المفتاح.'],
    ['Sie kocht die Suppe.', 'She is cooking the soup.', 'Вона варить суп.', 'هي تطبخ الحساء.'],
    ['Ich schreibe den Brief.', 'I am writing the letter.', 'Я пишу листа.', 'أكتب الرسالة.'],
    ['Er hört die Musik.', 'He is listening to the music.', 'Він слухає музику.', 'هو يستمع إلى الموسيقى.'],
    ['Wir besuchen die Stadt.', 'We are visiting the city.', 'Ми відвідуємо місто.', 'نزور المدينة.'],
    ['Sie öffnet die Tür.', 'She opens the door.', 'Вона відчиняє двері.', 'هي تفتح الباب.'],
    ['Ich male das Bild.', 'I am painting the picture.', 'Я малюю картину.', 'أرسم اللوحة.'],
    ['Er trägt den Mantel.', 'He is wearing the coat.', 'Він носить пальто.', 'هو يرتدي المعطف.'],
    ['Wir waschen das Auto.', 'We are washing the car.', 'Ми миємо машину.', 'نغسل السيارة.'],
    ['Sie macht das Foto.', 'She is taking the photo.', 'Вона робить фото.', 'هي تلتقط الصورة.'],
    ['Ich überquere die Brücke.', 'I am crossing the bridge.', 'Я переходжу міст.', 'أعبر الجسر.'],
    ['Er holt das Paket.', 'He is picking up the parcel.', 'Він забирає посилку.', 'هو يستلم الطرد.'],
    ['Wir sehen den Film.', 'We are watching the film.', 'Ми дивимося фільм.', 'نشاهد الفيلم.'],
    ['Sie repariert das Fahrrad.', 'She is repairing the bike.', 'Вона ремонтує велосипед.', 'هي تصلح الدراجة.'],
    ['Ich putze das Zimmer.', 'I am cleaning the room.', 'Я прибираю кімнату.', 'أنظّف الغرفة.'],
    ['Er findet den Fehler.', 'He finds the mistake.', 'Він знаходить помилку.', 'هو يجد الخطأ.'],
    ['Wir spielen den Ball.', 'We are playing the ball.', 'Ми граємо м’ячем.', 'نلعب بالكرة.'],
    ['Sie schneidet das Holz.', 'She is cutting the wood.', 'Вона рубає дрова.', 'هي تقطع الخشب.'],
    ['Ich rufe den Arzt.', 'I am calling the doctor.', 'Я викликаю лікаря.', 'أستدعي الطبيب.'],
    ['Er pflanzt den Baum.', 'He is planting the tree.', 'Він садить дерево.', 'هو يزرع الشجرة.'],
    ['Wir füttern die Katze.', 'We are feeding the cat.', 'Ми годуємо кішку.', 'نُطعم القطة.'],
    ['Sie fragt den Lehrer.', 'She asks the teacher.', 'Вона запитує вчителя.', 'هي تسأل المعلّم.'],
    ['Ich hänge die Wäsche auf.', 'I am hanging up the laundry.', 'Я розвішую білизну.', 'أنشر الغسيل.'],
    ['Wir packen den Koffer.', 'We are packing the suitcase.', 'Ми пакуємо валізу.', 'نحزم الحقيبة.'],
    ['Ich höre den Podcast.', 'I am listening to the podcast.', 'Я слухаю подкаст.', 'أستمع إلى البودكاست.'],
    ['Er macht das Sandwich.', 'He is making the sandwich.', 'Він робить сендвіч.', 'هو يُعدّ الشطيرة.'],
    ['Sie nutzt den Laptop.', 'She is using the laptop.', 'Вона користується ноутбуком.', 'هي تستخدم الحاسوب المحمول.'],
    ['Wir nehmen den Bus.', 'We are taking the bus.', 'Ми їдемо автобусом.', 'نركب الحافلة.'],
    ['Er verliert den Schlüssel.', 'He loses the key.', 'Він губить ключ.', 'هو يُضيّع المفتاح.'],
    ['Sie kauft den Schal.', 'She is buying the scarf.', 'Вона купує шарф.', 'هي تشتري الوشاح.'],
    ['Sie kauft die Schal.', 'She is buying the scarf.', 'Вона купує шарф.', 'هي تشتري الوشاح.'],
    ['Ich sehe das Bild.', 'I see the picture.', 'Я бачу картину.', 'أرى الصورة.'],
    ['Wir schicken die E-Mail.', 'We are sending the email.', 'Ми надсилаємо імейл.', 'نرسل البريد الإلكتروني.'],
    ['Er spielt das Spiel.', 'He is playing the game.', 'Він грає в гру.', 'هو يلعب اللعبة.'],
    ['Sie kocht den Kaffee.', 'She is making the coffee.', 'Вона варить каву.', 'هي تُحضّر القهوة.'],
    // Dativ
    ['Ich helfe dem Freund.', 'I am helping the friend.', 'Я допомагаю другові.', 'أساعد الصديق.'],
    ['Er dankt dem Vater.', 'He thanks the father.', 'Він дякує батькові.', 'هو يشكر الأب.'],
    ['Sie antwortet der Frau.', 'She answers the woman.', 'Вона відповідає жінці.', 'هي تجيب المرأة.'],
    ['Das gefällt dem Kind.', 'The child likes that.', 'Це подобається дитині.', 'هذا يعجب الطفل.'],
    ['Sie arbeitet in der Küche.', 'She works in the kitchen.', 'Вона працює на кухні.', 'هي تعمل في المطبخ.'],
    ['Der Apfel liegt auf dem Karton.', 'The apple is lying on the box.', 'Яблуко лежить на коробці.', 'التفاحة على الصندوق.'],
    ['Der Apfel ist unter dem Karton.', 'The apple is under the box.', 'Яблуко під коробкою.', 'التفاحة تحت الصندوق.'],
    ['Der Apfel steht neben dem Karton.', 'The apple is next to the box.', 'Яблуко стоїть біля коробки.', 'التفاحة بجانب الصندوق.'],
    ['Der Apfel ist zwischen den Boxen.', 'The apple is between the boxes.', 'Яблуко між коробками.', 'التفاحة بين الصناديق.'],
    ['Der Apfel liegt hinter der Box.', 'The apple is behind the box.', 'Яблуко лежить за коробкою.', 'التفاحة خلف الصندوق.'],
    ['Der Apfel steht vor der Box.', 'The apple is in front of the box.', 'Яблуко стоїть перед коробкою.', 'التفاحة أمام الصندوق.'],
    ['Wir sind in dem Haus.', 'We are in the house.', 'Ми в будинку.', 'نحن في البيت.'],
    ['Das Kind spielt im Garten.', 'The child is playing in the garden.', 'Дитина грається в саду.', 'الطفل يلعب في الحديقة.'],
    ['Die Wolke ist über dem Mann.', 'The cloud is above the man.', 'Хмара над чоловіком.', 'الغيمة فوق الرجل.'],
    ['Er schläft in dem Bett.', 'He is sleeping in the bed.', 'Він спить у ліжку.', 'هو ينام في السرير.'],
    ['Wir gehen auf der Brücke.', 'We are walking on the bridge.', 'Ми йдемо по мосту.', 'نمشي على الجسر.'],
    ['Sie schwimmt in dem Meer.', 'She is swimming in the sea.', 'Вона плаває в морі.', 'هي تسبح في البحر.'],
    ['Der Zug hält an dem Bahnhof.', 'The train stops at the station.', 'Потяг зупиняється на вокзалі.', 'القطار يتوقف في المحطة.'],
    ['Der Apfel liegt in dem Korb.', 'The apple is in the basket.', 'Яблуко лежить у кошику.', 'التفاحة في السلة.'],
    ['Er sitzt auf dem Stuhl.', 'He is sitting on the chair.', 'Він сидить на стільці.', 'هو يجلس على الكرسي.'],
    ['Das Geld ist in der Tasche.', 'The money is in the bag.', 'Гроші в сумці.', 'المال في الحقيبة.'],
    ['Er gehört zu dem Arzt.', 'He is with the doctor.', 'Він із лікарем.', 'هو تابع للطبيب.'],
    ['Wir wohnen bei der Tante.', 'We are staying at our aunt\'s.', 'Ми живемо в тітки.', 'نسكن عند الخالة.'],
    ['Milch ist in dem Müsli.', 'There is milk in the muesli.', 'У мюслі є молоко.', 'يوجد حليب في الموسلي.'],
    ['Der Schlüssel steckt in dem Schloss.', 'The key is in the lock.', 'Ключ у замку.', 'المفتاح في القفل.'],
    ['Der Vogel ist in dem Käfig.', 'The bird is in the cage.', 'Птах у клітці.', 'الطائر في القفص.'],
    ['Die Knöpfe sind an dem Mantel.', 'The buttons are on the coat.', 'Ґудзики на пальті.', 'الأزرار على المعطف.'],
    ['Ich höre dem Sänger zu.', 'I am listening to the singer.', 'Я слухаю співака.', 'أستمع إلى المغنّي.'],
    ['Das Auto weicht dem Rad aus.', 'The car swerves around the bike.', 'Машина об’їжджає велосипед.', 'السيارة تتفادى الدراجة.'],
    ['Das Salz fehlt in der Suppe.', 'The soup needs salt.', 'У супі бракує солі.', 'الحساء ينقصه الملح.'],
    // Genitiv
    ['Das Auto des Mannes.', 'The man\'s car.', 'Машина чоловіка.', 'سيارة الرجل.'],
    ['Das Haus der Frau.', 'The woman\'s house.', 'Будинок жінки.', 'بيت المرأة.'],
    ['Das Spielzeug des Kindes.', 'The child\'s toy.', 'Іграшка дитини.', 'لعبة الطفل.'],
    ['Der Hund der Nachbarin.', 'The neighbour\'s dog.', 'Собака сусідки.', 'كلب الجارة.'],
    ['Der Schlüssel des Hauses.', 'The key to the house.', 'Ключ від будинку.', 'مفتاح البيت.'],
    ['Die Seiten des Buches.', 'The pages of the book.', 'Сторінки книжки.', 'صفحات الكتاب.'],
    ['Der Schwanz der Katze.', 'The cat\'s tail.', 'Хвіст кішки.', 'ذيل القطة.'],
    ['Der Preis des Computers.', 'The price of the computer.', 'Ціна комп’ютера.', 'سعر الحاسوب.'],
    ['Die Blätter des Baumes.', 'The leaves of the tree.', 'Листя дерева.', 'أوراق الشجرة.'],
    ['Die Farbe des Hemdes.', 'The colour of the shirt.', 'Колір сорочки.', 'لون القميص.'],
    ['Die Reifen des Fahrrades.', 'The tyres of the bike.', 'Шини велосипеда.', 'إطارات الدراجة.'],
    ['Die Straßen der Stadt.', 'The streets of the city.', 'Вулиці міста.', 'شوارع المدينة.'],
    ['Der Name der Schule.', 'The name of the school.', 'Назва школи.', 'اسم المدرسة.'],
    ['Der Griff der Tasche.', 'The handle of the bag.', 'Ручка сумки.', 'مقبض الحقيبة.'],
    ['Der Duft der Suppe.', 'The smell of the soup.', 'Аромат супу.', 'رائحة الحساء.'],
    ['Die Knöpfe des Mantels.', 'The buttons of the coat.', 'Ґудзики пальта.', 'أزرار المعطف.'],
    ['Das Ziel des Spiels.', 'The goal of the game.', 'Мета гри.', 'هدف اللعبة.'],
    ['Der Schirm des Handys.', 'The phone\'s screen.', 'Екран телефона.', 'شاشة الهاتف.'],
    ['Die Fenster des Hauses.', 'The windows of the house.', 'Вікна будинку.', 'نوافذ البيت.'],
    ['Die Qualität der Kleidung.', 'The quality of the clothes.', 'Якість одягу.', 'جودة الملابس.'],
    ['Die Hauptstadt des Landes.', 'The capital of the country.', 'Столиця країни.', 'عاصمة البلد.'],
    ['Der Rahmen des Bildes.', 'The frame of the picture.', 'Рамка картини.', 'إطار الصورة.'],
    ['Das Ende des Tages.', 'The end of the day.', 'Кінець дня.', 'نهاية اليوم.'],
    ['Die Ruhe der Nacht.', 'The quiet of the night.', 'Тиша ночі.', 'هدوء الليل.'],
    ['Der Geschmack der Milch.', 'The taste of the milk.', 'Смак молока.', 'طعم الحليب.'],
    ['Die Stimme des Löwen.', 'The lion\'s voice.', 'Голос лева.', 'صوت الأسد.'],
    ['Die Flügel des Vogels.', 'The bird\'s wings.', 'Крила птаха.', 'جناحا الطائر.'],
    ['Die Tinte des Stiftes.', 'The pen\'s ink.', 'Чорнило ручки.', 'حبر القلم.'],
    ['Die Größe der Handschuhe.', 'The size of the gloves.', 'Розмір рукавичок.', 'مقاس القفازات.'],
    ['Die Kerzen des Kuchens.', 'The candles on the cake.', 'Свічки на торті.', 'شموع الكعكة.']
  ],

  _maps: {},

  maps(lang) {
    if (this._maps[lang]) return this._maps[lang];
    const col = this.COLS[lang];
    const text = {};
    const glosses = {};
    this.TEXT.forEach((row) => { if (row[col]) text[row[0]] = row[col]; });
    if (lang !== 'de') this.GLOSSES.forEach((row) => { glosses[row[0]] = row[col - 1]; });
    return (this._maps[lang] = { text, glosses });
  },

  // Nesnenin orijinal (Türkçe) alanlarını bir kez saklar, sonra dile göre yazar.
  // Böylece dil değişince ya da TR'ye dönülünce kaynak metin kaybolmaz.
  keepSource(obj, fields) {
    if (!obj.__src) {
      const src = {};
      fields.forEach((f) => { src[f] = obj[f]; });
      Object.defineProperty(obj, '__src', { value: src });
    }
    return obj.__src;
  },

  apply(db, lang) {
    if (!db) return;
    const m = this.COLS[lang] ? this.maps(lang) : null;
    const each = (list, fields) => (list || []).forEach((o) => {
      if (!o || typeof o !== 'object') return;
      const src = this.keepSource(o, fields);
      fields.forEach((f) => { o[f] = (m && typeof src[f] === 'string' && m.text[src[f]]) || src[f]; });
    });

    ['der', 'die', 'das'].forEach((a) => {
      each(db.suffixRules?.[a], ['desc', 'example']);
      each(db.categoryRules?.[a], ['category']);
    });
    each(db.exceptions, ['category']);
    each(db.achievements, ['title', 'desc']);
    each(db.tips, ['title', 'text']);
    each(db.levels, ['titleTr']);
    each(db.casesExercises, ['explanation', 'tr']);
    if (db.compoundRule) each([db.compoundRule], ['title', 'description']);

    // Anlamlar: TR'de orijinal, DE'de gizli, diğer dillerde çeviri (yoksa gizli)
    const col = this.COLS[lang];
    (db.casesExercises || []).forEach((o) => {
      const src = this.keepSource(o, ['explanation', 'tr']);
      if (!m) o.tr = src.tr;
      else if (lang === 'de') o.tr = '';
      else o.tr = this.WORD_MEANINGS[o.word]?.[col - 2]
        || db.words?.find((w) => w.word === o.word)?.en || '';
    });
    Object.values(db.caseExamples || {}).forEach((list) => (list || []).forEach((o) => {
      const src = this.keepSource(o, ['tr']);
      o.tr = !m ? src.tr : (m.glosses[o.text] || '');
    }));
  },

  // Kelime kategorisi anahtarı (people, food…) → görünen ad
  wordCategory(key, lang) {
    const row = this.WORD_CATEGORIES[key];
    if (!row) return key;
    return lang === 'tr' ? row[0] : row[this.COLS[lang]] || key;
  }
};

if (typeof window !== 'undefined') window.ContentI18n = ContentI18n;
