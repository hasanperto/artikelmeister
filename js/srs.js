// Akıllı tekrar (Leitner kutuları). Her kelime için profil ilerlemesinde istatistik tutulur:
//   progress.wordStats[id] = { box, due, seen, right, wrong, last }
// Doğru → bir üst kutu (tekrar aralığı uzar); yanlış → kutu 0 (bir sonraki quizde tekrar sorulur).
(function () {
  const DAY = 86400000;
  const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30]; // kutu 0..5
  const MASTERED_BOX = 4;

  function stats(progress) {
    if (!progress.wordStats || typeof progress.wordStats !== 'object') progress.wordStats = {};
    return progress.wordStats;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function record(progress, wordId, correct, now = Date.now()) {
    const all = stats(progress);
    const s = all[wordId] || { box: 0, due: now, seen: 0, right: 0, wrong: 0, last: 0 };
    s.seen++;
    s.last = now;
    if (correct) {
      s.right++;
      s.box = Math.min(INTERVAL_DAYS.length - 1, s.box + 1);
    } else {
      s.wrong++;
      s.box = 0;
    }
    s.due = now + INTERVAL_DAYS[s.box] * DAY;
    all[wordId] = s;

    if (!Array.isArray(progress.wordsMastered)) progress.wordsMastered = [];
    const idx = progress.wordsMastered.indexOf(wordId);
    if (s.box >= MASTERED_BOX && idx === -1) progress.wordsMastered.push(wordId);
    if (s.box < MASTERED_BOX && idx !== -1) progress.wordsMastered.splice(idx, 1);
    return s;
  }

  function dueWords(progress, words, now = Date.now()) {
    const all = stats(progress);
    return words
      .filter((w) => all[w.id] && all[w.id].due <= now)
      .sort((a, b) => all[a.id].box - all[b.id].box || all[a.id].due - all[b.id].due);
  }

  // Quiz seti: önce tekrar zamanı gelenler (en zayıf önce), sonra hiç görülmemiş kelimeler,
  // yetmezse en düşük kutudaki kelimeler. Sıra karıştırılır.
  function pickQuiz(progress, words, count = 10, now = Date.now()) {
    const all = stats(progress);
    const due = dueWords(progress, words, now);
    const fresh = shuffle(words.filter((w) => !all[w.id]));
    const picked = [];
    const take = (list, max) => {
      for (const w of list) {
        if (picked.length >= max) break;
        if (!picked.includes(w)) picked.push(w);
      }
    };
    take(due, Math.min(count, 7));
    take(fresh, count);
    take(due, count);
    const rest = shuffle(words.filter((w) => !picked.includes(w)))
      .sort((a, b) => (all[a.id]?.box ?? 0) - (all[b.id]?.box ?? 0));
    take(rest, count);
    return shuffle(picked);
  }

  // Zayıf kelimeler: yanlış sayısı yüksek ve henüz oturmamış (düşük kutu) olanlar
  function weakWords(progress, words, limit = 10) {
    const all = stats(progress);
    return words
      .filter((w) => all[w.id] && all[w.id].wrong > 0 && all[w.id].box <= 2)
      .map((w) => ({ w, score: all[w.id].wrong * 2 - all[w.id].right + (2 - all[w.id].box) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((x) => x.w);
  }

  function summary(progress, words, now = Date.now()) {
    const all = stats(progress);
    const ids = new Set(words.map((w) => w.id));
    let mastered = 0;
    Object.entries(all).forEach(([id, s]) => {
      if (ids.has(Number(id)) && s.box >= MASTERED_BOX) mastered++;
    });
    return { due: dueWords(progress, words, now).length, mastered, weak: weakWords(progress, words, 999).length };
  }

  window.SRS = { record, pickQuiz, weakWords, dueWords, summary, statsFor: (p, id) => stats(p)[id] || null };
})();
