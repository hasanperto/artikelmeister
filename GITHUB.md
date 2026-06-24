# GitHub'a Yükleme

Proje commit edildi. GitHub'a push için:

## 1. GitHub'da repo oluşturun

1. https://github.com/new adresine gidin
2. Repository name: `artikelmeister`
3. **README, .gitignore, license eklemeyin** (zaten var)
4. Create repository

## 2. Push komutları

Proje klasöründe (`d:\Yedeklerim\Test\german`):

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/artikelmeister.git
git branch -M main
git push -u origin main
```

`KULLANICI_ADINIZ` yerine GitHub kullanıcı adınızı yazın.

## SSH kullanıyorsanız

```bash
git remote add origin git@github.com:KULLANICI_ADINIZ/artikelmeister.git
git push -u origin main
```

## Önemli

- `.env` dosyası **Git'e eklenmez** (API anahtarları güvende)
- `server/data/*.db` veritabanı **Git'e eklenmez** — sunucuda ilk `npm start` ile oluşur

## Sonraki adım

Sunucu kurulumu için **[DEPLOY.md](./DEPLOY.md)** dosyasını okuyun.
