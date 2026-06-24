// API üzerinden içerik yükler; API yoksa local database.js'e düşer
(function () {
  const API_BASE = window.ARTIKEL_API_BASE || '';

  async function loadFromApi() {
    const res = await fetch(`${API_BASE}/api/bundle`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API yanıt vermedi');
    const data = await res.json();
    const { meta, ...dbData } = data;
    window.DB = dbData;
    window.CONTENT_META = meta || {};
    return true;
  }

  async function loadDailyTipsFromApi() {
    try {
      const res = await fetch(`${API_BASE}/api/daily-tips`, { cache: 'no-store' });
      if (!res.ok) return false;
      const tips = await res.json();
      if (Object.keys(tips).length > 0) {
        window.DAILY_TIPS_API = tips;
        return true;
      }
    } catch { /* fallback */ }
    return false;
  }

  function loadLocalScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function bootstrap() {
    const splash = document.getElementById('splash');
    const login = document.getElementById('login-screen');

    try {
      await loadFromApi();
      await loadDailyTipsFromApi();
      window.CONTENT_SOURCE = 'api';
    } catch (e) {
      console.warn('API kullanılamıyor, yerel veritabanı yükleniyor:', e.message);
      if (!window.DB) await loadLocalScript('data/database.js');
      window.CONTENT_SOURCE = 'local';
    }

    if (typeof App !== 'undefined') {
      App.init();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
