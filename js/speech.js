// Almanca sesli telaffuz. APK: Android'in yerleşik metin okuma motoru (internetsiz çalışır).
// Tarayıcı: Web Speech API. Almanca ses yoksa düğmeler gizlenir.
(function () {
  const AUTO_KEY = 'artikelmeister_auto_speak';
  const native = window.Capacitor?.isNativePlatform?.() && window.Capacitor.Plugins?.TextToSpeech;
  let available = null; // null = henüz bilinmiyor
  let warned = false;

  async function detect() {
    if (available !== null) return available;
    try {
      if (native) {
        const { supported } = await native.isLanguageSupported({ lang: 'de-DE' });
        available = !!supported;
      } else if ('speechSynthesis' in window) {
        const voices = await new Promise((resolve) => {
          const v = speechSynthesis.getVoices();
          if (v.length) return resolve(v);
          speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
          setTimeout(() => resolve(speechSynthesis.getVoices()), 1500);
        });
        available = voices.some((v) => v.lang?.toLowerCase().startsWith('de'));
      } else {
        available = false;
      }
    } catch {
      available = false;
    }
    document.documentElement.classList.toggle('no-speech', !available);
    return available;
  }

  async function speak(text) {
    if (!text) return;
    if (!(await detect())) {
      if (!warned && typeof App !== 'undefined') {
        warned = true;
        App.showToast(i18n.t('speech_unavailable'), 'info');
      }
      return;
    }
    try {
      if (native) {
        await native.stop().catch(() => {});
        await native.speak({ text, lang: 'de-DE', rate: 0.9, pitch: 1, volume: 1, category: 'ambient' });
      } else {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'de-DE';
        u.rate = 0.9;
        const voice = speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith('de'));
        if (voice) u.voice = voice;
        speechSynthesis.speak(u);
      }
    } catch (e) {
      console.warn('Seslendirme başarısız:', e);
    }
  }

  function autoEnabled() {
    try { return localStorage.getItem(AUTO_KEY) !== '0'; } catch { return true; }
  }

  function setAuto(on) {
    try { localStorage.setItem(AUTO_KEY, on ? '1' : '0'); } catch { /* */ }
  }

  document.addEventListener('DOMContentLoaded', detect);
  window.Speech = { speak, detect, autoEnabled, setAuto, isAvailable: () => available };
})();
