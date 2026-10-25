# ArtikelMeister

Almanca **der / die / das** artikellerini oyunlaştırılmış yöntemlerle öğreten web uygulaması.

📖 **Ayrıntılı kullanım kılavuzu:** [KULLANIM_KILAVUZU.md](./KULLANIM_KILAVUZU.md)

## Özellikler

- Quiz, hal alıştırmaları ve öğren modu
- 🤖 AI Koç (Gemini · Claude · MiniMax): AI Quiz + püf noktası, Artikel Dedektifi, Cümle Ustası — internetsizken kural tabanlı ipuçları
- Akıllı tekrar (Leitner): yanlış yapılan kelimeler daha sık sorulur, Profil'de "Zayıf kelimelerim"
- Almanca sesli telaffuz (APK'da Android ses motoru, internetsiz)
- İlerleme yedekleme / geri yükleme (JSON dosyası; telefon değiştirirken)
- Ekran boyutuna göre otomatik ölçek + 4 kademeli yazı boyutu ayarı
- 5 dil desteği (TR, EN, DE, UK, AR)
- Express + SQLite API
- Admin paneli (kelime CRUD, AI kelime ekleme, kategori otomasyonu)
- MiniMax / OpenAI ile AI içerik üretimi

## Hızlı başlangıç (geliştirme)

```bash
cp .env.example .env
# .env dosyasını düzenleyin (JWT_SECRET, admin şifre, isteğe bağlı MINIMAX_API_KEY)

npm install
npm start
```

| Adres | Açıklama |
|-------|----------|
| http://localhost:3000 | Uygulama |
| http://localhost:3000/admin | Yönetim paneli |

Admin: `.env` içindeki `ADMIN_USERNAME` / `ADMIN_PASSWORD`. Production'da (`NODE_ENV=production`) güçlü bir `ADMIN_PASSWORD` (en az 10 karakter) ve en az 32 karakterlik `JWT_SECRET` zorunludur; aksi halde sunucu başlamaz.

## Android uygulaması (APK)

Capacitor 8 ile web uygulaması APK'ya gömülür:

- **Offline:** tüm içerik, fontlar ve ilerleme cihazda; internet olmadan tam çalışır.
- **Online:** `mobile.config.json` içinde `apiUrl` (örn. `https://alanadiniz.com`) verilirse, derleme anındaki güncel içerik APK'ya gömülür. Uygulama da açılışta, internet geri geldiğinde ve uygulamaya dönüldüğünde sunucudan yeni kelimeleri indirip önbelleğe alır.

Gereksinimler: JDK 21, Android SDK (Android Studio ile gelir).

```bash
npm run apk:keystore   # bir kez: release imza anahtarı (android/*.jks + keystore.properties — YEDEKLEYİN)
npm run apk            # imzalı release APK → dist/ArtikelMeister-<sürüm>-release.apk
npm run apk:debug      # test için debug APK
npm run icons          # ikon/splash değiştiyse (scripts/make-icons.js)
```

**Sürümleme otomatik:** her `npm run apk` / `npm run apk:debug` derlemesi `mobile.config.json` içindeki sürümü bir artırır (örn. 2.0.1 → 2.0.2, build 2 → 3). Dosya adı `dist/ArtikelMeister-<sürüm>-b<build>-<tür>.apk` olur, eski APK'lar silinmez ve her derleme `dist/builds.log`'a yazılır. Sürüm uygulamada Profil ekranının altında görünür. Büyük sürüm atlamak için: `ARTIKEL_VERSION=2.1.0 npm run apk`. Derleme başarısız olursa sürüm artmaz.

İmza anahtarı kaybolursa aynı uygulamaya güncelleme yüklenemez.

## Sunucuya deploy

**[DEPLOY.md](./DEPLOY.md)** dosyasındaki adımları izleyin (Ubuntu VPS + Nginx + PM2 + SSL).

## Proje yapısı

```
├── index.html          # Ana uygulama
├── js/                 # Frontend
├── css/
├── data/               # Fallback statik veri
├── admin/              # Yönetim paneli
└── server/             # API, SQLite, AI
```

## Ortam değişkenleri

`.env.example` dosyasına bakın. **`.env` dosyasını asla Git'e eklemeyin.**
