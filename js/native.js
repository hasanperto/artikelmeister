// Android (Capacitor) entegrasyonu: geri tuşu, durum çubuğu, splash.
// Tarayıcıda hiçbir şey yapmaz.
(function () {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return;

  const { App: CapApp, StatusBar, SplashScreen } = cap.Plugins || {};
  document.documentElement.classList.add('native-app');

  function isVisible(id) {
    const el = document.getElementById(id);
    return !!el && !el.classList.contains('hidden') && el.style.display !== 'none';
  }

  let lastBackPress = 0;

  // Geri tuşu: açık pencereyi kapat → alt ekrandan geri dön → ana sayfaya dön → iki kez basınca çık
  function handleBack() {
    if (isVisible('lang-modal')) return App.lang.closeModal();
    if (isVisible('avatar-modal')) return App.profiles.closeModal();
    if (isVisible('results')) return document.getElementById('results-continue').click();

    const login = document.getElementById('login-screen');
    if (login && !login.classList.contains('hidden')) {
      // Profil seçiliyse giriş ekranını kapatıp uygulamaya dön
      if (App.currentProfile) { login.classList.add('hidden'); return; }
      return CapApp.exitApp();
    }

    const section = App.currentSection;
    if (section === 'learn' && isVisible('learn-examples-area')) return App.learn.backFromExamples();
    if (section === 'cases' && !isVisible('cases-intro')) return App.cases.showIntro();
    if (section === 'quiz') return App.quiz.quit();
    if (section === 'speed') return App.speed.quit();
    if (section === 'ai') return AICoach.back();
    if (section !== 'home') return App.navigate('home');

    if (Date.now() - lastBackPress < 2000) return CapApp.exitApp();
    lastBackPress = Date.now();
    App.showToast(i18n.t('press_back_exit'), 'info');
  }

  document.addEventListener('DOMContentLoaded', () => {
    CapApp?.addListener('backButton', () => {
      try { handleBack(); } catch (e) { console.error('backButton', e); }
    });
    // Uygulamaya dönüldüğünde içerik senkronu (5 dk sınırıyla)
    CapApp?.addListener('resume', () => window.ContentSync?.sync());

    StatusBar?.setStyle({ style: 'DARK' }).catch(() => {});
    StatusBar?.setBackgroundColor({ color: '#0a0a1a' }).catch(() => {});
  });

  // Web arayüzü çizildikten sonra yerel splash'i kapat
  window.addEventListener('load', () => {
    setTimeout(() => SplashScreen?.hide({ fadeOutDuration: 250 }).catch(() => {}), 150);
  });
})();
