# ArtikelMeister

Almanca **der / die / das** artikellerini oyunlaştırılmış yöntemlerle öğreten web uygulaması.

## Özellikler

- Quiz, hal alıştırmaları ve öğren modu
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

Varsayılan admin: `.env` içindeki `ADMIN_USERNAME` / `ADMIN_PASSWORD` (örnek: `admin` / `admin123`).

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
