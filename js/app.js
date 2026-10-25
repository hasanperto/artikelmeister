// ============================================
// ArtikelMeister v2 — Enhanced App
// Profil, combo, ipuçları, çoklu dil (i18n)
// ============================================

// İçerik (API / AI kaynaklı) HTML'e basılmadan önce kaçırılır
function esc(val) {
    return String(val ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}
// onclick="..." içinde güvenli JS string argümanı
function jsArg(val) {
    return esc(JSON.stringify(String(val ?? '')));
}

const AVATARS = ['🧑‍🎓', '👨‍💻', '👩‍🏫', '🦊', '🐻', '🦉', '🐱', '🐶', '🦁', '🐨', '🎮', '🎯', '⭐', '🚀', '🌟', '👑', '💎', '🔥', '🌈', '🎪'];
const MOTIVATIONS = {
    tr: ['Bugün harika bir gün Almanca öğrenmek için! 🌟', 'Her doğru cevap seni bir adım ileriye taşır! 🚀', 'Artikel ustası olma yolunda ilerliyorsun! 💪', 'Pratik mükemmelleştirir! 🎯', 'Kombo serisi kır, bonus XP kazan! 🔥', 'Küçük adımlar, büyük sonuçlar! ⭐', 'Almanca artikeller artık kolay! 🇩🇪'],
    en: ['Today is a great day to learn German! 🌟', 'Every correct answer takes you one step further! 🚀', 'You\'re on your way to becoming an Article master! 💪', 'Practice makes perfect! 🎯', 'Break combo streaks, earn bonus XP! 🔥', 'Small steps, big results! ⭐', 'German articles made easy! 🇩🇪'],
    de: ['Heute ist ein großartiger Tag zum Lernen! 🌟', 'Jede richtige Antwort bringt dich weiter! 🚀', 'Du bist auf dem Weg zum Artikel-Meister! 💪', 'Übung macht den Meister! 🎯', 'Baue Combos, verdiene Bonus-XP! 🔥', 'Kleine Schritte, große Ergebnisse! ⭐', 'Deutsche Artikel leicht gemacht! 🇩🇪'],
    uk: ['Сьогодні чудовий день для вивчення німецької! 🌟', 'Кожна правильна відповідь — крок вперед! 🚀', 'Ти на шляху до майстра артиклів! 💪', 'Практика робить досконалим! 🎯', 'Збирай комбо, заробляй бонусний XP! 🔥', 'Маленькі кроки — великі результати! ⭐', 'Німецькі артиклі — це легко! 🇩🇪'],
    ar: ['اليوم يوم رائع لتعلم الألمانية! 🌟', 'كل إجابة صحيحة تقربك خطوة! 🚀', 'أنت في طريقك لإتقان الأدوات! 💪', 'التمرين يصنع الكمال! 🎯', 'اجمع الكومبو واكسب XP إضافي! 🔥', 'خطوات صغيرة، نتائج كبيرة! ⭐', 'الأدوات الألمانية أصبحت سهلة! 🇩🇪']
};

const DAILY_TIPS = {
    tr: [
        { icon: '💡', text: '-chen ve -lein ile biten TÜM kelimeler "das" alır! Örn: das Mädchen, das Brötchen' },
        { icon: '🔑', text: '-ung ile biten kelimeler neredeyse her zaman "die" alır. Örn: die Übung, die Zeitung' },
        { icon: '📅', text: 'Günler, aylar ve mevsimler hep "der" alır! der Montag, der Januar, der Sommer' },
        { icon: '🧩', text: 'Bileşik kelimelerde artikel SON kelimeye göre belirlenir.' },
        { icon: '🎨', text: 'Renkler isim olarak kullanıldığında "das" alır. das Blau, das Rot' },
        { icon: '🍎', text: 'Meyvelerin çoğu "die" iken, elma istisnadır: der Apfel!' },
        { icon: '🏊', text: 'Fiilden türeyen isimler "das" alır: das Essen, das Schwimmen' },
        { icon: '🍺', text: 'Alkollü içecekler genelde "der" alır, AMA bira istisna: das Bier!' },
        { icon: '📖', text: '-heit ve -keit ile biten kelimeler her zaman "die" alır' },
        { icon: '⚗️', text: 'Kimyasal elementler ve metaller genelde "das" alır: das Gold' },
        { icon: '🔢', text: 'Sayılar isim olarak "die" alır: die Eins, die Zwei' },
        { icon: '🧭', text: 'Yön isimleri her zaman "der" alır: der Norden, der Süden' },
        { icon: '💰', text: 'Para birimleri genelde "der" alır: der Euro, der Dollar' },
        { icon: '✈️', text: 'Uçak ve gemi isimleri "die" alır: die Boeing, die Titanic' },
        { icon: '👶', text: 'Yavru canlılar "das" alır: das Kind, das Baby, das Lamm' }
    ],
    en: [
        { icon: '💡', text: 'ALL words ending in -chen and -lein take "das"! E.g.: das Mädchen, das Brötchen' },
        { icon: '🔑', text: 'Words ending in -ung almost always take "die". E.g.: die Übung, die Zeitung' },
        { icon: '📅', text: 'Days, months and seasons always take "der"! der Montag, der Januar' },
        { icon: '🧩', text: 'In compound words, the article is determined by the LAST word.' },
        { icon: '🎨', text: 'Colors as nouns take "das". das Blau, das Rot' },
        { icon: '🍎', text: 'Most fruits take "die", but apple is an exception: der Apfel!' },
        { icon: '🏊', text: 'Nouns derived from verbs (infinitives) take "das": das Essen' },
        { icon: '🍺', text: 'Alcoholic drinks usually take "der", BUT beer is an exception: das Bier!' },
        { icon: '📖', text: 'Words ending in -heit and -keit always take "die"' },
        { icon: '⚗️', text: 'Chemical elements and metals usually take "das": das Gold' },
        { icon: '🔢', text: 'Numbers as nouns take "die": die Eins, die Zwei' },
        { icon: '🧭', text: 'Compass directions always take "der": der Norden, der Süden' },
        { icon: '💰', text: 'Currencies usually take "der": der Euro, der Dollar' },
        { icon: '✈️', text: 'Aircraft and ship names take "die": die Boeing, die Titanic' },
        { icon: '👶', text: 'Young creatures take "das": das Kind, das Baby, das Lamm' }
    ],
    de: [
        { icon: '💡', text: 'ALLE Wörter auf -chen und -lein sind "das"! z.B.: das Mädchen, das Brötchen' },
        { icon: '🔑', text: 'Wörter auf -ung sind fast immer "die". z.B.: die Übung, die Zeitung' },
        { icon: '📅', text: 'Tage, Monate und Jahreszeiten sind immer "der"! der Montag, der Januar' },
        { icon: '🧩', text: 'Bei zusammengesetzten Wörtern bestimmt das LETZTE Wort den Artikel.' },
        { icon: '🎨', text: 'Farben als Nomen sind "das". das Blau, das Rot' },
        { icon: '🍎', text: 'Die meisten Früchte sind "die", aber Apfel ist eine Ausnahme: der Apfel!' },
        { icon: '🏊', text: 'Substantivierte Verben (Infinitive) sind "das": das Essen' },
        { icon: '🍺', text: 'Alkoholische Getränke sind meist "der", ABER Bier: das Bier!' },
        { icon: '📖', text: 'Wörter auf -heit und -keit sind immer "die"' },
        { icon: '⚗️', text: 'Chemische Elemente und Metalle sind meist "das": das Gold' },
        { icon: '🔢', text: 'Zahlen als Nomen sind "die": die Eins, die Zwei' },
        { icon: '🧭', text: 'Himmelsrichtungen sind immer "der": der Norden, der Süden' },
        { icon: '💰', text: 'Währungen sind meist "der": der Euro, der Dollar' },
        { icon: '✈️', text: 'Flugzeug- und Schiffsnamen sind "die": die Boeing, die Titanic' },
        { icon: '👶', text: 'Junge Lebewesen sind "das": das Kind, das Baby, das Lamm' }
    ],
    uk: [
        { icon: '💡', text: 'УСІ слова на -chen та -lein мають "das"! Напр.: das Mädchen, das Brötchen' },
        { icon: '🔑', text: 'Слова на -ung майже завжди мають "die". Напр.: die Übung, die Zeitung' },
        { icon: '📅', text: 'Дні, місяці та пори року завжди "der"! der Montag, der Januar' },
        { icon: '🧩', text: 'У складних словах артикль визначається ОСТАННІМ словом.' },
        { icon: '🎨', text: 'Кольори як іменники мають "das". das Blau, das Rot' },
        { icon: '🍎', text: 'Більшість фруктів "die", але яблуко — виняток: der Apfel!' },
        { icon: '🏊', text: 'Іменники від дієслів (інфінітиви) мають "das": das Essen' },
        { icon: '🍺', text: 'Алкогольні напої зазвичай "der", АЛЕ пиво — виняток: das Bier!' },
        { icon: '📖', text: 'Слова на -heit та -keit завжди "die"' },
        { icon: '⚗️', text: 'Хімічні елементи та метали зазвичай "das": das Gold' },
        { icon: '🔢', text: 'Числа як іменники "die": die Eins, die Zwei' },
        { icon: '🧭', text: 'Сторони світу завжди "der": der Norden, der Süden' },
        { icon: '💰', text: 'Валюти зазвичай "der": der Euro, der Dollar' },
        { icon: '✈️', text: 'Назви літаків і кораблів "die": die Boeing, die Titanic' },
        { icon: '👶', text: 'Малі створіння "das": das Kind, das Baby, das Lamm' }
    ],
    ar: [
        { icon: '💡', text: '"das" جميع الكلمات المنتهية بـ -chen و -lein تأخذ. مثال: das Mädchen' },
        { icon: '🔑', text: '"die" الكلمات المنتهية بـ -ung تأخذ دائمًا تقريبًا. مثال: die Übung' },
        { icon: '📅', text: '"der" الأيام والأشهر والفصول تأخذ دائمًا! der Montag, der Januar' },
        { icon: '🧩', text: 'في الكلمات المركبة، تُحدد الأداة بالكلمة الأخيرة' },
        { icon: '🎨', text: '"das" الألوان كأسماء تأخذ. das Blau, das Rot' },
        { icon: '🍎', text: '"die" معظم الفواكه تأخذ، لكن التفاحة استثناء: der Apfel!' },
        { icon: '🏊', text: '"das" الأسماء المشتقة من الأفعال تأخذ: das Essen' },
        { icon: '🍺', text: '"der" المشروبات الكحولية عادة تأخذ، لكن البيرة استثناء: das Bier!' },
        { icon: '📖', text: '"die" الكلمات المنتهية بـ -heit و -keit تأخذ دائمًا' },
        { icon: '⚗️', text: '"das" العناصر الكيميائية والمعادن عادة تأخذ: das Gold' },
        { icon: '🔢', text: '"die" الأرقام كأسماء تأخذ: die Eins, die Zwei' },
        { icon: '🧭', text: '"der" الاتجاهات تأخذ دائمًا: der Norden, der Süden' },
        { icon: '💰', text: '"der" العملات عادة تأخذ: der Euro, der Dollar' },
        { icon: '✈️', text: '"die" أسماء الطائرات والسفن تأخذ: die Boeing, die Titanic' },
        { icon: '👶', text: '"das" صغار الكائنات تأخذ: das Kind, das Baby' }
    ]
};

const App = {
    currentSection: 'home',
    currentProfile: null,
    progress: null,

    // ── INIT ──
    init() {
        // Load saved language first
        i18n.loadSaved();
        i18n.applyTranslations();
        this.lang.updateFlag();
        this.lang.renderLoginBar();
        this.lang.renderModal();

        const cfg = window.ARTIKEL_CONFIG || {};
        if (cfg.version) {
            const content = window.CONTENT_META?.version ? ` · DB v${window.CONTENT_META.version}` : '';
            document.getElementById('app-version').textContent = `ArtikelMeister v${cfg.version} (${cfg.versionCode})${content}`;
        }

        this.textSize.init();
        const autoSpeak = document.getElementById('auto-speak-toggle');
        if (autoSpeak && window.Speech) {
            autoSpeak.checked = Speech.autoEnabled();
            autoSpeak.addEventListener('change', () => Speech.setAuto(autoSpeak.checked));
        }

        this.profiles.loadAll();
        const lastId = localStorage.getItem('artikelmeister_lastProfile');
        const profiles = this.profiles.getAll();

        if (lastId && profiles[lastId]) {
            this.profiles.select(lastId, true);
        } else {
            this.profiles.showLogin();
        }
    },

    // ══════════════════════════
    // AKILLI TEKRAR ARAYÜZÜ (js/srs.js)
    // ══════════════════════════
    srsUI: {
        render() {
            if (!App.progress || !window.SRS || !window.DB?.words) return;
            const sum = SRS.summary(App.progress, DB.words);
            const badge = document.getElementById('quiz-due-badge');
            if (badge) {
                badge.textContent = i18n.t('srs_due_badge', { n: sum.due });
                badge.classList.toggle('hidden', sum.due === 0);
            }
            const summary = document.getElementById('srs-summary');
            if (!summary) return;
            summary.textContent = i18n.t('srs_stats', { mastered: sum.mastered, due: sum.due });
            const weak = SRS.weakWords(App.progress, DB.words, 8);
            const list = document.getElementById('weak-list');
            list.innerHTML = weak.length
                ? weak.map(w => {
                    const s = SRS.statsFor(App.progress, w.id);
                    return `<button type="button" class="weak-chip ${esc(w.article)}" onclick="Speech.speak(${jsArg(w.article + ' ' + w.word)})">${esc(w.article)} ${esc(w.word)} <span class="weak-count">✗${esc(s.wrong)}</span></button>`;
                }).join('')
                : `<div class="settings-desc">${esc(i18n.t('weak_empty'))}</div>`;
            document.getElementById('weak-practice-btn').classList.toggle('hidden', weak.length === 0);
        }
    },

    // ══════════════════════════
    // TEXT SIZE (js/display-scale.js)
    // ══════════════════════════
    textSize: {
        init() {
            const box = document.getElementById('text-size-options');
            if (!box || !window.DisplayScale) return;
            box.addEventListener('click', (e) => {
                const btn = e.target.closest('.text-size-btn');
                if (!btn) return;
                DisplayScale.set(btn.dataset.size);
            });
            window.addEventListener('textsizechange', () => this.render());
            this.render();
        },
        render() {
            const level = window.DisplayScale?.getLevel();
            document.querySelectorAll('.text-size-btn').forEach((b) => {
                const on = b.dataset.size === level;
                b.classList.toggle('active', on);
                b.setAttribute('aria-checked', on ? 'true' : 'false');
            });
        }
    },

    // ══════════════════════════
    // LANGUAGE MODULE
    // ══════════════════════════
    lang: {
        renderLoginBar() {
            const bar = document.getElementById('login-lang-bar');
            bar.innerHTML = i18n.languages.map(l =>
                `<div class="lang-flag-btn${l.code === i18n.currentLang ? ' active' : ''}" onclick="App.lang.set('${l.code}')" title="${l.name}">${l.flag}</div>`
            ).join('');
        },

        renderModal() {
            const opts = document.getElementById('lang-options');
            opts.innerHTML = i18n.languages.map(l =>
                `<div class="lang-option${l.code === i18n.currentLang ? ' active' : ''}" onclick="App.lang.set('${l.code}')">
          <span class="lang-flag">${l.flag}</span>
          <span class="lang-name">${l.name}</span>
          <span class="lang-check">✓</span>
        </div>`
            ).join('');
        },

        set(code) {
            i18n.setLang(code);
            this.updateFlag();
            this.renderLoginBar();
            this.renderModal();
            // Re-render dynamic sections
            App.tips.showDaily();
            if (App.currentProfile) {
                const profile = App.profiles.data[App.currentProfile];
                document.getElementById('welcome-greeting').textContent = App.getGreeting() + ',';
                document.getElementById('welcome-motivate').textContent = App.getMotivation();
            }
            if (App.currentSection === 'learn') App.learn.render();
            if (App.currentSection === 'rules') App.rules.render();
            if (App.currentSection === 'profile') { App.profile.renderAchievements(); window.AICoach?.renderKeys(); }
            App.showToast('✅ ' + i18n.languages.find(l => l.code === code).name, 'success');
        },

        updateFlag() {
            const lang = i18n.languages.find(l => l.code === i18n.currentLang);
            document.getElementById('lang-flag-current').textContent = lang?.flag || '🌍';
        },

        openModal() {
            this.renderModal();
            document.getElementById('lang-modal').classList.remove('hidden');
        },

        closeModal() {
            document.getElementById('lang-modal').classList.add('hidden');
        }
    },

    // ══════════════════════════
    // PROFILE SYSTEM
    // ══════════════════════════
    profiles: {
        data: {},

        loadAll() {
            const saved = localStorage.getItem('artikelmeister_profiles');
            this.data = saved ? JSON.parse(saved) : {};
        },

        saveAll() {
            localStorage.setItem('artikelmeister_profiles', JSON.stringify(this.data));
        },

        getAll() { return this.data; },

        showLogin() {
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('splash').classList.add('hidden');
            this.renderSlots();
        },

        renderSlots() {
            const container = document.getElementById('login-profiles');
            let html = '';
            const profiles = Object.entries(this.data);

            profiles.forEach(([id, p]) => {
                html += `
          <div class="profile-slot" onclick="App.profiles.select(${jsArg(id)})">
            <div class="profile-avatar">${esc(p.avatar)}</div>
            <div class="profile-info">
              <div class="profile-name">${esc(p.name)}</div>
              <div class="profile-meta">${i18n.t('level')} ${p.progress.level} · ${p.progress.xp} XP · ${p.progress.wordsLearned.length} ${i18n.t('profile_words')}</div>
            </div>
            <button class="profile-delete" onclick="event.stopPropagation();App.profiles.remove(${jsArg(id)})">✕</button>
          </div>`;
            });

            if (profiles.length < 4) {
                html += `
          <div class="profile-slot empty" onclick="App.profiles.openModal()">
            <div class="profile-avatar">➕</div>
            <div class="profile-info">
              <div class="profile-name">${i18n.t('new_profile')}</div>
              <div class="profile-meta">${i18n.t('new_profile_desc')}</div>
            </div>
          </div>`;
            }

            container.innerHTML = html;
        },

        openModal() {
            document.getElementById('avatar-modal').classList.remove('hidden');
            const grid = document.getElementById('avatar-grid');
            grid.innerHTML = AVATARS.map((a, i) =>
                `<div class="avatar-option${i === 0 ? ' selected' : ''}" data-avatar="${a}" onclick="App.profiles.pickAvatar(this)">${a}</div>`
            ).join('');
            document.getElementById('profile-name-input').value = '';
            document.getElementById('profile-name-input').focus();
            this._selectedAvatar = AVATARS[0];
        },

        closeModal() {
            document.getElementById('avatar-modal').classList.add('hidden');
        },

        pickAvatar(el) {
            document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            this._selectedAvatar = el.dataset.avatar;
        },

        create() {
            const name = document.getElementById('profile-name-input').value.trim();
            if (!name) { App.showToast('⚠️', 'error'); return; }

            const id = 'p_' + Date.now();
            this.data[id] = {
                name: name,
                avatar: this._selectedAvatar || '🧑‍🎓',
                createdAt: new Date().toISOString(),
                progress: App.getDefaultProgress()
            };
            this.saveAll();
            this.closeModal();
            this.select(id);
        },

        select(id, skipSplash) {
            App.currentProfile = id;
            const profile = this.data[id];
            profile.progress = { ...App.getDefaultProgress(), ...profile.progress };
            App.progress = profile.progress;
            localStorage.setItem('artikelmeister_lastProfile', id);

            document.getElementById('login-screen').classList.add('hidden');

            if (!skipSplash) {
                document.getElementById('splash').classList.remove('hidden');
                setTimeout(() => document.getElementById('splash').classList.add('hidden'), 2200);
            }

            document.getElementById('header-avatar').textContent = profile.avatar;
            document.getElementById('welcome-name').textContent = profile.name;
            document.getElementById('profile-avatar-large').textContent = profile.avatar;
            document.getElementById('profile-header-name').textContent = profile.name;
            document.getElementById('welcome-greeting').textContent = App.getGreeting() + ',';
            document.getElementById('welcome-motivate').textContent = App.getMotivation();

            App.checkStreak();
            App.updateUI();
            App.learn.init();
            App.rules.init();
            App.profile.renderAchievements();
            App.tips.showDaily();
        },

        switchProfile() {
            this.loadAll();
            document.getElementById('login-screen').classList.remove('hidden');
            this.renderSlots();
        },

        remove(id) {
            if (!confirm(i18n.t('delete_confirm'))) return;
            delete this.data[id];
            this.saveAll();
            if (App.currentProfile === id) {
                localStorage.removeItem('artikelmeister_lastProfile');
                App.currentProfile = null;
            }
            this.renderSlots();
        }
    },

    // Sunucudan yeni içerik geldiğinde (api-loader) ekranı tazele; oyun ortasındaki sorular değişmez
    onContentUpdated() {
        if (!this.progress) return;
        this.updateUI();
        if (this.currentSection === 'learn') this.learn.render();
        if (this.currentSection === 'rules') this.rules.render();
        this.profile.renderAchievements();
        this.showToast(i18n.t('content_updated'), 'success');
    },

    // ── HELPERS ──
    getWordTranslation(w, lang) {
        if (!w) return '';
        if (w.translations?.[lang]) return w.translations[lang];
        if (lang === 'de') return w.de || w.word;
        if (lang === 'en') return w.en;
        // Çeviri yoksa Türkçe yerine İngilizceye düş
        if (lang === 'uk') return w.uk || w.en || w.tr;
        if (lang === 'ar') return w.ar || w.en || w.tr;
        return w.tr;
    },

    getGreeting() {
        const h = new Date().getHours();
        if (h < 6) return i18n.t('greeting_night');
        if (h < 12) return i18n.t('greeting_morning');
        if (h < 18) return i18n.t('greeting_afternoon');
        return i18n.t('greeting_evening');
    },

    getMotivation() {
        const pool = MOTIVATIONS[i18n.currentLang] || MOTIVATIONS.en;
        return pool[Math.floor(Math.random() * pool.length)];
    },

    getDefaultProgress() {
        return {
            xp: 0, level: 1, streakDays: 0, lastPlayDate: null,
            wordsLearned: [], wordsMastered: [],
            totalCorrect: 0, totalWrong: 0,
            gamesPlayed: 0, bestStreak: 0,
            bestSpeed: 0, totalCombo: 0,
            achievements: [], rulesRead: [],
            wordStats: {}
        };
    },

    saveProgress() {
        if (!this.currentProfile) return;
        this.profiles.data[this.currentProfile].progress = this.progress;
        this.profiles.saveAll();
    },

    resetProgress() {
        if (confirm(i18n.t('profile_reset_confirm'))) {
            this.progress = this.getDefaultProgress();
            this.saveProgress();
            this.updateUI();
            this.profile.renderAchievements();
            this.showToast(i18n.t('profile_reset_done'), 'info');
        }
    },

    // ── STREAK ──
    checkStreak() {
        const today = new Date().toDateString();
        const last = this.progress.lastPlayDate;
        if (last) {
            const diff = Math.floor((new Date(today) - new Date(last)) / 86400000);
            if (diff > 1) this.progress.streakDays = 0;
        }
        if (this.progress.streakDays > 0) document.getElementById('header-streak').classList.add('fire');
    },

    recordPlay() {
        const today = new Date().toDateString();
        if (this.progress.lastPlayDate !== today) {
            const last = this.progress.lastPlayDate;
            if (last) {
                const diff = Math.floor((new Date(today) - new Date(last)) / 86400000);
                this.progress.streakDays = diff === 1 ? this.progress.streakDays + 1 : 1;
            } else { this.progress.streakDays = 1; }
            this.progress.lastPlayDate = today;
        }
        this.saveProgress(); this.updateUI();
    },

    // ── XP & LEVEL ──
    addXP(amount) {
        this.progress.xp += amount;
        const oldLevel = this.progress.level;
        for (let i = DB.levels.length - 1; i >= 0; i--) {
            if (this.progress.xp >= DB.levels[i].xpRequired) { this.progress.level = DB.levels[i].level; break; }
        }
        if (this.progress.level > oldLevel) {
            this.showToast(`${i18n.t('level_up')} ${this.progress.level}! ${DB.levels[this.progress.level - 1].titleTr}`, 'info');
            this.launchConfetti();
        }
        this.showXPFloat(amount);
        document.getElementById('header-xp').classList.add('pulse');
        setTimeout(() => document.getElementById('header-xp').classList.remove('pulse'), 500);
        this.saveProgress(); this.updateUI();
    },

    showXPFloat(amount) {
        const el = document.createElement('div');
        el.className = 'xp-float';
        el.textContent = `+${amount} XP`;
        el.style.left = (Math.random() * 40 + 30) + '%';
        el.style.top = '45%';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    },

    // ── UI UPDATE ──
    updateUI() {
        this.srsUI.render();
        const p = this.progress;
        const lv = DB.levels[p.level - 1];
        const nlv = DB.levels[p.level] || DB.levels[DB.levels.length - 1];
        const xpIn = p.xp - lv.xpRequired;
        const xpFor = nlv.xpRequired - lv.xpRequired;
        const pct = Math.min(100, (xpIn / xpFor) * 100);
        const total = p.totalCorrect + p.totalWrong;
        const acc = total > 0 ? Math.round((p.totalCorrect / total) * 100) : 0;

        document.getElementById('xp-count').textContent = p.xp;
        document.getElementById('streak-count').textContent = p.streakDays;

        document.getElementById('stat-learned').textContent = p.wordsLearned.length;
        document.getElementById('stat-accuracy').textContent = acc + '%';
        document.getElementById('stat-games').textContent = p.gamesPlayed;
        document.getElementById('stat-best').textContent = p.bestStreak;
        document.getElementById('level-num').textContent = p.level;
        document.getElementById('level-title').textContent = lv.title;
        document.getElementById('level-xp-text').textContent = `${p.xp} / ${nlv.xpRequired} XP`;
        document.getElementById('level-bar-fill').style.width = pct + '%';

        document.getElementById('profile-level-num').textContent = p.level;
        document.getElementById('profile-level-title').textContent = `${lv.title} (${lv.titleTr})`;
        document.getElementById('profile-level-xp').textContent = `${p.xp} / ${nlv.xpRequired} XP`;
        document.getElementById('profile-level-bar').style.width = pct + '%';
        document.getElementById('profile-header-level').textContent = `${i18n.t('level')} ${p.level} — ${lv.title}`;
        document.getElementById('profile-total-xp').textContent = p.xp;
        document.getElementById('profile-words').textContent = p.wordsLearned.length;
        document.getElementById('profile-accuracy').textContent = acc + '%';
        document.getElementById('profile-games').textContent = p.gamesPlayed;

        this.updateArticleDist();
    },

    updateArticleDist() {
        const learned = this.progress.wordsLearned;
        let derC = 0, dieC = 0, dasC = 0;
        learned.forEach(id => {
            const w = DB.words.find(ww => ww.id === id);
            if (w) { if (w.article === 'der') derC++; else if (w.article === 'die') dieC++; else dasC++; }
        });
        const t = derC + dieC + dasC || 1;
        document.getElementById('article-dist').innerHTML = `
      <div class="article-dist-der" style="width:${(derC / t) * 100}%"></div>
      <div class="article-dist-die" style="width:${(dieC / t) * 100}%"></div>
      <div class="article-dist-das" style="width:${(dasC / t) * 100}%"></div>`;
        document.getElementById('dist-der').textContent = derC;
        document.getElementById('dist-die').textContent = dieC;
        document.getElementById('dist-das').textContent = dasC;
    },

    // ── NAVIGATION ──
    navigate(section) {
        // Hız modundan çıkılırken sayaç arka planda çalışmaya devam etmesin
        if (this.currentSection === 'speed' && section !== 'speed' && this.speed.running) {
            this.speed.running = false; clearInterval(this.speed.timer);
        }
        if (this.currentSection === 'ai' && section !== 'ai') window.AICoach?.leave();
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${section}`).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const nb = document.querySelector(`.nav-item[data-section="${section}"]`);
        if (nb) nb.classList.add('active');
        this.currentSection = section;
        if (section === 'quiz') this.quiz.init();
        if (section === 'speed') this.speed.reset();
        if (section === 'profile') { this.profile.renderAchievements(); window.AICoach?.renderKeys(); }
        if (section === 'cases') this.cases.init();
        if (section === 'ai') window.AICoach?.open();
        if (section === 'rules' && !this.progress.rulesRead.includes('rules')) {
            this.progress.rulesRead.push('rules');
            this.saveProgress();
            this.checkAchievement('rule_scholar');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ── TOAST ──
    showToast(msg, type = 'info') {
        const t = document.getElementById('toast');
        t.textContent = msg; t.className = `toast ${type} show`;
        setTimeout(() => t.classList.remove('show'), 2800);
    },

    showFeedback(correct) {
        const o = document.getElementById('feedback');
        document.getElementById('feedback-icon').textContent = correct ? '✅' : '❌';
        o.classList.add('show');
        setTimeout(() => o.classList.remove('show'), 750);
    },

    // ── COMBO ──
    showCombo(count) {
        const d = document.getElementById('combo-display');
        const c = document.getElementById('combo-count');
        const b = document.getElementById('combo-bonus');
        if (count >= 2) {
            c.textContent = count;
            const bonus = count >= 5 ? i18n.t('combo_bonus_x3') : count >= 3 ? i18n.t('combo_bonus_x2') : '';
            b.textContent = bonus;
            d.classList.add('active', 'fire');
            setTimeout(() => d.classList.remove('fire'), 300);
        } else {
            d.classList.remove('active');
        }
    },

    getComboMultiplier(streak) {
        if (streak >= 7) return 4;
        if (streak >= 5) return 3;
        if (streak >= 3) return 2;
        return 1;
    },

    // ── CONFETTI ──
    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const particles = [];
        const colors = ['#4A9EFF', '#FF6B9D', '#4ADE80', '#FBBF24', '#8B5CF6', '#FF4757', '#FF6B35'];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 100, y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 18, vy: (Math.random() - 1) * 18,
                size: Math.random() * 8 + 3, color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 12, gravity: 0.35, life: 1
            });
        }
        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            particles.forEach(p => {
                if (p.life <= 0) return; alive = true;
                p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
                p.rotation += p.rotSpeed; p.life -= 0.013;
                ctx.save(); ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });
            if (alive && ++frame < 140) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        animate();
    },

    checkAchievement(id) {
        if (this.progress.achievements.includes(id)) return;
        const ach = DB.achievements.find(a => a.id === id);
        if (!ach) return;
        this.progress.achievements.push(id);
        this.addXP(ach.xp);
        this.showToast(`${i18n.t('achievement_earned')} ${ach.title}!`, 'success');
        this.launchConfetti();
        this.saveProgress();
    },

    checkArticleAchievements() {
        const counts = { der: 0, die: 0, das: 0 };
        this.progress.wordsLearned.forEach(id => {
            const w = DB.words.find(ww => ww.id === id);
            if (w && counts[w.article] !== undefined) counts[w.article]++;
        });
        if (counts.der >= 50) this.checkAchievement('der_master');
        if (counts.die >= 50) this.checkAchievement('die_master');
        if (counts.das >= 50) this.checkAchievement('das_master');
        if (this.progress.wordsLearned.length >= 100) this.checkAchievement('word_collector');
    },

    checkStreakAchievements() {
        if (this.progress.streakDays >= 3) this.checkAchievement('streak_3');
        if (this.progress.streakDays >= 7) this.checkAchievement('streak_7');
        if (this.progress.streakDays >= 30) this.checkAchievement('streak_30');
    },

    // ══════════════════════════
    // TIPS MODULE
    // ══════════════════════════
    tips: {
        getPool() {
            if (window.DAILY_TIPS_API) {
                return window.DAILY_TIPS_API[i18n.currentLang] || window.DAILY_TIPS_API.en || [];
            }
            return DAILY_TIPS[i18n.currentLang] || DAILY_TIPS.en;
        },
        showDaily() {
            const pool = this.getPool();
            const today = new Date().toDateString();
            const cacheKey = `artikelmeister_dailyTip_${i18n.currentLang}`;
            let tip;
            try {
                const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
                if (cached?.date === today) {
                    tip = cached.tip;
                }
            } catch (_) { /* ignore */ }
            if (!tip) {
                tip = pool[Math.floor(Math.random() * pool.length)];
                localStorage.setItem(cacheKey, JSON.stringify({ date: today, tip }));
            }
            document.getElementById('daily-tip-icon').textContent = tip.icon;
            document.getElementById('daily-tip-text').textContent = tip.text;
        },
        showRandom() {
            const pool = this.getPool();
            const tip = pool[Math.floor(Math.random() * pool.length)];
            document.getElementById('daily-tip-icon').textContent = tip.icon;
            document.getElementById('daily-tip-text').textContent = tip.text;
            App.showToast(i18n.t('tip_new'), 'info');
        }
    },

    // ══════════════════════════
    // LEARN MODULE
    // ══════════════════════════
    learn: {
        currentTab: 'der',
        currentSubTab: 'category',
        init() { this.currentSubTab = 'category'; this.render(); },
        setTab(tab) {
            this.currentTab = tab;
            this.currentSubTab = 'category';
            const section = document.getElementById('section-learn');
            section.querySelectorAll('.rule-tab').forEach(t => t.classList.remove('active'));
            const idx = ['der', 'die', 'das', 'tips'].indexOf(tab);
            section.querySelectorAll('.rule-tab')[idx].classList.add('active');
            this.render();
        },
        setSubTab(subTab) {
            this.currentSubTab = subTab;
            const section = document.getElementById('section-learn');
            if (section.querySelector('.back-btn')) section.querySelector('.back-btn').style.display = 'block';
            document.getElementById('learn-content').style.display = 'block';
            document.getElementById('learn-examples-area').style.display = 'none';
            this.render();
        },
        render() {
            const c = document.getElementById('learn-content');
            const tabs = document.getElementById('learn-tabs');
            const section = document.getElementById('section-learn');
            const backBtn = section.querySelector('.back-btn');
            let html = '';

            // Reset visibility
            if (tabs) tabs.style.display = 'flex';
            if (c) c.style.display = 'block';
            if (backBtn) backBtn.style.display = 'block';
            document.getElementById('learn-examples-area').style.display = 'none';

            if (this.currentTab === 'tips') {
                DB.tips.forEach((tip, i) => {
                    html += `<div class="tip-card" style="animation-delay:${i * 0.08}s">
            <div class="tip-icon">${tip.icon}</div>
            <div class="tip-title">${tip.title}</div>
            <div class="tip-text">${tip.text}</div></div>`;
                });
                html += `<div style="margin:24px 0 16px;font-weight:700;font-size:18px">${i18n.t('learn_mini_tips')}</div>`;
                const pool = App.tips.getPool();
                pool.forEach((tip, i) => {
                    html += `<div class="tip-card" style="animation-delay:${i * 0.05}s">
            <div class="tip-icon">${tip.icon}</div>
            <div class="tip-text">${tip.text}</div></div>`;
                });
            } else {
                const article = this.currentTab;

                // SUB-TAB NAVIGATION
                html += `
                <div class="sub-tabs-container" style="display:flex; gap:10px; margin-bottom:24px; background:var(--bg-glass); padding:8px; border-radius:16px; border:1px solid var(--border-glass)">
                    <div class="sub-tab" onclick="App.learn.setSubTab('category')" style="flex:1; text-align:center; padding:12px; border-radius:12px; cursor:pointer; font-weight:700; font-size:15px; transition:all 0.3s; display:flex; align-items:center; justify-content:center; gap:6px; ${this.currentSubTab === 'category' ? 'background:var(--accent); color:#fff; box-shadow:0 4px 15px rgba(74, 158, 255, 0.4); transform:scale(1.02)' : 'color:var(--text-secondary);'}">
                        <span style="font-size:18px">📂</span> ${i18n.t('learn_category_tips')}
                    </div>
                    <div class="sub-tab" onclick="App.learn.setSubTab('suffix')" style="flex:1; text-align:center; padding:12px; border-radius:12px; cursor:pointer; font-weight:700; font-size:15px; transition:all 0.3s; display:flex; align-items:center; justify-content:center; gap:6px; ${this.currentSubTab === 'suffix' ? 'background:var(--accent); color:#fff; box-shadow:0 4px 15px rgba(74, 158, 255, 0.4); transform:scale(1.02)' : 'color:var(--text-secondary);'}">
                        <span style="font-size:18px">📝</span> ${i18n.t('learn_suffix_rules')}
                    </div>
                </div>
                `;

                if (this.currentSubTab === 'category') {
                    html += `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:12px; margin-top:10px;">`;
                    const sortedCats = [...DB.categoryRules[article]].sort((a, b) => (b.priority || 0) - (a.priority || 0));
                    sortedCats.forEach((cat, i) => {
                        html += `
                        <div class="rule-card" style="margin-bottom:0; cursor:pointer; animation-delay:${i * 0.04}s" onclick="App.learn.showCategoryExamples(${jsArg(cat.category)}, '${article}')">
                            <div class="rule-card-header" style="margin-bottom:0; border-bottom:none; padding:8px 0; justify-content:center; position:relative;">
                                <span class="rule-suffix" style="font-size:24px; border-radius:12px; border:none; background:none; padding:0;">${esc(cat.icon)}</span>
                                <span style="position:absolute; top:2px; right:2px; font-size:9px; opacity:0.6;">%${esc(cat.priority || 0)}</span>
                            </div>
                            <div style="font-size:11px; text-align:center; color:var(--text-muted); opacity:0.8; margin-top:5px; font-weight:700;">${esc(cat.category)}</div>
                            <div style="text-align:center; margin-top:8px; font-size:12px; font-weight:700; color:var(--accent);">${i18n.t('learn_view_examples')}</div>
                        </div>`;
                    });
                    html += `</div>`;
                } else {
                    html += `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:12px; margin-top:10px;">`;
                    const sortedSuffixes = [...DB.suffixRules[article]].sort((a, b) => (b.priority || 0) - (a.priority || 0));
                    sortedSuffixes.forEach((s, i) => {
                        html += `
                        <div class="rule-card" style="margin-bottom:0; cursor:pointer; animation-delay:${i * 0.04}s" onclick="App.learn.showSuffixExamples(${jsArg(s.suffix)}, '${article}')">
                            <div class="rule-card-header" style="margin-bottom:0; border-bottom:none; padding:8px 0; justify-content:center; position:relative;">
                                <span class="rule-suffix ${article}" style="font-size:20px">${esc(s.suffix)}</span>
                                <span style="position:absolute; top:2px; right:2px; font-size:9px; opacity:0.6;">%${esc(s.priority || 0)}</span>
                            </div>
                            <div style="font-size:11px; text-align:center; color:var(--text-muted); opacity:0.8; margin-top:5px;">${esc(s.desc)}</div>
                            <div style="text-align:center; margin-top:8px; font-size:12px; font-weight:700; color:var(--accent);">${i18n.t('learn_view_examples')}</div>
                        </div>`;
                    });
                    html += `</div>`;
                }
            }
            c.innerHTML = html;
        },

        showSuffixExamples(suffix, article) {
            const content = document.getElementById('learn-content');
            const tabs = document.getElementById('learn-tabs');
            const section = document.getElementById('section-learn');
            const backBtn = section.querySelector('.back-btn');
            const examplesArea = document.getElementById('learn-examples-area');
            const listEl = document.getElementById('suffix-examples-list');
            const titleEl = document.getElementById('suffix-examples-title');
            const descEl = document.getElementById('suffix-examples-desc');

            content.style.display = 'none';
            tabs.style.display = 'none';
            backBtn.style.display = 'none';
            examplesArea.style.display = 'block';

            titleEl.textContent = i18n.t('learn_suffix_examples', { suffix });
            titleEl.className = article;

            const rule = DB.suffixRules[article].find(r => r.suffix === suffix);
            descEl.textContent = i18n.t('learn_suffix_desc', { article: article.toUpperCase() });

            // Filter words from DB that have this suffix
            const relatedWords = DB.words.filter(w => w.suffix === suffix || w.word.endsWith(suffix.replace('-', '')));

            listEl.innerHTML = '';

            if (relatedWords.length === 0 && rule && rule.example) {
                // If no specific words found, show at least the rule's main example
                relatedWords.push({ word: rule.example.replace(article + ' ', ''), article: article, tr: rule.desc });
            }

            relatedWords.forEach(w => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.style.padding = '15px';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.gap = '8px';
                card.style.animation = 'wordEnter 0.4s ease-out';
                card.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:18px; font-weight:800; color:var(--${esc(w.article)}-color);">${esc(w.article)} ${esc(w.word)}</span>
                        <span style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:12px; padding:3px 8px; background:rgba(255,255,255,0.05); border-radius:8px;">${esc(suffix)}</span>
                            <button type="button" class="speak-btn small" onclick="Speech.speak(${jsArg(w.article + ' ' + w.word)})" aria-label="🔊">🔊</button>
                        </span>
                    </div>
                    <div style="font-size:13px; color:var(--text-muted); opacity:0.8;">${esc(App.getWordTranslation(w, i18n.currentLang))}</div>
                `;
                listEl.appendChild(card);
            });

            window.scrollTo(0, 0);
        },

        showCategoryExamples(catName, article) {
            const content = document.getElementById('learn-content');
            const tabs = document.getElementById('learn-tabs');
            const section = document.getElementById('section-learn');
            const backBtn = section.querySelector('.back-btn');
            const examplesArea = document.getElementById('learn-examples-area');
            const listEl = document.getElementById('suffix-examples-list');
            const titleEl = document.getElementById('suffix-examples-title');
            const descEl = document.getElementById('suffix-examples-desc');

            content.style.display = 'none';
            tabs.style.display = 'none';
            backBtn.style.display = 'none';
            examplesArea.style.display = 'block';

            const cat = DB.categoryRules[article].find(c => c.category === catName);
            titleEl.textContent = `${cat.icon} ${catName}`;
            titleEl.className = article;
            descEl.textContent = i18n.t('learn_category_desc', { article: article.toUpperCase() });

            listEl.innerHTML = '';

            cat.examples.forEach(ex => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.style.padding = '15px';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.animation = 'wordEnter 0.4s ease-out';

                // ex format: "der Mann" or "der Euro"
                const parts = ex.split(' ');
                const art = parts[0];
                const wrd = parts.slice(1).join(' ');

                card.innerHTML = `
                    <span style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:18px; font-weight:800; color:var(--${esc(art)}-color);">${esc(ex)}</span>
                        <button type="button" class="speak-btn small" onclick="Speech.speak(${jsArg(ex)})" aria-label="🔊">🔊</button>
                    </span>
                    <div style="font-size:13px; color:var(--text-muted); opacity:0.7; margin-top:5px;">${esc(i18n.t('learn_category_group', { category: catName }))}</div>
                `;
                listEl.appendChild(card);
            });

            window.scrollTo(0, 0);
        },

        backFromExamples() {
            const section = document.getElementById('section-learn');
            section.querySelector('.back-btn').style.display = 'block';
            document.getElementById('learn-content').style.display = 'block';
            document.getElementById('learn-tabs').style.display = 'flex';
            document.getElementById('learn-examples-area').style.display = 'none';
        },
    },

    // ══════════════════════════
    // QUIZ MODULE
    // ══════════════════════════
    quiz: {
        questions: [], current: 0, correct: 0, wrong: 0, streak: 0, comboBonusXP: 0, answered: false,
        nextMode: 'normal',

        init() {
            // 'weak' yalnızca bir sonraki quiz için geçerli; tekrar dene normal quiz başlatır
            const weak = this.nextMode === 'weak' ? SRS.weakWords(App.progress, DB.words, 10) : [];
            this.nextMode = 'normal';
            this.questions = (weak.length ? weak : SRS.pickQuiz(App.progress, DB.words, 10)).map(w => ({ ...w }));
            this.current = 0; this.correct = 0; this.wrong = 0; this.streak = 0; this.comboBonusXP = 0; this.answered = false;
            this.renderProgress(); this.showQuestion();
            App.showCombo(0);
        },

        renderProgress() {
            const c = document.getElementById('quiz-progress');
            let html = '';
            for (let i = 0; i < this.questions.length; i++) {
                let cls = '';
                if (i < this.current) cls = this.questions[i]._correct ? 'correct' : 'wrong';
                else if (i === this.current) cls = 'current';
                html += `<div class="quiz-dot ${cls}"></div>`;
            }
            c.innerHTML = html;
        },

        showQuestion() {
            if (this.current >= this.questions.length) { this.showResults(); return; }
            this.answered = false;
            const q = this.questions[this.current];
            const container = document.getElementById('quiz-word-container');
            container.style.animation = 'none';
            container.offsetHeight;
            container.style.animation = 'wordEnter 0.4s cubic-bezier(0.16,1,0.3,1)';

            document.getElementById('quiz-word').textContent = q.word;
            document.getElementById('quiz-word').className = 'quiz-word';

            const lang = i18n.currentLang;
            const primary = App.getWordTranslation(q, lang);
            const secondary = lang === 'de' ? q.en : (lang === 'en' ? q.tr : q.en);

            document.getElementById('quiz-translation').textContent =
                lang === 'de' ? primary : `${primary} · ${secondary}`;
            document.getElementById('quiz-category').innerHTML = `📁 ${esc(q.category)}`;
            document.getElementById('quiz-correct').textContent = this.correct;
            document.getElementById('quiz-wrong').textContent = this.wrong;
            document.getElementById('quiz-streak-val').textContent = this.streak;

            const hint = document.getElementById('quiz-hint');
            hint.style.display = (q.isException || q.suffix) ? 'inline-flex' : 'none';

            ['btn-der', 'btn-die', 'btn-das'].forEach(id => {
                const b = document.getElementById(id);
                b.classList.remove('correct', 'wrong', 'reveal');
                b.disabled = false; b.style.opacity = '1';
            });
        },

        showHint() {
            const q = this.questions[this.current];
            let hint = '';
            if (q.isException) {
                const exc = DB.exceptions.find(e => e.word === q.word);
                hint = exc ? `${i18n.t('quiz_hint_exception')} ${exc.category}` : `${i18n.t('quiz_hint_exception')} ⚠️`;
            } else if (q.suffix) {
                hint = `${i18n.t('quiz_hint_suffix')} ${q.suffix} ${i18n.t('quiz_hint_usually')} ${q.article}`;
            }
            App.showToast(hint, 'info');
        },

        answer(article) {
            if (this.answered) return;
            this.answered = true;
            const q = this.questions[this.current];
            const isCorrect = article === q.article;
            q._correct = isCorrect;
            SRS.record(App.progress, q.id, isCorrect);
            if (Speech.autoEnabled()) Speech.speak(`${q.article} ${q.word}`);

            if (isCorrect) {
                this.correct++; this.streak++;
                App.progress.totalCorrect++;
                if (!App.progress.wordsLearned.includes(q.id)) App.progress.wordsLearned.push(q.id);
                document.getElementById(`btn-${article}`).classList.add('correct');
                document.getElementById('quiz-word').classList.add('correct-reveal');
                App.showFeedback(true); App.showCombo(this.streak);
                const mult = App.getComboMultiplier(this.streak);
                if (mult > 1) {
                    this.comboBonusXP += 10 * (mult - 1);
                    App.showToast(`🔥 ${mult}x ${i18n.t('combo_fire')}`, 'xp');
                }
            } else {
                this.wrong++; this.streak = 0;
                App.progress.totalWrong++;
                document.getElementById(`btn-${article}`).classList.add('wrong');
                document.getElementById('quiz-word').classList.add('wrong-reveal');
                setTimeout(() => document.getElementById(`btn-${q.article}`).classList.add('reveal'), 400);
                App.showFeedback(false); App.showCombo(0);
            }

            if (this.streak > App.progress.bestStreak) App.progress.bestStreak = this.streak;
            App.saveProgress(); this.renderProgress();
            ['btn-der', 'btn-die', 'btn-das'].forEach(id => document.getElementById(id).disabled = true);
            setTimeout(() => { this.current++; this.showQuestion(); }, 1300);
        },

        showResults() {
            App.progress.gamesPlayed++;
            App.recordPlay(); App.showCombo(0);

            const total = this.questions.length || 1;
            const baseXP = this.correct * 10;
            const perfectBonus = this.correct === total && total >= 10 ? 50 : 0;
            const xp = baseXP + perfectBonus + this.comboBonusXP;
            const pct = Math.round((this.correct / total) * 100);

            let emoji = '😊', title = i18n.t('results_try');
            if (pct === 100) { emoji = '🏆'; title = i18n.t('results_perfect'); }
            else if (pct >= 80) { emoji = '🎉'; title = i18n.t('results_great'); }
            else if (pct >= 60) { emoji = '👍'; title = i18n.t('results_good'); }
            else if (pct < 40) { emoji = '💪'; title = i18n.t('results_practice'); }

            document.getElementById('results-emoji').textContent = emoji;
            document.getElementById('results-title').textContent = title;
            document.getElementById('results-subtitle').textContent = `${this.correct}/${total} ${i18n.t('results_correct_answers')}`;
            document.getElementById('results-xp').textContent = `+${xp} XP`;

            document.getElementById('results-stats').innerHTML = `
        <div class="result-stat"><div class="result-stat-value" style="color:var(--success)">${this.correct}</div><div class="result-stat-label">${i18n.t('quiz_correct')}</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--error)">${this.wrong}</div><div class="result-stat-label">${i18n.t('quiz_wrong')}</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--xp-color)">${pct}%</div><div class="result-stat-label">${i18n.t('stats_accuracy')}</div></div>`;

            document.getElementById('results').classList.remove('hidden');
            document.getElementById('results-continue').onclick = () => { document.getElementById('results').classList.add('hidden'); App.navigate('home'); };
            document.getElementById('results-retry').textContent = i18n.t('results_retry');
            document.getElementById('results-retry').onclick = () => { document.getElementById('results').classList.add('hidden'); App.quiz.init(); };

            App.addXP(xp);
            if (pct === 100 && total >= 10) App.checkAchievement('perfect_10');
            if (pct === 100) App.launchConfetti();
            App.srsUI.render();
            if (App.progress.gamesPlayed === 1) App.checkAchievement('first_step');
            App.checkStreakAchievements();
            App.checkArticleAchievements();
            if (App.progress.level >= 10) App.checkAchievement('level_10');
        },

        // Cevaptan önce yalnızca kelime (artikel ipucu vermemek için), sonra artikeliyle
        speak() {
            const q = this.questions[this.current];
            if (q) Speech.speak(this.answered ? `${q.article} ${q.word}` : q.word);
        },

        startWeak() {
            this.nextMode = 'weak';
            App.navigate('quiz');
        },

        quit() { App.showCombo(0); App.navigate('home'); }
    },

    // ══════════════════════════
    // SPEED MODULE
    // ══════════════════════════
    speed: {
        timer: null, timeLeft: 60, score: 0, currentWord: null, running: false, wordsPool: [], streak: 0,

        reset() {
            this.running = false; this.timeLeft = 60; this.score = 0; this.streak = 0;
            clearInterval(this.timer);
            document.getElementById('speed-time').textContent = '60';
            document.getElementById('speed-time').className = 'speed-time';
            document.getElementById('speed-score').textContent = '0';
            document.getElementById('speed-word').textContent = i18n.t('speed_ready');
            document.getElementById('speed-translation').textContent = '';
            document.getElementById('speed-start-btn').style.display = 'block';
            ['speed-btn-der', 'speed-btn-die', 'speed-btn-das'].forEach(id => {
                document.getElementById(id).disabled = true; document.getElementById(id).style.opacity = '0.4';
            });
            App.showCombo(0);
        },

        start() {
            this.running = true; this.timeLeft = 60; this.score = 0; this.streak = 0;
            this.wordsPool = [...DB.words].sort(() => Math.random() - 0.5);
            document.getElementById('speed-start-btn').style.display = 'none';
            ['speed-btn-der', 'speed-btn-die', 'speed-btn-das'].forEach(id => {
                document.getElementById(id).disabled = false; document.getElementById(id).style.opacity = '1';
            });
            this.nextWord();
            this.timer = setInterval(() => {
                this.timeLeft--;
                const el = document.getElementById('speed-time');
                el.textContent = this.timeLeft;
                if (this.timeLeft <= 10) el.className = 'speed-time danger';
                else if (this.timeLeft <= 20) el.className = 'speed-time warning';
                if (this.timeLeft <= 0) this.end();
            }, 1000);
        },

        nextWord() {
            if (!this.wordsPool.length) this.wordsPool = [...DB.words].sort(() => Math.random() - 0.5);
            this.currentWord = this.wordsPool.pop();
            document.getElementById('speed-word').textContent = this.currentWord.word;
            document.getElementById('speed-translation').textContent =
                App.getWordTranslation(this.currentWord, i18n.currentLang);
            ['speed-btn-der', 'speed-btn-die', 'speed-btn-das'].forEach(id => document.getElementById(id).classList.remove('correct', 'wrong'));
            const word = document.getElementById('speed-word');
            word.style.animation = 'none'; word.offsetHeight;
            word.style.animation = 'wordEnter 0.3s ease';
        },

        answer(article) {
            if (!this.running) return;
            const correct = article === this.currentWord.article;
            SRS.record(App.progress, this.currentWord.id, correct);
            if (correct) {
                this.score++; this.streak++;
                document.getElementById('speed-score').textContent = this.score;
                document.getElementById(`speed-btn-${article}`).classList.add('correct');
                App.progress.totalCorrect++;
                if (!App.progress.wordsLearned.includes(this.currentWord.id)) App.progress.wordsLearned.push(this.currentWord.id);
                App.showCombo(this.streak);
            } else {
                this.streak = 0;
                document.getElementById(`speed-btn-${article}`).classList.add('wrong');
                App.progress.totalWrong++;
                this.timeLeft -= 2;
                App.showCombo(0);
            }
            App.saveProgress();
            setTimeout(() => this.nextWord(), 350);
        },

        end() {
            this.running = false; clearInterval(this.timer);
            App.progress.gamesPlayed++;
            if (this.score > App.progress.bestSpeed) App.progress.bestSpeed = this.score;
            App.recordPlay(); App.showCombo(0);

            const xp = this.score * 5;
            let emoji = '⚡', title = i18n.t('results_speed_done');
            if (this.score >= 30) { emoji = '🏆'; title = i18n.t('results_incredible'); }
            else if (this.score >= 20) { emoji = '🔥'; title = i18n.t('results_fast'); }
            else if (this.score >= 10) { emoji = '👍'; title = i18n.t('results_nice_pace'); }

            document.getElementById('results-emoji').textContent = emoji;
            document.getElementById('results-title').textContent = title;
            document.getElementById('results-subtitle').textContent = `${i18n.t('results_in_60s')} ${this.score} ${i18n.t('results_correct_answers')}`;
            document.getElementById('results-xp').textContent = `+${xp} XP`;
            document.getElementById('results-stats').innerHTML = `
        <div class="result-stat"><div class="result-stat-value" style="color:var(--success)">${this.score}</div><div class="result-stat-label">${i18n.t('quiz_correct')}</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--xp-color)">${xp}</div><div class="result-stat-label">XP</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--die-color)">${Math.round(this.score / 60 * 100)}%</div><div class="result-stat-label">${i18n.t('stats_accuracy')}</div></div>`;
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('results-continue').onclick = () => { document.getElementById('results').classList.add('hidden'); App.navigate('home'); };
            document.getElementById('results-retry').textContent = i18n.t('results_retry');
            document.getElementById('results-retry').onclick = () => { document.getElementById('results').classList.add('hidden'); App.speed.reset(); App.speed.start(); };
            App.addXP(xp);
            if (this.score >= 20) App.checkAchievement('speed_demon');
        },

        quit() { this.running = false; clearInterval(this.timer); App.showCombo(0); App.navigate('home'); }
    },

    // ══════════════════════════
    // RULES MODULE
    // ══════════════════════════
    rules: {
        currentTab: 'der',
        init() { this.render(); },
        setTab(tab) {
            this.currentTab = tab;
            const section = document.getElementById('section-rules');
            section.querySelectorAll('.rule-tab').forEach(t => t.classList.remove('active'));
            const idx = ['der', 'die', 'das', 'exceptions'].indexOf(tab);
            section.querySelectorAll('.rule-tab')[idx].classList.add('active');
            this.render();
        },
        render() {
            const c = document.getElementById('rules-content');
            let html = '';
            if (this.currentTab === 'exceptions') {
                html += `<div style="margin-bottom:16px;color:var(--text-secondary);font-size:14px;line-height:1.6">${i18n.t('rules_exceptions_desc')}</div>`;
                DB.exceptions.forEach((exc, i) => {
                    const color = exc.article === 'der' ? 'var(--der-color)' : exc.article === 'die' ? 'var(--die-color)' : 'var(--das-color)';
                    html += `<div class="rule-card" style="border-left:3px solid ${color};animation-delay:${i * 0.06}s">
            <div class="rule-card-header"><span style="font-size:26px">${esc(exc.icon)}</span><span class="rule-suffix" style="color:${color}">${esc(exc.article)} ${esc(exc.word)}</span>
            <span class="exception-badge">⚠️ ${i18n.t('exception')}</span></div>
            <div class="rule-example">${esc(exc.category)}</div></div>`;
                });
            } else {
                const a = this.currentTab;
                html += `<div style="margin-bottom:16px;font-weight:800;font-size:19px">${i18n.t('rules_suffix_title')}</div>`;
                DB.suffixRules[a].forEach((s, i) => {
                    html += `<div class="rule-card" style="animation-delay:${i * 0.05}s">
            <div class="rule-card-header"><span class="rule-suffix ${a}">${esc(s.suffix)}</span><span style="color:var(--text-muted)">→ ${a}</span></div>
            <div class="rule-example"><span>${esc(s.example)}</span> — ${esc(s.desc)}</div></div>`;
                });
                html += `<div style="margin:28px 0 16px;font-weight:800;font-size:19px">${i18n.t('rules_category_title')}</div>`;
                DB.categoryRules[a].forEach((cat, i) => {
                    html += `<div class="category-card" style="animation-delay:${i * 0.06}s">
            <div class="category-header"><span class="category-icon">${esc(cat.icon)}</span><span class="category-title">${esc(cat.category)}</span></div>
            <div class="category-examples">${cat.examples.map(e => `<span class="category-tag ${a}">${esc(e)}</span>`).join('')}</div></div>`;
                });
            }
            c.innerHTML = html;
        }
    },

    // ══════════════════════════
    // CASES MODULE
    // ══════════════════════════
    cases: {
        currentIndex: 0,
        correct: 0, wrong: 0, streak: 0, comboBonusXP: 0, answered: false,
        pool: [],

        init() {
            this.showIntro();
        },

        showIntro() {
            document.getElementById('cases-intro').style.display = 'block';
            document.getElementById('cases-guide-area').style.display = 'none';
            document.getElementById('cases-game-area').style.display = 'none';
            document.getElementById('cases-examples-area').style.display = 'none';
        },

        showGuide() {
            document.getElementById('cases-intro').style.display = 'none';
            document.getElementById('cases-guide-area').style.display = 'block';
            document.getElementById('cases-game-area').style.display = 'none';
            document.getElementById('cases-examples-area').style.display = 'none';

            // Generate details
            document.getElementById('cases-guide-details').innerHTML = i18n.t('cases_guide_content');
        },

        startPractice() {
            document.getElementById('cases-intro').style.display = 'none';
            document.getElementById('cases-guide-area').style.display = 'none';
            document.getElementById('cases-game-area').style.display = 'block';
            document.getElementById('cases-examples-area').style.display = 'none';

            // Generate a larger pool by repeating cases if needed, or just 10 questions max
            let allEx = [...DB.casesExercises].sort(() => Math.random() - 0.5);
            this.pool = allEx.slice(0, 10);

            this.currentIndex = 0;
            this.correct = 0; this.wrong = 0; this.streak = 0; this.comboBonusXP = 0;
            this.renderProgress();
            this.renderCurrent();
            App.showCombo(0);
        },

        showExamples(caseKey) {
            document.getElementById('cases-guide-area').style.display = 'none';
            document.getElementById('cases-examples-area').style.display = 'block';

            const titleEl = document.getElementById('examples-title');
            const listEl = document.getElementById('examples-list');

            titleEl.textContent = `${caseKey} ${i18n.t('examples_title_suffix')}`;
            listEl.innerHTML = '';

            const examples = DB.caseExamples[caseKey] || [];
            examples.forEach(ex => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.style.padding = '12px';
                card.style.display = 'flex';
                card.style.alignItems = 'center';
                card.style.gap = '15px';
                card.style.animation = 'wordEnter 0.4s ease-out';
                card.innerHTML = `
                    <div style="font-size:24px; min-width:60px; text-align:center; white-space:pre-line; line-height:1.1;">${esc(ex.icon)}</div>
                    <div>
                        <div style="font-weight:bold; color:var(--text-primary); font-size:16px;">${esc(ex.text)}</div>
                        <div style="font-size:13px; color:var(--text-muted); opacity:0.8;">${esc(ex.tr)}</div>
                    </div>
                `;
                listEl.appendChild(card);
            });

            window.scrollTo(0, 0);
        },

        renderProgress() {
            const c = document.getElementById('cases-progress');
            let html = '';
            for (let i = 0; i < this.pool.length; i++) {
                let cls = '';
                if (i < this.currentIndex) cls = this.pool[i]._correct ? 'correct' : 'wrong';
                else if (i === this.currentIndex) cls = 'current';
                html += `<div class="quiz-dot ${cls}"></div>`;
            }
            c.innerHTML = html;
        },

        renderCurrent() {
            const area = document.getElementById('cases-area');
            const btn = document.getElementById('cases-next-btn');
            const opts = document.getElementById('cases-options');

            if (this.currentIndex >= this.pool.length) {
                this.showResults();
                return;
            }

            this.answered = false;
            btn.style.display = 'none';
            opts.style.display = 'grid';
            const ex = this.pool[this.currentIndex];

            document.getElementById('cases-correct').textContent = this.correct;
            document.getElementById('cases-wrong').textContent = this.wrong;
            document.getElementById('cases-streak').textContent = this.streak;

            let wordHtml = esc(ex.word);
            if (ex.suffix) {
                const idx = ex.word.lastIndexOf(ex.suffix);
                if (idx !== -1) {
                    const basePart = ex.word.substring(0, idx);
                    wordHtml = esc(basePart) + `<span class="case-suffix ${esc(ex.baseArticle)}">${esc(ex.suffix)}</span>`;
                }
            }

            let preHtml = esc(ex.sentencePre);
            if (ex.focusWord) {
                preHtml = preHtml.replace(esc(ex.focusWord), `<span class="case-focus-word">${esc(ex.focusWord)}</span>`);
            }

            let html = `
            <div class="case-card">
              <div style="font-size:14px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px; font-weight:700;">
                ❖ ${esc(ex.caseName)} ❖
              </div>
              <div class="case-sentence">
                <span>${preHtml}</span>
                <span class="case-blank" id="case-blank-el">––</span>
                <span class="case-noun">${ex.declinedNoun ? esc(ex.declinedNoun) : wordHtml}</span>
                <span>${esc(ex.sentencePost || '')}</span>
              </div>
              <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">
                (${esc(ex.tr)})
              </div>
              <div class="case-explanation" id="case-explanation-el">
                ${esc(ex.explanation)}
              </div>
              <div id="case-hint-text" style="font-size:12px; color:var(--text-muted); margin-top:12px;">
                <span class="case-hint" onclick="App.showToast(${jsArg(`${i18n.t('cases_hint')}: ${ex.baseArticle} ${ex.word}`)})" style="cursor:pointer; display:inline-block; padding:5px; background:rgba(255,255,255,0.1); border-radius:5px;">💡 ${i18n.t('quiz_hint_btn')}</span>
              </div>
            </div>`;

            area.style.animation = 'none';
            area.offsetHeight;
            area.style.animation = 'wordEnter 0.4s cubic-bezier(0.16,1,0.3,1)';
            area.innerHTML = html;

            // Generate options: correct one + 3 random ones from ['der', 'die', 'das', 'den', 'dem', 'des']
            let allArticles = ['der', 'die', 'das', 'den', 'dem', 'des'];
            let options = new Set();
            options.add(ex.declinedArticle);
            // also ensure base article is included if not same
            options.add(ex.baseArticle);

            while (options.size < 4) {
                let r = allArticles[Math.floor(Math.random() * allArticles.length)];
                options.add(r);
            }
            let optionsArr = Array.from(options).sort(() => Math.random() - 0.5);

            opts.innerHTML = optionsArr.map(opt => `
              <button class="article-btn" style="background:var(--bg-glass); color:white" onclick="App.cases.answer(${jsArg(opt)}, this)">${esc(opt)}</button>
            `).join('');
        },

        answer(selectedOpt, btnEl) {
            if (this.answered) return;
            this.answered = true;

            const ex = this.pool[this.currentIndex];
            const isCorrect = selectedOpt === ex.declinedArticle;
            ex._correct = isCorrect;

            const blank = document.getElementById('case-blank-el');
            const exp = document.getElementById('case-explanation-el');
            const btn = document.getElementById('cases-next-btn');
            const hintTxt = document.getElementById('case-hint-text');
            const opts = document.getElementById('cases-options');

            // Change blank to the correct text anyway
            blank.textContent = ex.declinedArticle;
            blank.classList.add('revealed', ex.baseArticle);
            exp.classList.add('show');
            if (hintTxt) hintTxt.style.display = 'none';
            btn.style.display = 'inline-block';

            if (isCorrect) {
                this.correct++; this.streak++;
                btnEl.classList.add('correct');
                App.showFeedback(true); App.showCombo(this.streak);
                const mult = App.getComboMultiplier(this.streak);
                if (mult > 1) {
                    this.comboBonusXP += 12 * (mult - 1);
                    App.showToast(`🔥 ${mult}x ${i18n.t('combo_fire')}`, 'xp');
                }
            } else {
                this.wrong++; this.streak = 0;
                btnEl.classList.add('wrong');
                App.showFeedback(false); App.showCombo(0);
                // Also highlight correct button
                Array.from(opts.children).forEach(b => {
                    if (b.textContent === ex.declinedArticle) b.classList.add('reveal');
                });
            }

            App.progress.totalCorrect += isCorrect ? 1 : 0;
            App.progress.totalWrong += isCorrect ? 0 : 1;
            App.saveProgress();
            this.renderProgress();

            Array.from(opts.children).forEach(b => {
                b.disabled = true;
                b.style.pointerEvents = 'none';
            });
        },

        next() {
            this.currentIndex++;
            this.renderCurrent();
        },

        showResults() {
            App.progress.gamesPlayed++;
            App.recordPlay(); App.showCombo(0);

            const baseXP = this.correct * 12;
            const perfectBonus = this.correct === this.pool.length ? 50 : 0;
            const xp = baseXP + perfectBonus + this.comboBonusXP;
            const pct = Math.round((this.correct / this.pool.length) * 100);

            let emoji = '😊', title = i18n.t('results_try');
            if (pct >= 100) { emoji = '🏆'; title = i18n.t('results_perfect'); }
            else if (pct >= 80) { emoji = '🎉'; title = i18n.t('results_great'); }
            else if (pct >= 60) { emoji = '👍'; title = i18n.t('results_good'); }

            document.getElementById('results-emoji').textContent = emoji;
            document.getElementById('results-title').textContent = title;
            document.getElementById('results-subtitle').textContent = `${this.correct}/${this.pool.length} ${i18n.t('results_correct_answers')}`;
            document.getElementById('results-xp').textContent = `+${xp} XP`;

            document.getElementById('results-stats').innerHTML = `
        <div class="result-stat"><div class="result-stat-value" style="color:var(--success)">${this.correct}</div><div class="result-stat-label">${i18n.t('quiz_correct')}</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--error)">${this.wrong}</div><div class="result-stat-label">${i18n.t('quiz_wrong')}</div></div>
        <div class="result-stat"><div class="result-stat-value" style="color:var(--xp-color)">${pct}%</div><div class="result-stat-label">${i18n.t('stats_accuracy')}</div></div>`;

            document.getElementById('results').classList.remove('hidden');
            document.getElementById('results-continue').onclick = () => { document.getElementById('results').classList.add('hidden'); App.navigate('home'); };
            document.getElementById('results-retry').textContent = i18n.t('results_retry');
            document.getElementById('results-retry').onclick = () => { document.getElementById('results').classList.add('hidden'); App.cases.startPractice(); };

            App.addXP(xp);

            if (pct >= 80) App.checkAchievement('cases_master');
        },

        quit() {
            App.showCombo(0);
            App.navigate('home');
        }
    },

    // ══════════════════════════
    // PROFILE/ACHIEVEMENTS
    // ══════════════════════════
    profile: {
        renderAchievements() {
            const grid = document.getElementById('achievements-grid');
            let html = '';
            DB.achievements.forEach(ach => {
                const unlocked = App.progress.achievements.includes(ach.id);
                html += `<div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${esc(ach.icon)}</div>
          <div class="achievement-title">${esc(ach.title)}</div>
          <div class="achievement-desc">${esc(ach.desc)}</div>
          <div class="achievement-xp">${unlocked ? i18n.t('achievement_unlocked') : `${i18n.t('achievement_locked')} ${esc(ach.xp)} XP`}</div></div>`;
            });
            grid.innerHTML = html;
        }
    }
};
