// Ayrıntılı istatistik ve kademeli başarılar (bronz/gümüş/altın).
// Profil ilerlemesinde tutulur:
//   progress.stats = { days: { 'YYYY-MM-DD': { a, c, x, s } }, article: { der: {c,w}, ... },
//                      modes: { quiz, speed, cases, ai }, perfect, studySec, night, morning,
//                      bestStreakDays, activeDays, goalDays }
//   progress.badgeTiers = { <rozet id>: 0..3 }
(function () {
  const KEEP_DAYS = 400;
  const TIER_XP = [0, 25, 75, 200];
  const TIER_ICONS = ['', '🥉', '🥈', '🥇'];
  const HEARTBEAT_SEC = 20;
  const IDLE_MS = 60000;
  const STUDY_SECTIONS = ['learn', 'quiz', 'speed', 'rules', 'cases', 'ai'];

  // value(p): rozetin ölçtüğü sayı; tiers: bronz/gümüş/altın eşikleri
  const BADGES = [
    { id: 'correct', icon: '🎯', tiers: [100, 1000, 5000], value: (p) => p.totalCorrect },
    { id: 'games', icon: '🎮', tiers: [10, 50, 250], value: (p) => p.gamesPlayed },
    { id: 'words', icon: '📚', tiers: [25, 100, 200], value: (p) => p.wordsLearned.length },
    { id: 'mastered', icon: '🧠', tiers: [10, 50, 150], value: (p) => (p.wordsMastered || []).length },
    { id: 'streak', icon: '🔥', tiers: [3, 7, 30], value: (p) => p.stats.bestStreakDays },
    { id: 'days', icon: '📅', tiers: [7, 30, 100], value: (p) => p.stats.activeDays },
    { id: 'goal', icon: '🏁', tiers: [3, 15, 50], value: (p) => p.stats.goalDays },
    { id: 'der', icon: '🔵', tiers: [50, 250, 1000], value: (p) => p.stats.article.der.c },
    { id: 'die', icon: '🔴', tiers: [50, 250, 1000], value: (p) => p.stats.article.die.c },
    { id: 'das', icon: '🟢', tiers: [50, 250, 1000], value: (p) => p.stats.article.das.c },
    { id: 'speed', icon: '⚡', tiers: [10, 20, 30], value: (p) => p.bestSpeed },
    { id: 'combo', icon: '💥', tiers: [10, 25, 50], value: (p) => p.bestStreak },
    { id: 'perfect', icon: '💯', tiers: [1, 10, 50], value: (p) => p.stats.perfect },
    { id: 'time', icon: '⏱️', tiers: [30, 300, 1000], value: (p) => Math.floor(p.stats.studySec / 60) },
    { id: 'cases', icon: '🧩', tiers: [5, 25, 100], value: (p) => p.stats.modes.cases },
    { id: 'ai', icon: '🤖', tiers: [3, 15, 50], value: (p) => p.stats.modes.ai },
    { id: 'night', icon: '🦉', tiers: [1, 10, 30], value: (p) => p.stats.night },
    { id: 'morning', icon: '🐦', tiers: [1, 10, 30], value: (p) => p.stats.morning },
    { id: 'xp', icon: '✨', tiers: [1000, 5000, 15000], value: (p) => p.xp }
  ];

  function dayKey(d = new Date()) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function num(v) { return Number.isFinite(v) ? v : 0; }

  // Eski profillerde ve yedekten gelen verilerde eksik alanları tamamla
  function ensure(p) {
    const s = p.stats && typeof p.stats === 'object' ? p.stats : {};
    s.days = s.days && typeof s.days === 'object' ? s.days : {};
    Object.keys(s.days).forEach((k) => {
      const d = s.days[k];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || !d || typeof d !== 'object') { delete s.days[k]; return; }
      s.days[k] = { a: num(d.a), c: num(d.c), x: num(d.x), s: num(d.s) };
    });
    s.article = s.article && typeof s.article === 'object' ? s.article : {};
    ['der', 'die', 'das'].forEach((a) => {
      const x = s.article[a] || {};
      s.article[a] = { c: num(x.c), w: num(x.w) };
    });
    s.modes = s.modes && typeof s.modes === 'object' ? s.modes : {};
    ['quiz', 'speed', 'cases', 'ai'].forEach((m) => { s.modes[m] = num(s.modes[m]); });
    ['perfect', 'studySec', 'night', 'morning', 'bestStreakDays', 'activeDays', 'goalDays'].forEach((k) => { s[k] = num(s[k]); });
    s.bestStreakDays = Math.max(s.bestStreakDays, num(p.streakDays));
    p.stats = s;
    if (!p.badgeTiers || typeof p.badgeTiers !== 'object') p.badgeTiers = {};
    return s;
  }

  function today(p) {
    const s = ensure(p);
    const k = dayKey();
    if (!s.days[k]) {
      s.days[k] = { a: 0, c: 0, x: 0, s: 0 };
      const keys = Object.keys(s.days).sort();
      keys.slice(0, Math.max(0, keys.length - KEEP_DAYS)).forEach((old) => delete s.days[old]);
    }
    return s.days[k];
  }

  // article: 'der' | 'die' | 'das' | null (artikel dışı sorular, ör. ismin halleri)
  function answer(p, article, correct, goal) {
    const s = ensure(p);
    const d = today(p);
    if (d.a === 0) s.activeDays++;
    d.a++;
    if (correct) d.c++;
    if (goal && d.a === goal) s.goalDays++;
    if (s.article[article]) s.article[article][correct ? 'c' : 'w']++;
  }

  function addXP(p, amount) { today(p).x += amount; }

  function game(p, mode, correct, total) {
    const s = ensure(p);
    if (s.modes[mode] !== undefined) s.modes[mode]++;
    if (total >= 5 && correct === total) s.perfect++;
    const h = new Date().getHours();
    if (h >= 22 || h < 5) s.night++;
    else if (h >= 5 && h < 9) s.morning++;
  }

  function streak(p) {
    const s = ensure(p);
    s.bestStreakDays = Math.max(s.bestStreakDays, num(p.streakDays));
  }

  function tierOf(badge, value) {
    let t = 0;
    badge.tiers.forEach((th, i) => { if (value >= th) t = i + 1; });
    return t;
  }

  // Yeni kazanılan kademeleri işaretler, [{ badge, tier, xp }] döndürür
  function evaluate(p) {
    ensure(p);
    const gained = [];
    BADGES.forEach((b) => {
      const have = p.badgeTiers[b.id] || 0;
      const now = tierOf(b, num(b.value(p)));
      for (let t = have + 1; t <= now; t++) gained.push({ badge: b, tier: t, xp: TIER_XP[t] });
      if (now > have) p.badgeTiers[b.id] = now;
    });
    return gained;
  }

  function badgeState(p, b) {
    const value = num(b.value(p));
    const tier = p.badgeTiers?.[b.id] || 0;
    const next = b.tiers[tier] ?? null;
    const prev = tier > 0 ? b.tiers[tier - 1] : 0;
    const pct = next === null ? 100 : Math.max(0, Math.min(100, ((value - prev) / (next - prev)) * 100));
    return { value, tier, next, pct };
  }

  // Son n günün dizisi (en eskiden bugüne)
  function lastDays(p, n) {
    const s = ensure(p);
    const out = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    for (let i = n - 1; i >= 0; i--) {
      const day = new Date(d.getTime() - i * 86400000);
      const v = s.days[dayKey(day)] || { a: 0, c: 0, x: 0, s: 0 };
      out.push({ date: day, ...v });
    }
    return out;
  }

  // Çalışma süresi: uygulama görünürken, çalışma ekranlarında ve son 1 dakikada etkileşim varsa sayılır
  let lastInput = 0;
  let ticks = 0;
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) =>
    window.addEventListener(ev, () => { lastInput = Date.now(); }, { passive: true, capture: true }));

  setInterval(() => {
    const App = window.App;
    if (!App?.progress || document.visibilityState !== 'visible') return;
    if (!STUDY_SECTIONS.includes(App.currentSection) || Date.now() - lastInput > IDLE_MS) return;
    ensure(App.progress).studySec += HEARTBEAT_SEC;
    today(App.progress).s += HEARTBEAT_SEC;
    if (++ticks % 3 === 0) {
      App.saveProgress();
      App.checkBadges();
    }
  }, HEARTBEAT_SEC * 1000);

  window.Stats = { BADGES, TIER_ICONS, ensure, today, answer, addXP, game, streak, evaluate, badgeState, lastDays, dayKey };
})();
