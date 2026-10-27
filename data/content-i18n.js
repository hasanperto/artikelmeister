// ============================================
// ArtikelMeister — İçerik çevirileri (DB metinleri)
// Kurallar, istisnalar, başarımlar, ipuçları ve alıştırma açıklamaları
// veritabanında Türkçe tutulur; burada kaynak metne göre çevrilir.
// Çevirisi olmayan metin (ör. admin panelinden yeni eklenen) olduğu gibi kalır.
// ============================================

const ContentI18n = {
  translations: {
    de: {
      // Seviye başlıkları zaten Almanca — parantez içinde tekrar gösterme
      nativeLevelTitles: true,
      // Almanca cümlelerin altındaki Türkçe anlamı gizle
      hideGloss: true,

      wordCategories: {
        people: 'Menschen', family: 'Familie', profession: 'Berufe', animals: 'Tiere',
        furniture: 'Möbel', school: 'Schule', technology: 'Technik', food: 'Essen',
        nature: 'Natur', transport: 'Verkehr', days: 'Wochentage', months: 'Monate',
        seasons: 'Jahreszeiten', weather: 'Wetter', directions: 'Himmelsrichtungen',
        money: 'Geld', drinks: 'Getränke', clothing: 'Kleidung', objects: 'Gegenstände',
        places: 'Orte', rooms: 'Räume', abstract: 'Abstrakte Begriffe', hobbies: 'Hobbys',
        time: 'Zeit', materials: 'Materialien', events: 'Ereignisse', body: 'Körper',
        health: 'Gesundheit', science: 'Wissenschaft'
      },

      text: {
        // ── Endungsregeln ──
        'Alet/Özne (Çok yaygın)': 'Geräte/Handelnde (sehr häufig)',
        'İzmler/Düşünce': 'Ismen/Denkrichtungen',
        'Teknik aletler': 'Technische Geräte',
        'Meslekler': 'Berufe',
        'Müzisyen': 'Musiker',
        'Kıta/Nesne': 'Kontinente/Gegenstände',
        'Çırak/Kişi': 'Lehrlinge/Personen',
        'Emekli/Kişi': 'Rentner/Personen',
        'Uzmanlar': 'Fachleute',
        'Nesneler': 'Gegenstände',
        'Milyoner': 'Millionäre/Personen',
        'Soyut isimler': 'Abstrakte Nomen',
        'Peygamber/Kişi': 'Propheten/Personen',
        'Latince kökenli': 'Lateinischen Ursprungs',
        'der Virus (istisnalar var)': 'der Virus (mit Ausnahmen)',
        'Eylemden türeyenler': 'Von Verben abgeleitet',
        'Yetenekler': 'Eigenschaften/Fähigkeiten',
        'Topluluk/Durum': 'Gemeinschaft/Zustand',
        'Kadın meslekleri': 'Weibliche Berufe',
        '%90 dişi kuralı': 'Zu ca. 90 % feminin',
        'Uluslararası kelimeler': 'Internationale Wörter',
        'Özellik/Durum': 'Eigenschaft/Zustand',
        'Kavramlar': 'Begriffe',
        'Bilim dalları': 'Wissenschaften',
        'Yapı/Kavram': 'Struktur/Begriff',
        'Yerler/Eylemler': 'Orte/Tätigkeiten',
        'Fransızca kökenli': 'Französischen Ursprungs',
        'Kurumlar': 'Einrichtungen',
        'Tıbbi/Teknik': 'Medizinisch/Fachsprachlich',
        'Aletler': 'Geräte/Maschinen',
        'Küçültme (Kesin)': 'Verkleinerung (immer)',
        'Resmi/Teknik': 'Formell/Fachsprachlich',
        'Yerler/Kavramlar': 'Orte/Begriffe',
        'Grekçe kökenli': 'Griechischen Ursprungs',
        'Yabancı kökenli': 'Fremdwörter',
        'Eylemden türeyen': 'Von Verben abgeleitet',
        'Kesirler/Birimler': 'Bruchteile/Einheiten',

        // ── Kategorieregeln ──
        'Erkek canlılar': 'Männliche Lebewesen',
        'Günler': 'Wochentage',
        'Aylar': 'Monate',
        'Mevsimler': 'Jahreszeiten',
        'Hava olayları': 'Wetterphänomene',
        'Yönler': 'Himmelsrichtungen',
        'Alkollü içecekler': 'Alkoholische Getränke',
        'Araba markaları': 'Automarken',
        'Para birimleri': 'Währungen',
        'Dişi canlılar': 'Weibliche Lebewesen',
        'Bitkiler & Meyveler': 'Pflanzen & Früchte',
        'Uçak & Gemiler': 'Flugzeuge & Schiffe',
        'Sayılar': 'Zahlen',
        'Alman Nehirleri': 'Deutsche Flüsse',
        'Yavru canlılar': 'Junge Lebewesen',
        'Fiilden türeyen isimler': 'Substantivierte Verben',
        'Renkler': 'Farben',
        'Metaller': 'Metalle',
        'Diller': 'Sprachen',
        'Kimyasal elementler': 'Chemische Elemente',
        'Birimler': 'Maßeinheiten',

        // ── Ausnahmen ──
        'Alkollü içecekler genelde der, ama...': 'Alkoholische Getränke sind meist der, aber...',
        'Meyveler genelde die, ama...': 'Früchte sind meist die, aber...',
        '-e ile bitenler genelde die, ama...': 'Wörter auf -e sind meist die, aber...',
        'Dişi canlı ama -chen eki nedeniyle...': 'Weiblich, aber wegen der Endung -chen...',
        '-tum ile bitenler genelde das, ama...': 'Wörter auf -tum sind meist das, aber...',
        'Alman nehirleri genelde die, ama...': 'Deutsche Flüsse sind meist die, aber...',
        'Metaller genelde das, ama...': 'Metalle sind meist das, aber...',

        // ── Erfolge ──
        'İlk Adım': 'Erster Schritt',
        'İlk quizi tamamla': 'Schließe dein erstes Quiz ab',
        '3 Gün Seri': '3-Tage-Serie',
        '3 gün üst üste çalış': 'Lerne 3 Tage in Folge',
        'Haftalık Savaşçı': 'Wochenkämpfer',
        '7 gün üst üste çalış': 'Lerne 7 Tage in Folge',
        'Ay Ustası': 'Monatsmeister',
        '30 gün üst üste çalış': 'Lerne 30 Tage in Folge',
        'Mükemmeliyetçi': 'Perfektionist',
        'Bir quizde 10/10 yap': 'Erreiche 10/10 in einem Quiz',
        'Hız Şeytanı': 'Temposünder',
        'Hız turunda 20+ doğru yap': 'Schaffe 20+ richtige Antworten in der Geschwindigkeitsrunde',
        'DER Ustası': 'DER-Meister',
        '50 DER kelimesini öğren': 'Lerne 50 DER-Wörter',
        'DIE Ustası': 'DIE-Meister',
        '50 DIE kelimesini öğren': 'Lerne 50 DIE-Wörter',
        'DAS Ustası': 'DAS-Meister',
        '50 DAS kelimesini öğren': 'Lerne 50 DAS-Wörter',
        'İstisna Avcısı': 'Ausnahmenjäger',
        'Tüm istisnaları doğru bil': 'Beantworte alle Ausnahmen richtig',
        'Kural Bilgini': 'Regelkenner',
        'Tüm kural kartlarını oku': 'Lies alle Regelkarten',
        'Kelime Koleksiyoncusu': 'Wortsammler',
        '100 kelime öğren': 'Lerne 100 Wörter',
        'Seviye 10': 'Level 10',
        "Seviye 10'a ulaş": 'Erreiche Level 10',
        'İsmin Halleri Ustası': 'Kasus-Meister',
        'Değişim Macerasında %80+ yap': 'Erreiche 80 %+ im Deklinations-Abenteuer',

        // ── Lernkarten-Tipps ──
        'Çoğul Kural': 'Pluralregel',
        "Tüm kelimelerin çoğul artikeli DIE'dir. (die Männer, die Frauen, die Kinder)": 'Im Plural ist der Artikel immer DIE. (die Männer, die Frauen, die Kinder)',
        'Bileşik Kelime': 'Komposita',
        'Bileşik kelimelerde artikel SON kelimeye göre belirlenir. der Tisch + die Decke = die Tischdecke': 'Bei zusammengesetzten Wörtern bestimmt das LETZTE Wort den Artikel. der Tisch + die Decke = die Tischdecke',
        'Küçültme Eki': 'Verkleinerungsendung',
        '-chen ve -lein ile biten tüm kelimeler DAS alır. das Mädchen, das Brötchen': 'Alle Wörter auf -chen und -lein haben DAS. das Mädchen, das Brötchen',
        '-e Kuralı': '-e-Regel',
        "-e ile biten kelimelerin yaklaşık %90'ı DIE alır. die Lampe, die Schule, die Straße": 'Etwa 90 % der Wörter auf -e haben DIE. die Lampe, die Schule, die Straße',
        'Fiil → İsim': 'Verb → Nomen',
        'Fiilden türeyen isimler (mastar hali) DAS alır. das Essen, das Trinken, das Lesen': 'Substantivierte Verben (Infinitive) haben DAS. das Essen, das Trinken, das Lesen',
        'Altın Kural': 'Goldene Regel',
        'Kelimeleri artikelleriyle birlikte öğrenin! "Tisch" değil, "der Tisch" olarak ezberleyin.': 'Lerne Wörter immer mit Artikel! Merke dir nicht „Tisch", sondern „der Tisch".',
        'Bileşik Kelime Kuralı': 'Komposita-Regel',
        'Bileşik kelimelerde artikel, SON kelimeye göre belirlenir.': 'Bei Komposita bestimmt das LETZTE Wort den Artikel.',

        // ── Kasus-Übungen ──
        "'Hund' erkek (der) cinsidir. 'sehen' (görmek) fiili Akkusativ (-i hali) gerektirir. 'der' Akkusativ'de 'den' olur.":
          "'Hund' ist maskulin (der). Das Verb 'sehen' verlangt den Akkusativ. 'der' wird im Akkusativ zu 'den'.",
        "'Freund' erkek (der) cinsidir. 'helfen' (yardım etmek) fiili Dativ (-e hali) gerektirir. 'der' Dativ'de 'dem' olur.":
          "'Freund' ist maskulin (der). Das Verb 'helfen' verlangt den Dativ. 'der' wird im Dativ zu 'dem'.",
        "'Bäckerei' kelimesi '-ei' eki ile bittiği için dişidir (die). 'zu' edatı her zaman Dativ gerektirir. 'die' Dativ'de 'der' olur.":
          "'Bäckerei' endet auf '-ei' und ist daher feminin (die). Die Präposition 'zu' verlangt immer den Dativ. 'die' wird im Dativ zu 'der'.",
        "'Mädchen' kelimesi '-chen' küçültme eki aldığı için nötrdür (das). 'Kızın arabası' anlamında iyelik (Genitiv) durumu vardır. 'das' Genitiv'de 'des' olur.":
          "'Mädchen' hat die Verkleinerungsendung '-chen' und ist daher neutral (das). 'Das Auto des Mädchens' drückt Besitz aus (Genitiv). 'das' wird im Genitiv zu 'des'.",
        "'Wald' erkek (der) cinsidir. 'durch' (içinden/vasıtasıyla) edatı her zaman Akkusativ gerektirir. 'der' Akkusativ'de 'den' olur.":
          "'Wald' ist maskulin (der). Die Präposition 'durch' verlangt immer den Akkusativ. 'der' wird im Akkusativ zu 'den'.",
        "'Tisch' erkek (der) cinsidir. 'auf' edatı burada bulunma (nerede?) bildirdiği için Dativ gerektirir. 'der' Dativ'de 'dem' olur.":
          "'Tisch' ist maskulin (der). 'auf' beschreibt hier einen Ort (Wo?) und verlangt daher den Dativ. 'der' wird im Dativ zu 'dem'.",
        "'-er' ile biten meslek/alet isimleri genelde 'der' olur. 'brauchen' (ihtiyacı olmak) fiili Akkusativ gerektirir. 'der' -> 'den' olur.":
          "Berufs- und Gerätenamen auf '-er' sind meist 'der'. Das Verb 'brauchen' verlangt den Akkusativ. 'der' -> 'den'.",
        "'-in' eki kadın mesleklerini belirtir ve 'die' alır. 'mit' edatı her zaman Dativ gerektirir. 'die' -> 'der' olur.":
          "Die Endung '-in' bezeichnet weibliche Berufe und hat 'die'. Die Präposition 'mit' verlangt immer den Dativ. 'die' -> 'der'."
      }
    }
  },

  // Nesnenin orijinal (Türkçe) alanlarını bir kez saklar, sonra dile göre yazar.
  // Böylece dil değişince ya da TR'ye dönülünce kaynak metin kaybolmaz.
  localize(obj, fields, pack) {
    if (!obj || typeof obj !== 'object') return;
    if (!obj.__src) {
      const src = {};
      fields.forEach((f) => { src[f] = obj[f]; });
      Object.defineProperty(obj, '__src', { value: src });
    }
    fields.forEach((f) => {
      const orig = obj.__src[f];
      obj[f] = (pack && typeof orig === 'string' && pack.text[orig]) || orig;
    });
  },

  apply(db, lang) {
    if (!db) return;
    const pack = this.translations[lang] || null;
    const each = (list, fields) => (list || []).forEach((o) => this.localize(o, fields, pack));

    ['der', 'die', 'das'].forEach((a) => {
      each(db.suffixRules?.[a], ['desc', 'example']);
      each(db.categoryRules?.[a], ['category']);
    });
    each(db.exceptions, ['category']);
    each(db.achievements, ['title', 'desc']);
    each(db.tips, ['title', 'text']);
    each(db.casesExercises, ['explanation', 'tr']);
    this.localize(db.compoundRule, ['title', 'description'], pack);
    Object.values(db.caseExamples || {}).forEach((list) => each(list, ['tr']));

    if (pack?.hideGloss) {
      (db.casesExercises || []).forEach((o) => { o.tr = ''; });
      Object.values(db.caseExamples || {}).forEach((list) => (list || []).forEach((o) => { o.tr = ''; }));
    }

    (db.levels || []).forEach((lv) => {
      if (!lv.__src) Object.defineProperty(lv, '__src', { value: { titleTr: lv.titleTr } });
      lv.titleTr = pack?.nativeLevelTitles ? lv.title : lv.__src.titleTr;
    });
  },

  // Kelime kategorisi anahtarı (people, food…) → görünen ad
  wordCategory(key, lang) {
    return this.translations[lang]?.wordCategories?.[key] || key;
  }
};

if (typeof window !== 'undefined') window.ContentI18n = ContentI18n;
