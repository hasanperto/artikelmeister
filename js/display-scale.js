// Arayüz ölçeği = ekran genişliği × kullanıcı yazı boyutu tercihi × (APK'da) sistem yazı boyutu.
// Tasarım 375px genişliğe göre sabit piksellerle yazıldığından tüm arayüz CSS zoom ile orantılı büyütülür;
// böylece yazı, ikon, boşluk ve butonlar birlikte ölçeklenir, düzen bozulmaz.
// <head> içinde, sayfa çizilmeden önce yüklenir (kaydedilmiş tercih ilk karede uygulanır).
(function () {
  const STORAGE_KEY = 'artikelmeister_text_size';
  const DESIGN_WIDTH = 375;
  const MIN_LAYOUT_WIDTH = 300; // ölçek ne olursa olsun düzen en az bu kadar CSS px genişlikte kalır
  const LEVELS = { small: 0.9, normal: 1, large: 1.15, xlarge: 1.3 };

  let systemScale = 1;

  function getLevel() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return LEVELS[v] ? v : 'normal';
    } catch { return 'normal'; }
  }

  // 360–375px telefonlarda 1, büyüdükçe artar; tablette en fazla 1.25
  function autoScale(width) {
    return Math.min(1.25, Math.max(1, width / DESIGN_WIDTH));
  }

  function compute() {
    const width = window.innerWidth || document.documentElement.clientWidth || DESIGN_WIDTH;
    const raw = autoScale(width) * LEVELS[getLevel()] * systemScale;
    const max = width / MIN_LAYOUT_WIDTH;
    return Math.round(Math.min(max, Math.max(0.85, raw)) * 1000) / 1000;
  }

  function apply() {
    const scale = compute();
    const root = document.documentElement;
    root.style.zoom = scale;
    root.style.setProperty('--ui-scale', scale);
    root.dataset.textSize = getLevel();
    return scale;
  }

  function set(level) {
    if (!LEVELS[level]) return;
    try { localStorage.setItem(STORAGE_KEY, level); } catch { /* tercih kaydedilemezse oturum boyunca geçerli */ }
    apply();
    window.dispatchEvent(new CustomEvent('textsizechange', { detail: { level } }));
  }

  // APK: Android'in sistem yazı boyutu ayarını oku. WebView'in kendi metin yakınlaştırmasını 1'e çekeriz
  // ki ölçek iki kez uygulanmasın (yalnızca yazıyı büyütmek düzeni bozar; bunun yerine tüm arayüzü ölçekleriz).
  async function readSystemScale() {
    const TextZoom = window.Capacitor?.isNativePlatform?.() && window.Capacitor.Plugins?.TextZoom;
    if (!TextZoom) return;
    try {
      const { value } = await TextZoom.getPreferred();
      systemScale = Math.min(1.3, Math.max(0.9, Number(value) || 1));
      const current = await TextZoom.get();
      if (current.value !== 1) await TextZoom.set({ value: 1 });
      apply();
    } catch (e) {
      console.warn('Sistem yazı boyutu okunamadı:', e);
    }
  }

  apply();
  window.addEventListener('resize', apply);
  document.addEventListener('DOMContentLoaded', readSystemScale);
  document.addEventListener('visibilitychange', () => {
    // Kullanıcı sistem yazı boyutunu değiştirip uygulamaya dönmüş olabilir
    if (document.visibilityState === 'visible') readSystemScale();
  });

  window.DisplayScale = { LEVELS, getLevel, set, apply, compute };
})();
