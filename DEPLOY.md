# ArtikelMeister — Sunucu Deploy Kılavuzu

Bu kılavuz **Ubuntu 22.04/24.04 VPS** üzerinde production kurulumu için hazırlanmıştır.

## Gereksinimler

| Bileşen | Minimum |
|---------|---------|
| RAM | 1 GB |
| Disk | 2 GB boş alan |
| Node.js | 18+ (önerilen: 20 LTS) |
| Domain | İsteğe bağlı (SSL için önerilir) |

---

## 1. Sunucuyu hazırlayın

SSH ile bağlanın:

```bash
ssh root@SUNUCU_IP
```

Sistem güncellemesi ve gerekli paketler (`better-sqlite3` için derleme araçları):

```bash
apt update && apt upgrade -y
apt install -y curl git build-essential python3 nginx ufw
```

Node.js 20 LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # v20.x
npm -v
```

PM2 (süreç yöneticisi):

```bash
npm install -g pm2
```

---

## 2. Projeyi klonlayın

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/KULLANICI_ADINIZ/artikelmeister.git
cd artikelmeister
```

> `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

Bağımlılıkları kurun:

```bash
npm ci --omit=dev
```

---

## 3. Ortam değişkenlerini ayarlayın

```bash
cp .env.example .env
nano .env
```

**Production için mutlaka değiştirin:**

```env
PORT=3000
JWT_SECRET=uzun-rastgele-guclu-anahtar-buraya
ADMIN_USERNAME=admin
ADMIN_PASSWORD=guclu-sifre-buraya

AI_PROVIDER=minimax
MINIMAX_API_KEY=sk-...
MINIMAX_MODEL=MiniMax-M3
MINIMAX_BASE_URL=https://api.minimax.io/v1
```

Dosya izinleri:

```bash
chmod 600 .env
```

Veritabanı klasörü (ilk çalıştırmada otomatik oluşur):

```bash
mkdir -p server/data
chown -R www-data:www-data server/data
```

---

## 4. İlk çalıştırma ve test

```bash
npm start
```

Başka bir terminalde:

```bash
curl http://127.0.0.1:3000/api/health
# {"ok":true,"service":"ArtikelMeister API"}
```

Çalışıyorsa `Ctrl+C` ile durdurun, PM2 ile başlatın.

---

## 5. PM2 ile sürekli çalıştırma

Proje kökünde `ecosystem.config.cjs` dosyası vardır.

```bash
cd /var/www/artikelmeister
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
# Çıkan komutu kopyalayıp çalıştırın
```

Yararlı komutlar:

```bash
pm2 status
pm2 logs artikelmeister
pm2 restart artikelmeister
```

---

## 6. Nginx reverse proxy

```bash
nano /etc/nginx/sites-available/artikelmeister
```

Aşağıdaki içeriği yapıştırın (`alanadiniz.com` yerine kendi domaininizi yazın):

```nginx
server {
    listen 80;
    server_name alanadiniz.com www.alanadiniz.com;

    client_max_body_size 4M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
}
```

Etkinleştirin:

```bash
ln -s /etc/nginx/sites-available/artikelmeister /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Domain yoksa `server_name _;` kullanabilir ve `http://SUNUCU_IP` ile erişebilirsiniz.

---

## 7. SSL (Let's Encrypt)

Domain DNS'i sunucuya yönlendirildikten sonra:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d alanadiniz.com -d www.alanadiniz.com
```

Otomatik yenileme testi:

```bash
certbot renew --dry-run
```

---

## 8. Güvenlik duvarı

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

> Port 3000'i dışarıya **açmayın** — sadece Nginx üzerinden erişim yeterli.

---

## 9. Erişim adresleri

| URL | Açıklama |
|-----|----------|
| `https://alanadiniz.com` | Uygulama |
| `https://alanadiniz.com/admin` | Yönetim paneli |
| `https://alanadiniz.com/api/health` | API sağlık kontrolü |

---

## 10. Güncelleme (yeni sürüm çekme)

```bash
cd /var/www/artikelmeister
pm2 stop artikelmeister
git pull origin main
npm ci --omit=dev
pm2 restart artikelmeister
```

---

## 11. Yedekleme

SQLite veritabanı:

```bash
# Günlük yedek örneği
cp /var/www/artikelmeister/server/data/artikelmeister.db \
   /root/backups/artikelmeister-$(date +%F).db
```

`.env` dosyasını da güvenli bir yerde yedekleyin.

---

## Sorun giderme

| Sorun | Çözüm |
|-------|-------|
| `better-sqlite3` kurulum hatası | `apt install build-essential python3` |
| AI tarama 400 hatası | `.env` içinde `MINIMAX_API_KEY` kontrol edin |
| 502 Bad Gateway | `pm2 status` — uygulama çalışıyor mu? |
| Admin giriş olmuyor | `ADMIN_USERNAME` / `ADMIN_PASSWORD` ve JWT_SECRET |
| Veri kayboldu | `server/data/` yedekten geri yükleyin |

Loglar:

```bash
pm2 logs artikelmeister --lines 100
tail -f /var/log/nginx/error.log
```

---

## Windows sunucu (kısa not)

1. [Node.js LTS](https://nodejs.org) kurun
2. Projeyi klonlayın, `npm ci`, `.env` oluşturun
3. `npm start` veya [PM2 Windows](https://pm2.keymetrics.io/) kullanın
4. IIS veya nginx for Windows ile reverse proxy ayarlayın

Production için Linux VPS önerilir.
