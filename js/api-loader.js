// İçerik yükleyici — offline öncelikli, çevrimiçiyken sunucuyla senkron.
// Sıra: önbellek / gömülü anlık görüntü (hangisi yeniyse) → yoksa API → yoksa data/database.js
// Uygulama yerel içerikle hemen açılır; arka planda yeni sürüm varsa indirilip canlı uygulanır.
(function () {
  const CONFIG = window.ARTIKEL_CONFIG || {};
  const IS_NATIVE = !!window.Capacitor?.isNativePlatform?.();
  // Web'de aynı origin; APK'da derleme sırasında verilen sunucu adresi
  const API_BASE = (IS_NATIVE ? CONFIG.apiUrl || '' : CONFIG.apiUrl ?? '').replace(/\/$/, '');
  const CAN_SYNC = !IS_NATIVE || !!API_BASE;

  const CACHE_KEY = 'artikelmeister_bundle_cache';
  const TIPS_KEY = 'artikelmeister_tips_cache';
  const SYNC_MIN_INTERVAL = 5 * 60 * 1000;
  let lastSyncAt = 0;
  let syncing = false;

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {
      console.warn('İçerik önbelleğe yazılamadı:', e.message);
    }
  }

  async function fetchJson(path, timeoutMs) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(`${API_BASE}${path}`, { cache: 'no-cache', signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function versionOf(bundle) {
    return parseInt(bundle?.meta?.version, 10) || 0;
  }

  function applyBundle(bundle, source) {
    const { meta, ...data } = bundle;
    window.DB = data;
    window.CONTENT_META = meta || {};
    window.CONTENT_SOURCE = source;
  }

  function applyTips(tips) {
    if (tips && Object.keys(tips).length) window.DAILY_TIPS_API = tips;
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

  // Yerelde en yeni içerik: önbellek (önceki senkron) veya APK'ya gömülü anlık görüntü
  function bestLocalBundle() {
    const cached = readJson(CACHE_KEY);
    const snapshot = window.BUNDLE_SNAPSHOT || null;
    if (cached && versionOf(cached) >= versionOf(snapshot)) return { bundle: cached, source: 'cache' };
    if (snapshot) return { bundle: snapshot, source: 'snapshot' };
    return null;
  }

  async function syncFromServer({ force = false } = {}) {
    if (!CAN_SYNC || syncing || navigator.onLine === false) return false;
    if (!force && Date.now() - lastSyncAt < SYNC_MIN_INTERVAL) return false;
    syncing = true;
    lastSyncAt = Date.now();
    try {
      const remote = await fetchJson('/api/version', 8000);
      const localVersion = parseInt(window.CONTENT_META?.version, 10) || 0;
      let updated = false;
      if ((parseInt(remote.version, 10) || 0) > localVersion || window.CONTENT_SOURCE === 'legacy') {
        const bundle = await fetchJson('/api/bundle', 20000);
        writeJson(CACHE_KEY, bundle);
        applyBundle(bundle, 'api');
        updated = true;
      }
      try {
        const tips = await fetchJson('/api/daily-tips', 8000);
        writeJson(TIPS_KEY, tips);
        applyTips(tips);
      } catch { /* ipuçları opsiyonel */ }
      if (updated && typeof App !== 'undefined' && App.onContentUpdated) App.onContentUpdated();
      return updated;
    } catch (e) {
      console.info('Sunucuyla senkron yapılamadı (çevrimdışı olabilir):', e.message);
      return false;
    } finally {
      syncing = false;
    }
  }

  async function bootstrap() {
    applyTips(readJson(TIPS_KEY));
    const local = bestLocalBundle();

    if (local) {
      applyBundle(local.bundle, local.source);
    } else {
      // İlk açılış ve yerel içerik yok: önce sunucuyu dene, olmazsa eski statik veri
      try {
        if (!CAN_SYNC) throw new Error('senkron kapalı');
        const bundle = await fetchJson('/api/bundle', 6000);
        writeJson(CACHE_KEY, bundle);
        applyBundle(bundle, 'api');
        lastSyncAt = Date.now();
      } catch (e) {
        console.warn('API kullanılamıyor, yerel veritabanı yükleniyor:', e.message);
        if (!window.DB) await loadLocalScript('data/database.js');
        window.CONTENT_META = { version: 0 };
        window.CONTENT_SOURCE = 'legacy';
      }
    }

    if (typeof App !== 'undefined') App.init();

    // Arka plan senkronu: açılışta, internet geri gelince ve uygulamaya dönülünce
    syncFromServer({ force: true });
    window.addEventListener('online', () => syncFromServer({ force: true }));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') syncFromServer();
    });
  }

  window.ContentSync = { sync: syncFromServer, isNative: IS_NATIVE, apiBase: API_BASE };
  document.addEventListener('DOMContentLoaded', bootstrap);
})();
