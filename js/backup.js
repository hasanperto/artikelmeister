// İlerleme yedekleme / geri yükleme (tüm profiller + tercihler tek JSON dosyası).
// APK: dosya önbelleğe yazılır ve Android paylaşım menüsü açılır (Drive, Dosyalar, WhatsApp...).
// Tarayıcı: dosya indirilir. Geri yükleme her ikisinde de dosya seçiciyle yapılır.
(function () {
  const KIND = 'artikelmeister-backup';
  const SCHEMA = 1;
  const PREF_KEYS = ['artikelmeister_lang', 'artikelmeister_text_size', 'artikelmeister_auto_speak'];

  function buildBackup() {
    const prefs = {};
    PREF_KEYS.forEach((k) => {
      try { const v = localStorage.getItem(k); if (v !== null) prefs[k] = v; } catch { /* */ }
    });
    return {
      kind: KIND,
      schema: SCHEMA,
      exportedAt: new Date().toISOString(),
      appVersion: window.ARTIKEL_CONFIG?.version || null,
      profiles: App.profiles.data,
      lastProfile: App.currentProfile,
      prefs
    };
  }

  function fileName() {
    return `artikelmeister-yedek-${new Date().toISOString().slice(0, 10)}.json`;
  }

  async function exportBackup() {
    const json = JSON.stringify(buildBackup(), null, 2);
    const name = fileName();
    const cap = window.Capacitor;
    try {
      if (cap?.isNativePlatform?.()) {
        const { Filesystem, Share } = cap.Plugins;
        const { uri } = await Filesystem.writeFile({ path: name, data: json, directory: 'CACHE', encoding: 'utf8' });
        await Share.share({ title: 'ArtikelMeister', text: name, files: [uri], dialogTitle: i18n.t('backup_export') });
      } else {
        const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
        const a = Object.assign(document.createElement('a'), { href: url, download: name });
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
      App.showToast(i18n.t('backup_done'), 'success');
    } catch (e) {
      // Kullanıcı paylaşım menüsünü kapattıysa hata sayılmaz
      if (!/cancel/i.test(e?.message || '')) {
        console.error('Yedek alınamadı:', e);
        App.showToast('⚠️ ' + (e?.message || e), 'error');
      }
    }
  }

  // Yedekteki ilerlemeyi güvenli biçime getir: eksik alanlar varsayılanla tamamlanır, tipler denetlenir
  function normalizeProfile(p) {
    if (!p || typeof p !== 'object' || typeof p.name !== 'string' || !p.progress || typeof p.progress !== 'object') {
      return null;
    }
    const def = App.getDefaultProgress();
    const progress = { ...def };
    Object.keys(def).forEach((k) => {
      const v = p.progress[k];
      if (Array.isArray(def[k])) progress[k] = Array.isArray(v) ? v : def[k];
      else if (typeof def[k] === 'number') progress[k] = Number.isFinite(v) ? v : def[k];
      else if (v !== undefined) progress[k] = v;
    });
    if (p.progress.wordStats && typeof p.progress.wordStats === 'object') progress.wordStats = p.progress.wordStats;
    return {
      name: p.name.slice(0, 40),
      avatar: typeof p.avatar === 'string' ? p.avatar.slice(0, 16) : '🧑‍🎓',
      createdAt: p.createdAt || new Date().toISOString(),
      progress
    };
  }

  async function importFile(file) {
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch {
      return App.showToast(i18n.t('backup_invalid'), 'error');
    }
    if (data?.kind !== KIND || !data.profiles || typeof data.profiles !== 'object') {
      return App.showToast(i18n.t('backup_invalid'), 'error');
    }
    const entries = Object.entries(data.profiles)
      .filter(([id]) => /^p_\d+$/.test(id))
      .map(([id, p]) => [id, normalizeProfile(p)])
      .filter(([, p]) => p);
    if (!entries.length) return App.showToast(i18n.t('backup_invalid'), 'error');
    if (!confirm(i18n.t('backup_import_confirm', { n: entries.length }))) return;

    entries.forEach(([id, p]) => { App.profiles.data[id] = p; });
    App.profiles.saveAll();
    Object.entries(data.prefs || {}).forEach(([k, v]) => {
      if (PREF_KEYS.includes(k) && typeof v === 'string') {
        try { localStorage.setItem(k, v); } catch { /* */ }
      }
    });

    const target = data.lastProfile && App.profiles.data[data.lastProfile] ? data.lastProfile : entries[0][0];
    App.showToast(i18n.t('backup_import_done', { n: entries.length }), 'success');
    // Tercihler (dil, yazı boyutu) ve seçili profil temiz bir açılışla uygulanır
    try { localStorage.setItem('artikelmeister_lastProfile', target); } catch { /* */ }
    setTimeout(() => location.reload(), 900);
  }

  function pickAndImport() {
    const input = Object.assign(document.createElement('input'), { type: 'file', accept: '.json,application/json' });
    input.addEventListener('change', () => { if (input.files?.[0]) importFile(input.files[0]); });
    input.click();
  }

  window.Backup = { exportBackup, pickAndImport, importFile, buildBackup };
})();
