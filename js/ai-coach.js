// 🤖 AI Koç — üç mod:
//   🎯 AI Quiz        yanlış cevapta püf noktası + tur sonu hata analizi
//   🔍 Artikel Dedektifi  herhangi bir kelime: artikel, kural, çoğul, örnek cümle
//   ✍️ Cümle Ustası   zayıf kelimelerle AI cümleleri (ismin halleri)
// AI çağrısı yolu: (1) kullanıcının bu cihaza eklediği kendi anahtarı varsa doğrudan sağlayıcıya,
// (2) yoksa sunucuya (anahtarlar sunucuda), (3) ikisi de yoksa çevrimdışı kural tabanlı ipuçları.
// Görev mantığı sunucuyla ortaktır (server/ai-core → js/vendor/ai-core.js, ihtiyaç anında yüklenir).
(function () {
  const PROVIDER_KEY = 'artikelmeister_ai_provider';
  const RECENT_KEY = 'artikelmeister_ai_recent';
  const KEYS_STORE = 'artikelmeister_ai_keys';     // yedeğe dahil edilmez (js/backup.js PREF_KEYS)
  const CACHE_STORE = 'artikelmeister_ai_cache';
  const CACHE_TTL = 30 * 86400000;
  const CACHE_MAX = 300;
  const WORD_RE = /^[\p{L}][\p{L}\-']{0,39}$/u;
  const COLORS = { der: 'color_der', die: 'color_die', das: 'color_das' };
  const DEVICE_PROVIDERS = ['gemini', 'claude', 'minimax'];
  const LABELS = { gemini: 'Gemini', claude: 'Claude', minimax: 'MiniMax', openai: 'OpenAI' };
  const KEY_LINKS = {
    gemini: 'https://aistudio.google.com/apikey',
    claude: 'https://platform.claude.com/',
    minimax: 'https://platform.minimax.io/'
  };

  let status = null;      // sunucu: { enabled, providers, default } veya null
  let view = 'menu';
  let runId = 0;          // görünüm değişince eski zamanlayıcı/istekler yok sayılır

  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* depolama dolu/kapalı */ }
  }

  // ── Kullanıcının kendi anahtarları (yalnızca bu cihazda) ──
  function deviceKeys() {
    const k = readJson(KEYS_STORE, {});
    return k && typeof k === 'object' ? k : {};
  }

  function deviceProviders() {
    const k = deviceKeys();
    return DEVICE_PROVIDERS.filter((id) => typeof k[id] === 'string' && k[id].length > 0);
  }

  // ── Sunucu ──
  function apiBase() {
    return window.ContentSync?.apiBase || '';
  }

  function canReachServer() {
    if (navigator.onLine === false) return false;
    return !(window.ContentSync?.isNative && !apiBase());
  }

  async function request(path, body, timeoutMs = 45000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(`${apiBase()}/api/ai${path}`, body ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
      } : { signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  async function refreshStatus() {
    if (!canReachServer()) { status = null; return; }
    try {
      const s = await request('/status', null, 6000);
      status = s.enabled ? s : null;
    } catch {
      status = null;
    }
  }

  // Kullanılabilir sağlayıcılar: önce cihaz anahtarları, sonra sunucudakiler
  function availableProviders() {
    const list = deviceProviders().map((id) => ({ id, label: LABELS[id], source: 'device' }));
    (status?.providers || []).forEach((p) => {
      if (!list.some((x) => x.id === p.id)) list.push({ id: p.id, label: p.label, source: 'server' });
    });
    return list;
  }

  function online() {
    if (navigator.onLine === false) return false;
    return deviceProviders().length > 0 || !!status?.enabled;
  }

  function providerPref() {
    try { return localStorage.getItem(PROVIDER_KEY) || 'auto'; } catch { return 'auto'; }
  }

  function setProviderPref(id) {
    try { localStorage.setItem(PROVIDER_KEY, id); } catch { /* */ }
  }

  function activeProvider() {
    const list = availableProviders();
    const pref = providerPref();
    return list.find((p) => p.id === pref) || list.find((p) => p.source === 'device')
      || list.find((p) => p.id === status?.default) || list[0] || null;
  }

  function providerLabel(id) {
    return LABELS[id] || status?.providers?.find((p) => p.id === id)?.label || id || 'AI';
  }

  // ── Cihazdan doğrudan çağrı ──
  let corePromise = null;
  function loadCore() {
    if (window.AICore) return Promise.resolve(window.AICore);
    if (!corePromise) {
      corePromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'js/vendor/ai-core.js';
        s.onload = () => resolve(window.AICore);
        s.onerror = () => { corePromise = null; reject(new Error('AI modülü yüklenemedi')); };
        document.head.appendChild(s);
      });
    }
    return corePromise;
  }

  // APK'da istekler Android'in yerel HTTP katmanından gider (tarayıcı CORS kısıtı yok)
  function nativeFetch() {
    const Http = window.Capacitor?.isNativePlatform?.() && window.Capacitor.Plugins?.CapacitorHttp;
    if (!Http) return undefined;
    return async (url, init = {}) => {
      const headers = {};
      new Headers(init.headers || {}).forEach((v, k) => { headers[k] = v; });
      let data;
      try { data = init.body ? JSON.parse(init.body) : undefined; } catch { data = init.body; }
      const r = await Http.request({
        url: String(url), method: init.method || 'GET', headers, data,
        connectTimeout: 20000, readTimeout: 120000
      });
      const body = typeof r.data === 'string' ? r.data : JSON.stringify(r.data ?? {});
      let respHeaders;
      try { respHeaders = new Headers(r.headers || {}); } catch { respHeaders = new Headers(); }
      respHeaders.set('content-type', 'application/json');
      return new Response(body, { status: r.status, headers: respHeaders });
    };
  }

  function localContext(word) {
    const lw = word.toLowerCase();
    const entry = DB.words.find((w) => w.word.toLowerCase() === lw);
    const exception = DB.exceptions.find((e) => stripArticle(e.word).toLowerCase() === lw);
    const suffixes = suffixMatches(word);
    return {
      lines: AICore.contextLines({
        entry: entry && { article: entry.article, word: entry.word, tr: entry.tr, en: entry.en, category: entry.category },
        exception: exception && { article: exception.article, category: exception.category },
        suffixes
      }),
      dictArticle: entry?.article
    };
  }

  function localCache(providerId) {
    const k = (parts) => [providerId, ...parts].join('|');
    return {
      get(parts) {
        const hit = readJson(CACHE_STORE, {})[k(parts)];
        return hit && Date.now() - hit.t < CACHE_TTL ? { data: hit.d, provider: hit.p } : null;
      },
      set(parts, data, provider) {
        const all = readJson(CACHE_STORE, {});
        all[k(parts)] = { d: data, p: provider, t: Date.now() };
        const keys = Object.keys(all);
        if (keys.length > CACHE_MAX) {
          keys.sort((a, b) => all[a].t - all[b].t).slice(0, keys.length - CACHE_MAX).forEach((x) => delete all[x]);
        }
        writeJson(CACHE_STORE, all);
      }
    };
  }

  async function runOnDevice(task, input, id, apiKey) {
    const core = await loadCore();
    return core.runTask(task, input, {
      chat: (req) => core.chatJSON({ id, apiKey: apiKey || deviceKeys()[id], fetch: nativeFetch() }, req),
      context: task === 'ping' ? null : localContext,
      cache: task === 'ping' ? null : localCache(id)
    });
  }

  async function aiCall(path, body) {
    const task = path.slice(1);
    const input = { ...body, lang: i18n.currentLang };
    const p = activeProvider();
    if (p?.source === 'device') {
      const res = await runOnDevice(task, input, p.id);
      return { result: res.data, provider: res.provider, cached: res.cached };
    }
    return request(path, { ...input, provider: p?.id });
  }

  // ── Çevrimdışı ipucu motoru (uygulamadaki kurallardan) ──
  function stripArticle(s) {
    return String(s || '').trim().replace(/^(der|die|das)\s+/i, '');
  }

  function suffixMatches(word) {
    const lw = word.toLowerCase();
    const out = [];
    ['der', 'die', 'das'].forEach((article) => {
      (DB.suffixRules[article] || []).forEach((r) => {
        const s = r.suffix.replace(/^-/, '').toLowerCase();
        if (s && lw.endsWith(s) && lw !== s) out.push({ ...r, article, len: s.length });
      });
    });
    return out.sort((a, b) => b.len - a.len || (b.priority || 0) - (a.priority || 0));
  }

  function sameArticleExamples(article, filter, exclude, n = 3) {
    return DB.words
      .filter((w) => w.article === article && w.word !== exclude && filter(w))
      .sort(() => Math.random() - 0.5)
      .slice(0, n)
      .map((w) => ({ article: w.article, word: w.word }));
  }

  function localExplain(w) {
    const word = w.word;
    const article = w.article;
    const lw = word.toLowerCase();
    const t = (k, v) => i18n.t(k, v);

    const exc = DB.exceptions.find((e) => stripArticle(e.word).toLowerCase() === lw);
    if (exc || w.isException) {
      return {
        type: 'exception',
        rule: t('ai_rule_exception', { desc: exc?.category || '—' }),
        trick: t('ai_trick_exception', { article, word }),
        examples: DB.exceptions.filter((e) => stripArticle(e.word) !== word).slice(0, 3)
          .map((e) => ({ article: e.article, word: stripArticle(e.word) }))
      };
    }

    const suffix = suffixMatches(word).find((r) => r.article === article);
    if (suffix) {
      const s = suffix.suffix.replace(/^-/, '').toLowerCase();
      return {
        type: 'suffix',
        rule: t('ai_rule_suffix', { suffix: suffix.suffix, article, desc: suffix.desc }),
        trick: t('ai_trick_suffix', { suffix: suffix.suffix, article }),
        examples: sameArticleExamples(article, (x) => x.word.toLowerCase().endsWith(s), word)
      };
    }

    // Kategori kuralı: kelime örneklerde geçiyorsa ya da örneklerle aynı kategorideyse (artikel eşleşmeli)
    const exampleCategory = (ex) => DB.words.find((x) => x.word.toLowerCase() === stripArticle(ex).toLowerCase())?.category;
    const rules = DB.categoryRules[article] || [];
    const cat = rules.find((c) => (c.examples || []).some((ex) => stripArticle(ex).toLowerCase() === lw))
      || rules.find((c) => (c.examples || []).some((ex) => w.category && exampleCategory(ex) === w.category));
    if (cat) {
      return {
        type: 'category',
        rule: t('ai_rule_category', { category: cat.category, article }),
        trick: t('ai_trick_category', { category: cat.category, article }),
        examples: cat.examples.filter((ex) => stripArticle(ex).toLowerCase() !== lw).slice(0, 3)
          .map((ex) => ({ article, word: stripArticle(ex) }))
      };
    }

    // Bileşik kelime: sözlükteki en uzun son parça
    const part = DB.words
      .filter((x) => x.word.length >= 3 && x.word.toLowerCase() !== lw && lw.endsWith(x.word.toLowerCase()))
      .sort((a, b) => b.word.length - a.word.length)[0];
    if (part && part.article === article) {
      const p = part.word.toLowerCase();
      return {
        type: 'compound',
        rule: t('ai_rule_compound', { part: `${part.article} ${part.word}` }),
        trick: t('ai_trick_compound', { part: part.word, article, word }),
        examples: sameArticleExamples(article, (x) => x.word.toLowerCase().endsWith(p), word)
      };
    }

    // Grup eğilimi: aynı kategorideki kelimelerin çoğu bu artikeli alıyor
    const group = DB.words.filter((x) => x.category === w.category && x.word !== word);
    const share = group.length >= 4 ? group.filter((x) => x.article === article).length / group.length : 0;
    if (share >= 0.6) {
      return {
        type: 'group',
        rule: t('ai_rule_group', { group: w.category, pct: Math.round(share * 100), article }),
        trick: t('ai_trick_color', { article, word, color: t(COLORS[article]) }),
        examples: sameArticleExamples(article, (x) => x.category === w.category, word)
      };
    }

    return {
      type: 'memorize',
      rule: t('ai_rule_none'),
      trick: t('ai_trick_color', { article, word, color: t(COLORS[article]) }),
      examples: sameArticleExamples(article, (x) => x.category === w.category, word)
    };
  }

  // Sözlükte olmayan kelime için son ek tahmini
  function localGuess(word) {
    const m = suffixMatches(word)[0];
    return m ? { article: m.article, rule: i18n.t('ai_rule_suffix', { suffix: m.suffix, article: m.article, desc: m.desc }) } : null;
  }

  // ── Ortak görünüm parçaları ──
  const root = () => document.getElementById('ai-view');

  function examplesHtml(examples) {
    if (!examples?.length) return '';
    return `<div class="ai-examples"><span class="ai-examples-label">${esc(i18n.t('ai_examples'))}:</span>
      ${examples.map((e) => `<button type="button" class="weak-chip ${esc(e.article)}" onclick="Speech.speak(${jsArg(`${e.article} ${e.word}`)})">${esc(e.article)} ${esc(e.word)}</button>`).join('')}</div>`;
  }

  function tipCardHtml(tip, title) {
    return `<div class="ai-tip-card">
      <div class="ai-tip-title">${esc(title)}</div>
      <div class="ai-tip-rule">${esc(tip.rule)}</div>
      ${tip.mistake_note ? `<div class="ai-tip-note">${esc(tip.mistake_note)}</div>` : ''}
      <div class="ai-tip-trick">💡 ${esc(tip.trick)}</div>
      ${examplesHtml(tip.examples)}
    </div>`;
  }

  function loadingHtml(text) {
    return `<div class="ai-loading"><span class="ai-dots"><i></i><i></i><i></i></span>${esc(text || i18n.t('ai_loading'))}</div>`;
  }

  // ── Menü ──
  function renderMenu() {
    view = 'menu';
    runId++;
    const providers = availableProviders();
    const pref = providerPref();
    const active = activeProvider();
    const activeText = active
      ? `${active.label}${active.source === 'device' ? ` · ${i18n.t('ai_own_key')}` : ''}`
      : '';
    root().innerHTML = `
      <div class="ai-status ${online() ? 'on' : 'off'}">
        ${online() ? esc(i18n.t('ai_status_online', { provider: activeText })) : esc(i18n.t('ai_status_offline'))}
      </div>
      ${providers.length > 1 ? `
        <label class="ai-provider">
          <span>${esc(i18n.t('ai_provider'))}</span>
          <select id="ai-provider-select">
            <option value="auto">${esc(i18n.t('ai_provider_auto'))}</option>
            ${providers.map((p) => `<option value="${esc(p.id)}" ${pref === p.id ? 'selected' : ''}>${esc(p.label)}${p.source === 'device' ? ' 🔑' : ''}</option>`).join('')}
          </select>
        </label>` : ''}
      ${!deviceProviders().length ? `<button type="button" class="ai-key-hint" onclick="App.navigate('profile'); setTimeout(() => document.getElementById('ai-keys')?.scrollIntoView({ block: 'center' }), 300)">🔑 ${esc(i18n.t('ai_keys_hint'))}</button>` : ''}
      <div class="ai-modes">
        ${modeCard('quiz', '🎯', 'ai_quiz_title', 'ai_quiz_desc', false)}
        ${modeCard('lookup', '🔍', 'ai_lookup_title', 'ai_lookup_desc', false)}
        ${modeCard('sentence', '✍️', 'ai_sentence_title', 'ai_sentence_desc', !online())}
      </div>`;
    document.getElementById('ai-provider-select')?.addEventListener('change', (e) => {
      setProviderPref(e.target.value);
      renderMenu();
    });
  }

  function modeCard(id, icon, titleKey, descKey, disabled) {
    return `<button type="button" class="ai-mode-card ${disabled ? 'disabled' : ''}" ${disabled ? 'disabled' : ''} onclick="AICoach.openMode('${id}')">
      <span class="ai-mode-icon">${icon}</span>
      <span class="ai-mode-text">
        <span class="ai-mode-title">${esc(i18n.t(titleKey))}</span>
        <span class="ai-mode-desc">${esc(i18n.t(disabled ? 'ai_needs_online' : descKey))}</span>
      </span>
      <span class="mode-arrow">›</span>
    </button>`;
  }

  function subHeader(titleKey) {
    return `<button type="button" class="back-btn ai-back" onclick="AICoach.back()">${esc(i18n.t('ai_menu_back'))}</button>
      <div class="ai-sub-title">${esc(i18n.t(titleKey))}</div>`;
  }

  // ══════════ 🎯 AI QUIZ ══════════
  const quiz = { questions: [], i: 0, correct: 0, mistakes: [], answered: false };

  function startQuiz() {
    view = 'quiz';
    runId++;
    quiz.questions = SRS.pickQuiz(App.progress, DB.words, 10).map((w) => ({ ...w }));
    quiz.i = 0; quiz.correct = 0; quiz.mistakes = []; quiz.answered = false;
    renderQuestion();
  }

  function renderQuestion() {
    if (quiz.i >= quiz.questions.length) return finishQuiz();
    const q = quiz.questions[quiz.i];
    quiz.answered = false;
    const dots = quiz.questions.map((x, k) =>
      `<div class="quiz-dot ${k < quiz.i ? (x._correct ? 'correct' : 'wrong') : k === quiz.i ? 'current' : ''}"></div>`).join('');
    root().innerHTML = `${subHeader('ai_quiz_title')}
      <div class="quiz-progress">${dots}</div>
      <div class="ai-question">
        <div class="quiz-question-mark">${esc(i18n.t('quiz_question'))}</div>
        <div class="quiz-word-row">
          <div class="quiz-word" id="ai-q-word">${esc(q.word)}</div>
          <button type="button" class="speak-btn" onclick="AICoach.speakCurrent()" aria-label="🔊">🔊</button>
        </div>
        <div class="quiz-translation">${esc(App.getWordTranslation(q, i18n.currentLang))}</div>
      </div>
      <div class="article-buttons">
        ${['der', 'die', 'das'].map((a) => `<button type="button" class="article-btn ${a}" id="ai-btn-${a}" onclick="AICoach.answer('${a}')">${a}</button>`).join('')}
      </div>
      <div id="ai-feedback"></div>`;
  }

  function answer(chosen) {
    if (quiz.answered) return;
    quiz.answered = true;
    const run = runId;
    const q = quiz.questions[quiz.i];
    const ok = chosen === q.article;
    q._correct = ok;
    SRS.record(App.progress, q.id, ok);
    if (Speech.autoEnabled()) Speech.speak(`${q.article} ${q.word}`);
    ['der', 'die', 'das'].forEach((a) => { document.getElementById(`ai-btn-${a}`).disabled = true; });
    document.getElementById(`ai-btn-${chosen}`).classList.add(ok ? 'correct' : 'wrong');
    const tip = localExplain(q);
    const fb = document.getElementById('ai-feedback');

    if (ok) {
      quiz.correct++;
      App.progress.totalCorrect++;
      if (!App.progress.wordsLearned.includes(q.id)) App.progress.wordsLearned.push(q.id);
      App.saveProgress();
      fb.innerHTML = `<div class="ai-correct">✅ ${esc(tip.rule)}</div>`;
      setTimeout(() => { if (run === runId) { quiz.i++; renderQuestion(); } }, 1600);
      return;
    }

    App.progress.totalWrong++;
    App.saveProgress();
    quiz.mistakes.push({ word: q.word, article: q.article, chosen, type: tip.type });
    document.getElementById(`ai-btn-${q.article}`).classList.add('reveal');
    fb.innerHTML = `
      <div class="ai-wrong">❌ ${esc(i18n.t('ai_correct_was', { answer: `${q.article} ${q.word}` }))}</div>
      ${tipCardHtml(tip, i18n.t('ai_tip_title'))}
      <div id="ai-tip-remote">${online() ? loadingHtml() : ''}</div>
      <button type="button" class="btn btn-primary ai-next" onclick="AICoach.nextQuestion()">${esc(i18n.t('ai_continue'))}</button>`;
    // Telefonda açıklama alt menünün arkasında kalmasın
    fb.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (online()) {
      aiCall('/explain', { word: q.word, article: q.article, chosen })
        .then((r) => {
          if (run !== runId) return;
          const box = document.getElementById('ai-tip-remote');
          if (box) box.innerHTML = tipCardHtml(r.result, i18n.t('ai_tip_ai', { provider: providerLabel(r.provider) }));
        })
        .catch(() => {
          if (run !== runId) return;
          const box = document.getElementById('ai-tip-remote');
          if (box) box.innerHTML = `<div class="ai-note">${esc(i18n.t('ai_error'))}</div>`;
        });
    }
  }

  function nextQuestion() {
    runId++;
    quiz.i++;
    renderQuestion();
  }

  function localAnalysis(mistakes) {
    const counts = {};
    mistakes.forEach((m) => { counts[m.type] = (counts[m.type] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return {
      summary: sorted.map(([type, n]) => `${i18n.t(`ai_type_${type}`)}: ${n}`).join(' · '),
      patterns: [],
      advice: sorted.slice(0, 3).map(([type]) => i18n.t(`ai_advice_${type}`))
    };
  }

  function analysisHtml(a, title) {
    return `<div class="ai-tip-card">
      <div class="ai-tip-title">${esc(title)}</div>
      ${a.summary ? `<div class="ai-tip-rule">${esc(a.summary)}</div>` : ''}
      ${a.patterns?.length ? `<ul class="ai-list">${a.patterns.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      ${a.advice?.length ? `<ul class="ai-list advice">${a.advice.map((p) => `<li>👉 ${esc(p)}</li>`).join('')}</ul>` : ''}
    </div>`;
  }

  function finishQuiz() {
    const run = ++runId;
    const total = quiz.questions.length;
    const xp = quiz.correct * 10 + (quiz.correct === total && total >= 10 ? 50 : 0);
    App.progress.gamesPlayed++;
    App.recordPlay();
    if (xp) App.addXP(xp);
    App.checkArticleAchievements();
    if (quiz.correct === total) App.launchConfetti();

    const m = quiz.mistakes;
    root().innerHTML = `${subHeader('ai_quiz_title')}
      <div class="ai-result">
        <div class="ai-result-score">${quiz.correct}/${total}</div>
        <div class="ai-result-xp">+${xp} XP</div>
      </div>
      ${m.length ? `
        <div class="weak-list">${m.map((x) => `<button type="button" class="weak-chip ${esc(x.article)}" onclick="Speech.speak(${jsArg(`${x.article} ${x.word}`)})">${esc(x.article)} ${esc(x.word)} <span class="weak-count">✗ ${esc(x.chosen)}</span></button>`).join('')}</div>
        ${analysisHtml(localAnalysis(m), i18n.t('ai_analysis_title'))}
        <div id="ai-analysis-remote">${online() ? loadingHtml() : ''}</div>`
        : `<div class="ai-correct">${esc(i18n.t('ai_no_mistakes'))}</div>`}
      <div class="ai-actions">
        <button type="button" class="btn btn-primary" onclick="AICoach.openMode('quiz')">${esc(i18n.t('ai_play_again'))}</button>
        <button type="button" class="btn btn-secondary" onclick="AICoach.back()">${esc(i18n.t('ai_menu_back'))}</button>
      </div>`;

    if (m.length && online()) {
      aiCall('/analyze', { mistakes: m.map(({ word, article, chosen }) => ({ word, article, chosen })), total })
        .then((r) => {
          if (run !== runId) return;
          const box = document.getElementById('ai-analysis-remote');
          if (box) box.innerHTML = analysisHtml(r.result, i18n.t('ai_tip_ai', { provider: providerLabel(r.provider) }));
        })
        .catch(() => {
          if (run !== runId) return;
          const box = document.getElementById('ai-analysis-remote');
          if (box) box.innerHTML = `<div class="ai-note">${esc(i18n.t('ai_error'))}</div>`;
        });
    }
  }

  // ══════════ 🔍 ARTİKEL DEDEKTİFİ ══════════
  function recent() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
  }

  function pushRecent(entry) {
    const list = [entry, ...recent().filter((r) => r.word.toLowerCase() !== entry.word.toLowerCase())].slice(0, 10);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch { /* */ }
  }

  function startLookup() {
    view = 'lookup';
    runId++;
    root().innerHTML = `${subHeader('ai_lookup_title')}
      <form class="ai-lookup-form" id="ai-lookup-form" autocomplete="off">
        <input type="text" id="ai-lookup-input" maxlength="40" autocapitalize="words" spellcheck="false"
          placeholder="${esc(i18n.t('ai_lookup_placeholder'))}">
        <button type="submit" class="btn btn-primary">${esc(i18n.t('ai_lookup_btn'))}</button>
      </form>
      <div id="ai-lookup-result"></div>
      <div id="ai-lookup-recent"></div>`;
    document.getElementById('ai-lookup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      lookup(document.getElementById('ai-lookup-input').value);
    });
    renderRecent();
  }

  function renderRecent() {
    const box = document.getElementById('ai-lookup-recent');
    const list = recent();
    if (!box) return;
    box.innerHTML = list.length ? `<div class="ai-examples-label">${esc(i18n.t('ai_lookup_recent'))}</div>
      <div class="weak-list">${list.map((r) => `<button type="button" class="weak-chip ${esc(r.article || '')}" onclick="AICoach.lookup(${jsArg(r.word)})">${esc(r.article || '?')} ${esc(r.word)}</button>`).join('')}</div>` : '';
  }

  function lookupCardHtml(d, sourceLabel) {
    const art = d.article;
    return `<div class="ai-word-card ${esc(art || '')}">
      <div class="ai-source">${esc(sourceLabel)}${d.confidence === 'low' ? ` · ${esc(i18n.t('ai_confidence_low'))}` : ''}</div>
      <div class="ai-word-line">
        <span class="ai-big-article ${esc(art || '')}">${esc(art || '?')}</span>
        <span class="ai-big-word">${esc(d.word)}</span>
        ${art ? `<button type="button" class="speak-btn" onclick="Speech.speak(${jsArg(`${art} ${d.word}`)})" aria-label="🔊">🔊</button>` : ''}
      </div>
      ${d.translation ? `<div class="quiz-translation">${esc(d.translation)}</div>` : ''}
      ${d.plural && d.plural !== '—' ? `<div class="ai-field"><b>${esc(i18n.t('ai_plural'))}:</b> ${esc(d.plural)}</div>` : ''}
      ${d.rule ? `<div class="ai-tip-rule">${esc(d.rule)}</div>` : ''}
      ${d.trick ? `<div class="ai-tip-trick">💡 ${esc(d.trick)}</div>` : ''}
      ${d.example_de ? `<div class="ai-field"><b>${esc(i18n.t('ai_example'))}:</b> ${esc(d.example_de)}
        <button type="button" class="speak-btn small" onclick="Speech.speak(${jsArg(d.example_de)})" aria-label="🔊">🔊</button>
        ${d.example_translation ? `<div class="ai-muted">${esc(d.example_translation)}</div>` : ''}</div>` : ''}
    </div>`;
  }

  function lookup(text) {
    const run = ++runId;
    const word = stripArticle(text);
    const out = document.getElementById('ai-lookup-result');
    if (!out) return;
    const input = document.getElementById('ai-lookup-input');
    if (input) input.value = word;
    if (!WORD_RE.test(word)) {
      out.innerHTML = `<div class="ai-note">${esc(i18n.t('ai_lookup_invalid'))}</div>`;
      return;
    }

    const lw = word.toLowerCase();
    const entry = DB.words.find((w) => w.word.toLowerCase() === lw);
    let localHtml;
    if (entry) {
      const tip = localExplain(entry);
      localHtml = lookupCardHtml({
        word: entry.word, article: entry.article,
        translation: App.getWordTranslation(entry, i18n.currentLang),
        rule: tip.rule, trick: tip.trick
      }, i18n.t('ai_source_db'));
      pushRecent({ word: entry.word, article: entry.article });
    } else {
      const guess = localGuess(word);
      const cap = word.charAt(0).toUpperCase() + word.slice(1);
      localHtml = guess
        ? lookupCardHtml({ word: cap, article: guess.article, rule: guess.rule, trick: i18n.t('ai_lookup_notfound', { article: guess.article }), confidence: 'low' }, i18n.t('ai_source_rules'))
        : `<div class="ai-note">${esc(i18n.t('ai_lookup_unknown'))}</div>`;
    }
    out.innerHTML = localHtml + (online() ? `<div id="ai-lookup-remote">${loadingHtml()}</div>` : '');
    renderRecent();

    if (!online()) return;
    aiCall('/lookup', { word }).then((r) => {
      if (run !== runId) return;
      const d = r.result;
      if (!d.is_noun || !d.article) {
        out.innerHTML = `<div class="ai-note">${esc(i18n.t('ai_lookup_not_noun'))}</div>`;
        return;
      }
      out.innerHTML = lookupCardHtml(d, i18n.t('ai_source_ai', { provider: providerLabel(r.provider) }));
      pushRecent({ word: d.word, article: d.article });
      renderRecent();
    }).catch(() => {
      if (run !== runId) return;
      const box = document.getElementById('ai-lookup-remote');
      if (box) box.innerHTML = `<div class="ai-note">${esc(i18n.t('ai_error'))}</div>`;
    });
  }

  // ══════════ ✍️ CÜMLE USTASI ══════════
  const sent = { items: [], i: 0, correct: 0, answered: false };

  function practiceWords(n = 5) {
    const picked = [...SRS.weakWords(App.progress, DB.words, n)];
    const learned = App.progress.wordsLearned.map((id) => DB.words.find((w) => w.id === id)).filter(Boolean);
    [...learned.sort(() => Math.random() - 0.5), ...[...DB.words].sort(() => Math.random() - 0.5)]
      .forEach((w) => { if (picked.length < n && !picked.includes(w)) picked.push(w); });
    return picked.slice(0, n).map((w) => ({ word: w.word, article: w.article }));
  }

  async function startSentences() {
    view = 'sentence';
    const run = ++runId;
    root().innerHTML = `${subHeader('ai_sentence_title')}${loadingHtml(i18n.t('ai_sentence_loading'))}`;
    try {
      const r = await aiCall('/sentences', { words: practiceWords() });
      if (run !== runId) return;
      sent.items = r.result.items;
      sent.provider = r.provider;
      sent.i = 0; sent.correct = 0;
      renderSentence();
    } catch (e) {
      if (run !== runId) return;
      root().innerHTML = `${subHeader('ai_sentence_title')}<div class="ai-note">${esc(i18n.t('ai_error'))}</div>
        <div class="ai-actions"><button type="button" class="btn btn-primary" onclick="AICoach.openMode('sentence')">${esc(i18n.t('ai_play_again'))}</button></div>`;
    }
  }

  function renderSentence() {
    if (sent.i >= sent.items.length) return finishSentences();
    sent.answered = false;
    const it = sent.items[sent.i];
    const [pre, ...rest] = it.sentence.split('___');
    const dots = sent.items.map((x, k) =>
      `<div class="quiz-dot ${k < sent.i ? (x._correct ? 'correct' : 'wrong') : k === sent.i ? 'current' : ''}"></div>`).join('');
    root().innerHTML = `${subHeader('ai_sentence_title')}
      <div class="quiz-progress">${dots}</div>
      <div class="case-card">
        <div class="ai-case-badge">${esc(i18n.t('ai_sentence_case', { case: it.case }))}</div>
        <div class="case-sentence">${esc(pre)}<span class="case-blank" id="ai-blank">––</span>${esc(rest.join('___'))}</div>
        <div class="case-explanation" id="ai-sent-explain">
          <div class="ai-muted">${esc(it.translation)}</div>
          <div>${esc(it.explanation)}</div>
        </div>
      </div>
      <div class="ai-options">
        ${it.options.map((o) => `<button type="button" class="article-btn" onclick="AICoach.answerSentence(${jsArg(o)}, this)">${esc(o)}</button>`).join('')}
      </div>
      <button type="button" class="btn btn-primary ai-next hidden" id="ai-sent-next" onclick="AICoach.nextSentence()">${esc(i18n.t('ai_continue'))}</button>`;
  }

  function answerSentence(choice, btn) {
    if (sent.answered) return;
    sent.answered = true;
    const it = sent.items[sent.i];
    const ok = choice === it.answer;
    it._correct = ok;
    if (ok) sent.correct++;
    btn.classList.add(ok ? 'correct' : 'wrong');
    document.querySelectorAll('.ai-options .article-btn').forEach((b) => {
      b.disabled = true;
      if (b.textContent.trim() === it.answer) b.classList.add('correct');
    });
    const blank = document.getElementById('ai-blank');
    blank.textContent = it.answer;
    blank.classList.add('revealed');
    document.getElementById('ai-sent-explain').classList.add('show');
    document.getElementById('ai-sent-next').classList.remove('hidden');
    document.getElementById('ai-sent-next').scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (Speech.autoEnabled()) Speech.speak(it.sentence.replace('___', it.answer));
  }

  function nextSentence() {
    sent.i++;
    renderSentence();
  }

  function finishSentences() {
    runId++;
    const total = sent.items.length;
    const xp = sent.correct * 12;
    App.progress.gamesPlayed++;
    App.recordPlay();
    if (xp) App.addXP(xp);
    if (sent.correct === total) App.launchConfetti();
    root().innerHTML = `${subHeader('ai_sentence_title')}
      <div class="ai-result">
        <div class="ai-result-score">${esc(i18n.t('ai_sentence_done', { correct: sent.correct, total }))}</div>
        <div class="ai-result-xp">+${xp} XP</div>
        <div class="ai-muted">${esc(i18n.t('ai_tip_ai', { provider: providerLabel(sent.provider) }))}</div>
      </div>
      <div class="ai-actions">
        <button type="button" class="btn btn-primary" onclick="AICoach.openMode('sentence')">${esc(i18n.t('ai_play_again'))}</button>
        <button type="button" class="btn btn-secondary" onclick="AICoach.back()">${esc(i18n.t('ai_menu_back'))}</button>
      </div>`;
  }

  // ══════════ 🔑 PROFİL: AI ANAHTARLARIM ══════════
  function maskKey(k) {
    return `•••• ${k.slice(-4)}`;
  }

  function openExternal(url) {
    // APK: dış adres sistem tarayıcısında açılır; tarayıcı: yeni sekme
    if (window.Capacitor?.isNativePlatform?.()) window.location.href = url;
    else window.open(url, '_blank', 'noopener');
  }

  function renderKeys() {
    const box = document.getElementById('ai-keys');
    if (!box) return;
    const keys = deviceKeys();
    const saved = deviceProviders();
    const def = activeDefault();
    box.innerHTML = DEVICE_PROVIDERS.map((id) => {
      const k = keys[id];
      const isDefault = k && id === def;
      return `<div class="ai-key-row ${isDefault ? 'is-default' : ''}" data-provider="${id}">
        <div class="ai-key-head">
          <span class="ai-key-name">${esc(LABELS[id])}${isDefault ? ` <span class="ai-key-default">${esc(i18n.t('ai_key_default'))}</span>` : ''}</span>
          <span class="ai-key-state ${k ? 'on' : ''}">${esc(k ? i18n.t('ai_key_saved', { mask: maskKey(k) }) : i18n.t('ai_key_none'))}</span>
        </div>
        <div class="ai-key-actions">
          <button type="button" class="btn btn-secondary" onclick="AICoach.toggleKeyForm('${id}')">${esc(i18n.t(k ? 'ai_key_change' : 'ai_key_add'))}</button>
          ${k ? `<button type="button" class="btn btn-secondary" onclick="AICoach.removeKey('${id}')">${esc(i18n.t('ai_key_remove'))}</button>` : ''}
          ${k && !isDefault && saved.length > 1 ? `<button type="button" class="btn btn-secondary ai-key-make-default" onclick="AICoach.setDefault('${id}')">${esc(i18n.t('ai_key_make_default'))}</button>` : ''}
        </div>
        <form class="ai-key-form hidden" id="ai-key-form-${id}" autocomplete="off" onsubmit="event.preventDefault(); AICoach.saveKey('${id}')">
          <input type="password" id="ai-key-input-${id}" placeholder="${esc(i18n.t('ai_key_placeholder'))}" autocomplete="off" spellcheck="false" maxlength="300">
          <div class="ai-key-form-actions">
            <button type="submit" class="btn btn-primary">${esc(i18n.t('ai_key_test_save'))}</button>
            <button type="button" class="btn btn-secondary" onclick="AICoach.openKeyLink('${id}')">${esc(i18n.t('ai_key_get'))}</button>
          </div>
          <div class="ai-key-msg" id="ai-key-msg-${id}"></div>
        </form>
      </div>`;
    }).join('');
  }

  function toggleKeyForm(id) {
    const form = document.getElementById(`ai-key-form-${id}`);
    if (!form) return;
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) document.getElementById(`ai-key-input-${id}`)?.focus();
  }

  async function saveKey(id) {
    const input = document.getElementById(`ai-key-input-${id}`);
    const msg = document.getElementById(`ai-key-msg-${id}`);
    const key = String(input?.value || '').trim();
    if (!key || !DEVICE_PROVIDERS.includes(id)) return;
    if (navigator.onLine === false) {
      msg.textContent = i18n.t('ai_key_offline');
      return;
    }
    msg.textContent = i18n.t('ai_key_testing');
    const buttons = document.querySelectorAll(`#ai-key-form-${id} button`);
    buttons.forEach((b) => { b.disabled = true; });
    try {
      await runOnDevice('ping', {}, id, key);
      const keys = deviceKeys();
      keys[id] = key;
      writeJson(KEYS_STORE, keys);
      // Henüz bir cihaz anahtarı varsayılan değilse (ilk anahtar / "Otomatik") bu anahtar varsayılan olur
      if (!keys[providerPref()]) setProviderPref(id);
      renderKeys();
      App.showToast(i18n.t('ai_key_ok'), 'success');
    } catch (e) {
      msg.textContent = i18n.t('ai_key_fail', { error: String(e?.message || e).slice(0, 160) });
      buttons.forEach((b) => { b.disabled = false; });
    }
  }

  function removeKey(id) {
    if (!confirm(i18n.t('ai_key_remove_confirm', { provider: LABELS[id] }))) return;
    const keys = deviceKeys();
    delete keys[id];
    writeJson(KEYS_STORE, keys);
    if (providerPref() === id) setProviderPref(deviceProviders()[0] || 'auto');
    renderKeys();
    App.showToast(i18n.t('ai_key_removed'), 'info');
  }

  // Profilde gösterilen varsayılan: seçili sağlayıcının cihaz anahtarı varsa o, yoksa ilk cihaz anahtarı
  function activeDefault() {
    const saved = deviceProviders();
    const pref = providerPref();
    return saved.includes(pref) ? pref : saved[0] || null;
  }

  function setDefault(id) {
    if (!deviceProviders().includes(id)) return;
    setProviderPref(id);
    renderKeys();
    App.showToast(i18n.t('ai_key_default_set', { provider: LABELS[id] }), 'success');
  }

  // ── Dışa açık arayüz ──
  async function open() {
    view = 'menu';
    root().innerHTML = loadingHtml(' ');
    await refreshStatus();
    if (App.currentSection === 'ai' && view === 'menu') renderMenu();
  }

  function openMode(mode) {
    window.scrollTo(0, 0);
    if (mode === 'quiz') return startQuiz();
    if (mode === 'lookup') return startLookup();
    if (mode === 'sentence' && online()) return startSentences();
    return renderMenu();
  }

  function back() {
    if (view === 'menu') return App.navigate('home');
    renderMenu();
    window.scrollTo(0, 0);
  }

  function leave() {
    runId++;
  }

  window.AICoach = {
    open, openMode, back, leave, answer, nextQuestion, lookup, answerSentence, nextSentence,
    renderKeys, toggleKeyForm, saveKey, removeKey, setDefault,
    openKeyLink: (id) => KEY_LINKS[id] && openExternal(KEY_LINKS[id]),
    localExplain, localGuess,
    isInSubView: () => view !== 'menu',
    speakCurrent: () => {
      const q = quiz.questions[quiz.i];
      if (q) Speech.speak(quiz.answered ? `${q.article} ${q.word}` : q.word);
    }
  };
})();
