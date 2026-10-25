# ArtikelMeister — Kullanım Kılavuzu

> Sürüm **2.0.6** (build 7) · Android uygulaması + web sürümü + yönetim paneli

ArtikelMeister, Almancadaki **der / die / das** artikellerini oyunlaştırılmış yöntemlerle öğreten bir uygulamadır. Kurallar, quizler, hız turu, ismin halleri alıştırmaları, akıllı tekrar sistemi, sesli telaffuz ve **Gemini · Claude · MiniMax destekli AI Koç** içerir. İnternet olmadan da tam çalışır.

---

## İçindekiler

**Kullanıcılar için**
1. [Kurulum](#1-kurulum)
2. [İlk açılış: profil ve dil](#2-ilk-açılış-profil-ve-dil)
3. [Ana sayfa](#3-ana-sayfa)
4. [Öğrenme modları](#4-öğrenme-modları) · [🤖 AI Koç](#-ai-koç)
5. [Profil ekranı ve ayarlar](#5-profil-ekranı-ve-ayarlar)
6. [Puanlama: XP, kombo, seviye, seri](#6-puanlama-xp-kombo-seviye-seri)
7. [Başarılar](#7-başarılar)
8. [Akıllı tekrar sistemi](#8-akıllı-tekrar-sistemi)
9. [Sesli telaffuz](#9-sesli-telaffuz)
10. [Yedekleme ve geri yükleme](#10-yedekleme-ve-geri-yükleme)
11. [Yazı boyutu ve ekran uyumu](#11-yazı-boyutu-ve-ekran-uyumu)
12. [Çevrimdışı ve çevrimiçi çalışma](#12-çevrimdışı-ve-çevrimiçi-çalışma)
13. [Android'e özel davranışlar](#13-androide-özel-davranışlar)

**Yöneticiler ve geliştiriciler için**

14. [Yönetim paneli](#14-yönetim-paneli)
15. [Sunucu kurulumu ve güvenlik](#15-sunucu-kurulumu-ve-güvenlik)
16. [APK derleme ve sürümleme](#16-apk-derleme-ve-sürümleme)
17. [Teknik yapı](#17-teknik-yapı)

**Ek**

18. [Sık sorulan sorular ve sorun giderme](#18-sık-sorulan-sorular-ve-sorun-giderme)
19. [Bilinen sınırlamalar](#19-bilinen-sınırlamalar)

---

## 1. Kurulum

### Android (APK)

| Gereksinim | Değer |
|---|---|
| Android sürümü | 7.0 ve üzeri |
| Boyut | yaklaşık 3.8 MB |
| İzinler | Yalnızca **İnternet** (içerik güncellemesi için; offline kullanımda gerekmez) |
| Ekran yönü | Dikey |

**Yükleme adımları:**
1. `ArtikelMeister-<sürüm>-b<build>-release.apk` dosyasını telefona aktarın (USB, Drive, WhatsApp vb.).
2. Dosyaya dokunun. Android "bilinmeyen kaynaktan yükleme" izni isterse, dosyayı açtığınız uygulama (Dosyalar, Chrome vb.) için **izin verin**.
3. **Yükle**'ye dokunun.

**Güncelleme:** Daha yüksek sürümlü yeni APK'yı aynı şekilde yükleyin. Eskisinin üzerine kurulur ve **ilerlemeniz korunur**. Uygulamayı önce kaldırmayın; kaldırırsanız ilerleme silinir. Önlem olarak önce [yedek alın](#10-yedekleme-ve-geri-yükleme).

### Web sürümü

Sunucu kuruluysa tarayıcıdan `https://alanadiniz.com` adresiyle açılır. Telefon ve bilgisayar tarayıcılarında çalışır.

---

## 2. İlk açılış: profil ve dil

### Dil seçimi
Giriş ekranının üstündeki bayraklardan arayüz dilini seçin:

| Bayrak | Dil |
|---|---|
| 🇹🇷 | Türkçe |
| 🇬🇧 | English |
| 🇩🇪 | Deutsch |
| 🇺🇦 | Українська |
| 🇸🇦 | العربية (sağdan sola düzen) |

Dil, uygulama içinde daha sonra üst bardaki bayrak düğmesinden değiştirilebilir. Kelime çevirileri de seçilen dilde gösterilir.

### Profil oluşturma
- **➕ Yeni Profil**'e dokunun, bir **avatar** (20 seçenek) ve **isim** seçin, **✨ Oluştur**'a basın.
- Aynı cihazda en fazla **4 profil** oluşturulabilir. Her profilin XP'si, seviyesi, başarıları ve tekrar verisi ayrı tutulur. Aile üyeleri aynı telefonu paylaşabilir.
- Bir profili silmek için giriş ekranında profilin yanındaki **✕**'e dokunun.
- Uygulama son kullanılan profille açılır.

---

## 3. Ana sayfa

### Üst bar
| Öğe | Anlamı |
|---|---|
| 🇩🇪 ArtikelMeister | Uygulama adı (dar ekranlarda gizlenir) |
| Bayrak düğmesi | Dil seçimi |
| 🔥 sayı | Günlük seri (üst üste çalışılan gün sayısı) |
| ⭐ sayı | Toplam XP |
| Avatar | Profil ekranına gider |

### Kartlar
- **Karşılama:** Saate göre selamlama ve motivasyon mesajı.
- **💡 Günün İpucu:** Her gün yeni bir artikel ipucu. **Karta dokunursanız** başka bir ipucu gösterilir.
- **Seviye çubuğu:** Mevcut seviye ve bir sonraki seviyeye kalan XP.
- **İstatistikler:** Öğrenilen kelime sayısı, doğruluk oranı, oynanan oyun sayısı, en iyi seri (art arda en çok doğru cevap; 🔥 günlük seriden farklıdır).
- **Modlar:** 🤖 AI Koç, Öğren, Quiz, Hız, Kurallar, Değişim Macerası. Quiz kartında tekrar zamanı gelen kelime varsa **🔁 N tekrar** rozeti görünür.

### Alt menü
🏠 Ana Sayfa · 📚 Öğren · 🎯 Quiz · ⚡ Hız · 👤 Profil

---

## 4. Öğrenme modları

### 📚 Öğren (Öğrenme Kartları)
Kuralları keşfetme bölümüdür.
- **Sekmeler:** 🔵 DER · 🔴 DIE · 🟢 DAS · 💡 Tüyolar
- Her artikel için iki alt bölüm vardır:
  - **📂 Kategori İpuçları:** Örneğin "günler, aylar, mevsimler → der". Kartın sağ üstündeki **%** değeri kuralın ne kadar güvenilir olduğunu gösterir.
  - **📝 Son Ek Kuralları:** Örneğin "-ung → die", "-chen → das".
- Bir karta dokunduğunuzda o kurala uyan **örnek kelimeler** listelenir. Her örnekte **🔊** düğmesiyle kelimeyi dinleyebilirsiniz.
- **💡 Tüyolar** sekmesi genel öğrenme ipuçlarını içerir.

### 🎯 Quiz
Her turda **10 soru** sorulur. Gösterilen Almanca kelimenin artikelini seçersiniz.
- Kelimenin altında seçili dildeki çevirisi ve kategorisi görünür.
- **🔊** düğmesi: cevaptan **önce** yalnızca kelimeyi okur (artikeli ele vermez), cevaptan **sonra** artikeliyle birlikte okur.
- **💡 İpucu göster:** Kelime bir son ek kuralına uyuyorsa ya da istisnaysa görünür.
- Doğru cevap yeşil, yanlış cevap kırmızı gösterilir ve doğru artikel vurgulanır.
- Sorular **akıllı tekrar sistemine** göre seçilir ([bölüm 8](#8-akıllı-tekrar-sistemi)).
- Tur sonunda doğru/yanlış sayısı, doğruluk yüzdesi ve kazanılan XP gösterilir. **🔄 Tekrar Dene** ile yeni tura başlanır.

### ⚡ Hız Turu
- **60 saniyede** olabildiğince çok kelimenin artikelini bilmeye çalışırsınız.
- Her doğru cevap **+1 puan** getirir. Her yanlış cevap **2 saniye** süre kaybettirir.
- Son 20 saniyede süre sarı, son 10 saniyede kırmızı olur.
- Hız turundaki cevaplar da akıllı tekrar sistemine işlenir.

### 📖 Kurallar (Kural Rehberi)
Tüm kuralların topluca listelendiği başvuru ekranıdır.
- **DER / DIE / DAS** sekmeleri: son ek kuralları (örnekleriyle) ve kategori kuralları.
- **⚠️ İstisnalar** sekmesi: genel kurallara uymayan kelimeler ve açıklamaları (örneğin *das Mädchen*).

### 🔄 Değişim Macerası (İsmin Halleri)
Artikellerin **Nominativ, Akkusativ, Dativ ve Genitiv** hallerinde nasıl değiştiğini öğretir.
- **📖 Kılavuz:** Hal tablosu ve açıklamalar. Her hal için örnek cümleler görülebilir.
- **Pratiğe Başla 🎮:** Bir cümlede boş bırakılan artikeli seçersiniz. Seçenekler *der, die, das, den, dem, des* arasından gelir.
- Cevaptan sonra **açıklama** gösterilir. **💡 İpucu** kelimenin temel artikelini hatırlatır.
- **Sonraki Örnek ➔** ile ilerlenir.

### 🤖 AI Koç
Yapay zekâ destekli kişisel öğretmen. Ana sayfadaki en üstteki **🤖 AI Koç** kartından açılır.

**AI'a nasıl bağlanır?** (öncelik sırasıyla)
1. **🔑 Kendi anahtarın** (Profil → AI anahtarlarım): İstekler doğrudan bu telefondan Gemini, Claude ya da MiniMax'e gider. **Sunucu gerekmez.**
2. **Sunucu:** Uygulamaya sunucu adresi tanımlıysa ve sunucuda AI anahtarı varsa.
3. **Çevrimdışı:** İkisi de yoksa ipuçları uygulamanın içindeki kurallardan üretilir.

**Üst bilgi**
- **🟢 AI çevrimiçi · Gemini · kendi anahtarın**: Cihazdaki anahtarla bağlı. Sunucu üzerinden bağlıysa yalnızca sağlayıcı adı görünür.
- **⚪ Çevrimdışı mod**: internet ya da sunucu yok. İpuçları uygulamanın içindeki kurallardan üretilir.
- **AI motoru** (birden fazla sağlayıcı varsa): Otomatik / Gemini 🔑 / Claude 🔑 / MiniMax. 🔑 işareti kendi anahtarınla çalışanları gösterir. Seçili olan, Profil'deki **⭐ Varsayılan** ile aynıdır ([ayrıntılar](#ai-anahtarı-ekleme)).
- Hiç anahtar eklenmemişse menüde **"🔑 Kendi AI anahtarını ekle"** kısayolu çıkar.

| Mod | Ne yapar | İnternetsiz |
|---|---|---|
| 🎯 **AI Quiz** | 10 soruluk quiz (akıllı tekrar ile seçilir). **Yanlış cevapta** soru durur ve **💡 Püf noktası** kartı açılır: hangi kural geçerli, bir hafıza hilesi ve aynı kurala uyan örnekler. Ardından AI kişisel bir açıklama ekler: neden bu artikel, neden seçtiğin yanlış, akılda kalıcı bir ipucu. Tur sonunda **🧠 Hata analizi**: hataların hangi türde toplandığı ve somut öneriler | ✅ Kural tabanlı ipucu ve analiz |
| 🔍 **Artikel Dedektifi** | Herhangi bir Almanca kelime yaz: **artikel, çeviri, çoğul hali, kural, hafıza hilesi, örnek cümle** (🔊 ile dinlenebilir). Son 10 arama saklanır | ✅ Sözlükteki kelimeler ve son ek tahmini |
| ✍️ **Cümle Ustası** | Zayıf kelimelerinden 5 tanesiyle AI'ın ürettiği cümlelerde **ismin halleri** pratiği (der/den/dem/des…). Her cevaptan sonra hal, çeviri ve açıklama gösterilir | ❌ İnternet gerekir |

**Püf noktası nasıl bulunur?** (çevrimdışı motor, öncelik sırasıyla)
1. ⚠️ **İstisna**: Kurala uymayan kelime (örn. *das Mädchen*).
2. 📝 **Son ek kuralı**: örn. *-ung → die*.
3. 📂 **Kategori kuralı**: örn. *günler → der*.
4. 🧩 **Bileşik kelime**: son parça belirler (*das Krankenhaus ← das Haus*).
5. 📊 **Grup eğilimi**: Konu grubundaki kelimelerin çoğu aynı artikeli alır (kesin kural olmadığı belirtilir).
6. 🎨 **Ezber + renk hilesi**: der = mavi, die = kırmızı, das = yeşil.

Gömülü 229 kelimenin %75'i için gerçek bir kural ya da grup eğilimi bulunur. Kalanlar için renkli hafıza hilesi verilir.

**Puanlama:** AI Quiz doğru başına 10 XP (10/10'da +50). Cümle Ustası doğru başına 12 XP. İkisi de günlük seriyi devam ettirir. AI Quiz cevapları akıllı tekrar sistemine işlenir.

**Gizlilik:** AI'a yalnızca kelime, artikel ve seçtiğin cevap gönderilir. İsim, profil ya da ilerleme gönderilmez.

---

## 5. Profil ekranı ve ayarlar

Üst bardaki avatara ya da alt menüdeki 👤'e dokunarak açılır.

| Bölüm | İçerik |
|---|---|
| Profil başlığı | Avatar, isim, seviye |
| Seviye çubuğu | Mevcut XP / sonraki seviye |
| İstatistikler | Toplam XP, öğrenilen kelime, doğruluk, oyun sayısı |
| Artikel dağılımı | Öğrenilen kelimelerin der/die/das oranı (renkli çubuk) |
| 🧠 Zayıf kelimelerim | En çok yanlış yapılan kelimeler. Dokununca dinlenir. **🎯 Bunları çalış** sadece bu kelimelerden quiz açar |
| 🔑 AI anahtarlarım | Gemini, Claude ve MiniMax için kendi API anahtarını ekle, test et, değiştir veya sil ([ayrıntılar](#ai-anahtarı-ekleme)) |
| 🔊 Cevaptan sonra sesli oku | Quizde cevaptan sonra otomatik telaffuzu açar/kapatır (varsayılan: açık) |
| 💾 Yedekleme | 📤 Dışa aktar / 📥 İçe aktar |
| 🔤 Yazı boyutu | Küçük · Normal · Büyük · Çok büyük |
| 🏆 Başarılar | Açılan ve kilitli başarılar |
| 👤 Profil Değiştir | Giriş ekranına döner |
| 🗑️ İlerlemeyi Sıfırla | Bu profilin tüm ilerlemesini siler (onay ister, geri alınamaz) |
| Sürüm bilgisi | En altta, örn. "ArtikelMeister v2.0.6 (7)" |

### AI anahtarı ekleme
**Profil → 🔑 AI anahtarlarım**

1. Sağlayıcının yanındaki **➕ Ekle**'ye dokun.
2. Anahtarın yoksa **Anahtar al ↗** sağlayıcının sitesini açar:

   | Sağlayıcı | Anahtar alma adresi |
   |---|---|
   | Gemini | aistudio.google.com/apikey (ücretsiz kullanım kotası vardır) |
   | Claude | platform.claude.com |
   | MiniMax | platform.minimax.io |

3. Anahtarı yapıştır ve **Test et ve kaydet**'e bas. Uygulama sağlayıcıya çok küçük bir test isteği gönderir. Anahtar çalışıyorsa **✓ Kayıtlı •••• abcd** görünür; çalışmıyorsa nedeni yazılır ve anahtar **kaydedilmez**.
4. Değiştirmek için **✏️ Değiştir**, kaldırmak için **🗑️ Sil**.

**Birden fazla anahtar: varsayılan AI seçimi**
- **İlk eklediğin anahtar otomatik olarak ⭐ Varsayılan olur.** Sonradan eklenen anahtarlar varsayılanı değiştirmez.
- Başka bir anahtarı varsayılan yapmak için yanındaki **⭐ Varsayılan yap** butonuna dokun.
- AI Koç menüsündeki **AI motoru** listesi aynı ayardır: orada seçim yaparsan Profil'deki ⭐ de değişir, Profil'de değiştirirsen menü de değişir.
- Varsayılan anahtarı silersen kalan anahtarlardan biri otomatik varsayılan olur.

*Örnek:* Önce MiniMax'i, sonra Gemini'yi eklersen MiniMax varsayılan kalır ve tüm AI istekleri MiniMax'e gider. Gemini'yi kullanmak için Gemini'nin yanındaki **⭐ Varsayılan yap**'a dokun.

**Güvenlik ve gizlilik**
- Anahtar **yalnızca bu cihazda** saklanır ve ekranda maskelenir (yalnızca son 4 karakter görünür).
- **Yedek dosyasına (📤 Dışa aktar) eklenmez.** Telefon değiştirince anahtarı yeniden eklemen gerekir.
- Anahtar yalnızca ilgili AI şirketine gönderilir; ArtikelMeister sunucusuna gitmez.
- AI'a yalnızca kelime, artikel ve seçilen cevap gönderilir. İsim, profil ya da ilerleme gönderilmez.
- **Kullanım ücreti senin hesabına yansır.** Uygulama maliyeti düşük tutar: kısa istekler, Claude'da düşük düşünme eforu ve cihazda 30 günlük önbellek (aynı kelime tekrar sorulmaz, en fazla 300 kayıt).

---

## 6. Puanlama: XP, kombo, seviye, seri

### XP kazanımı

| Mod | Doğru cevap başına | Kusursuz tur bonusu | Kombo bonusu |
|---|---|---|---|
| Quiz | 10 XP | +50 XP (10/10) | 10 × (çarpan − 1) |
| Değişim Macerası | 12 XP | +50 XP (hepsi doğru) | 12 × (çarpan − 1) |
| Hız Turu | 5 XP | — | — |
| Başarılar | Başarıya göre 10–500 XP | | |

### Kombo (art arda doğru)

| Art arda doğru | Çarpan | Gösterim |
|---|---|---|
| 0–2 | 1× | — |
| 3–4 | 2× | 🔥 2x |
| 5–6 | 3× | 🔥 3x |
| 7+ | 4× | 🔥 4x |

Yanlış bir cevap komboyu sıfırlar.

### Seviyeler

| Seviye | Almanca unvan | Türkçe | Gereken XP |
|---|---|---|---|
| 1 | Anfänger | Başlangıç | 0 |
| 2 | Lernender | Öğrenci | 100 |
| 3 | Fortgeschritten | İlerleyen | 250 |
| 4 | Praktikant | Pratikçi | 500 |
| 5 | Kenner | Bilen | 800 |
| 6 | Experte | Uzman | 1.200 |
| 7 | Profi | Profesyonel | 1.800 |
| 8 | Meister | Usta | 2.500 |
| 9 | Großmeister | Büyük Usta | 3.500 |
| 10 | Artikelkönig | Artikel Kralı | 5.000 |

Seviye atlandığında konfeti ve bildirim gösterilir.

### Günlük seri 🔥
- O gün bir **Quiz, Hız Turu veya Değişim Macerası turunu tamamlarsanız** seri devam eder.
- Art arda günlerde oynamak seriyi 1 artırır. Bir gün atlanırsa seri sıfırlanır.

---

## 7. Başarılar

| Başarı | Koşul | Ödül |
|---|---|---|
| 👣 İlk Adım | İlk quizi tamamla | 10 XP |
| 🔥 3 Gün Seri | 3 gün üst üste çalış | 50 XP |
| ⚔️ Haftalık Savaşçı | 7 gün üst üste çalış | 100 XP |
| 🌙 Ay Ustası | 30 gün üst üste çalış | 500 XP |
| 💯 Mükemmeliyetçi | Bir quizde 10/10 yap | 75 XP |
| ⚡ Hız Şeytanı | Hız turunda 20+ doğru yap | 100 XP |
| 🔵 DER Ustası | 50 der kelimesi öğren | 150 XP |
| 🔴 DIE Ustası | 50 die kelimesi öğren | 150 XP |
| 🟢 DAS Ustası | 50 das kelimesi öğren | 150 XP |
| 🎯 İstisna Avcısı | Tüm istisnaları doğru bil | 200 XP |
| 📖 Kural Bilgini | Kural rehberini aç | 100 XP |
| 📚 Kelime Koleksiyoncusu | 100 kelime öğren | 300 XP |
| 👑 Seviye 10 | Seviye 10'a ulaş | 250 XP |
| 🔄 İsmin Halleri Ustası | Değişim Macerasında %80+ yap | 200 XP |

"Öğrenilen kelime": quizde ya da hız turunda en az bir kez doğru bilinen kelime.

---

## 8. Akıllı tekrar sistemi

Uygulama her kelime için ayrı bir öğrenme geçmişi tutar ve **Leitner kutu sistemi** ile hangi kelimenin ne zaman tekrar sorulacağına karar verir.

### Nasıl çalışır?

| Kutu | Tekrar aralığı | Anlamı |
|---|---|---|
| 0 | Hemen (bir sonraki quiz) | Yanlış yapıldı |
| 1 | 1 gün | 1 kez doğru |
| 2 | 3 gün | 2 kez üst üste doğru |
| 3 | 7 gün | |
| 4 | 14 gün | **Ustalaşıldı** ✅ |
| 5 | 30 gün | Kalıcı öğrenildi |

- **Doğru cevap:** kelime bir üst kutuya çıkar ve tekrar aralığı uzar.
- **Yanlış cevap:** kelime kutu 0'a döner ve bir sonraki quizde tekrar sorulur.

### Quiz soruları nasıl seçilir?
1. Önce **tekrar zamanı gelmiş** kelimeler sorulur (en zayıflar önce, en fazla 7 tane).
2. Kalan sorular **hiç sorulmamış yeni kelimelerle** doldurulur.
3. Yeni kelime kalmadıysa en düşük kutudaki kelimeler kullanılır.
4. Soru sırası karıştırılır.

### Nerede görünür?
- **Ana sayfa:** Quiz kartında **🔁 N tekrar** rozeti.
- **Profil → 🧠 Zayıf kelimelerim:** Yanlış yapılmış ve henüz oturmamış (kutu 0–2) kelimeler, yanlış sayılarıyla (✗3 gibi). **🎯 Bunları çalış** sadece bu kelimelerden oluşan bir quiz başlatır.
- **Özet satırı:** "Ustalaşılan: X · Tekrar bekleyen: Y".

---

## 9. Sesli telaffuz

- Kelimeler **Almanca (de-DE)** okunur, biraz yavaş hızda (0.9×).
- **Android uygulamasında** telefonun kendi metin okuma (TTS) motoru kullanılır. **İnternet gerekmez.**
- Web sürümünde tarayıcının ses motoru kullanılır.

| Yer | Davranış |
|---|---|
| Quiz 🔊 | Cevaptan önce: sadece kelime. Cevaptan sonra: artikel + kelime |
| Quiz, otomatik | Ayar açıksa her cevaptan sonra "der Tisch" gibi okur |
| Öğren → örnek kartları 🔊 | Artikel + kelime |
| Profil → zayıf kelime çipleri | Dokununca okur |

**Ses çıkmıyorsa:** Telefonda Almanca ses paketi yüklü olmayabilir. Uygulama bu durumda 🔊 düğmelerini gizler ve bir uyarı gösterir. Çözüm için [SSS](#18-sık-sorulan-sorular-ve-sorun-giderme) bölümüne bakın.

---

## 10. Yedekleme ve geri yükleme

İlerleme yalnızca cihazda saklanır. Telefon değiştirirken ya da uygulamayı kaldırmadan önce yedek alın.

### Yedeğe neler dahil?
- Tüm profiller (isim, avatar)
- XP, seviye, seri, başarılar, istatistikler
- Akıllı tekrar verisi (her kelimenin kutusu ve geçmişi)
- Tercihler: dil, yazı boyutu, otomatik sesli okuma

### Yedek alma
1. **Profil → 💾 Yedekleme → 📤 Dışa aktar**
2. Android'de paylaşım menüsü açılır. Dosyayı **Google Drive**'a, **Dosyalar**'a, e-postaya ya da **WhatsApp**'a gönderin.
3. Dosya adı: `artikelmeister-yedek-YYYY-AA-GG.json`

Web sürümünde dosya doğrudan indirilir.

### Geri yükleme
1. Yedek dosyasını yeni telefona aktarın.
2. **Profil → 💾 Yedekleme → 📥 İçe aktar** ile dosyayı seçin.
3. Onaylayın. Uygulama yeniden açılır ve yedekteki profil seçili olarak gelir.

> Aynı profil cihazda zaten varsa **yedekteki hali ile değiştirilir**. Cihazdaki diğer profillere dokunulmaz.
> Geçersiz ya da bozuk dosyalar reddedilir ve hiçbir veri değişmez.

---

## 11. Yazı boyutu ve ekran uyumu

### Otomatik ölçek
Arayüz, ekran genişliğine göre kendiliğinden büyür. Yazı, ikon, boşluk ve butonlar birlikte ölçeklenir, böylece düzen bozulmaz.

| Ekran | Örnek cihaz | Ölçek |
|---|---|---|
| 360–375 px | Küçük telefonlar | 100% |
| 412 px | Çoğu modern telefon | ~110% |
| 430 px | Büyük telefonlar | ~115% |
| 470 px ve üzeri | Tabletler | 125% |

### Yazı boyutu ayarı
**Profil → 🔤 Yazı boyutu**

| Seçenek | Otomatik ölçeğe ek |
|---|---|
| Küçük | ×0.90 |
| Normal | ×1.00 |
| Büyük | ×1.15 |
| Çok büyük | ×1.30 |

- Android'in **sistem yazı boyutu** ayarı da hesaba katılır (×0.9 ile ×1.3 arası).
- En büyük ayarda bile ekranlar taşmaz. Gerekirse üst bardaki başlık gizlenir ve sekmeler ikinci satıra geçer.

---

## 12. Çevrimdışı ve çevrimiçi çalışma

| Durum | Davranış |
|---|---|
| **İnternet yok** | Uygulama tamamen çalışır: tüm kelimeler, kurallar, fontlar, ses ve ilerleme cihazdadır |
| **İnternet var** (sunucu adresi tanımlıysa) | Açılışta, internet geri geldiğinde ve uygulamaya dönüldüğünde (en sık 5 dakikada bir) sunucuda yeni içerik olup olmadığına bakılır |
| **Yeni içerik bulunursa** | İndirilir, cihaza kaydedilir, hemen ekrana yansır ve **📥 Yeni içerik indirildi!** bildirimi çıkar |

- Oyun ortasındaki sorular değişmez. Yeni içerik bir sonraki turda kullanılır.
- İçerik bir kez indirildikten sonra çevrimdışıyken de kullanılmaya devam eder.
- **Kullanıcı ilerlemesi sunucuya gönderilmez;** yalnızca cihazda kalır.

> **Not:** Mevcut APK'da sunucu adresi tanımlı değil, bu yüzden yalnızca çevrimdışı çalışır. Çevrimiçi güncelleme için [bölüm 16](#16-apk-derleme-ve-sürümleme)'daki `apiUrl` ayarı yapılıp APK yeniden derlenmelidir.

---

## 13. Android'e özel davranışlar

### Geri tuşu

| Bulunduğunuz yer | Geri tuşu |
|---|---|
| Açık pencere (dil, avatar) | Pencereyi kapatır |
| Sonuç ekranı | "Devam"a basar |
| Öğren → örnek listesi | Kurallara döner |
| Değişim Macerası alt ekranları | Giriş ekranına döner |
| Quiz / Hız Turu | Turdan çıkar, ana sayfaya döner |
| Diğer bölümler | Ana sayfaya döner |
| Ana sayfa | **İki kez** basınca uygulamadan çıkar |

### Diğer
- Ekran **dikey** konumda sabittir.
- Çentikli ve tam ekran hareketli gezinme kullanan telefonlarda içerik sistem çubuklarının altında kalmaz.
- Açılışta koyu temalı splash ekranı gösterilir.
- Android'in otomatik yedeklemesi açıktır. Google hesabı yedeklemesi açıksa ilerleme yeni telefona taşınabilir; yine de elle yedek almanız önerilir.

---

## 14. Yönetim paneli

Adres: `https://alanadiniz.com/admin` (yalnızca web)

### Giriş
- Kullanıcı adı ve şifre sunucudaki `.env` dosyasında tanımlıdır (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).
- **5 hatalı denemeden sonra** o IP adresi **15 dakika** kilitlenir.
- Oturum **24 saat** geçerlidir.

### Bölümler

| Bölüm | İşlev |
|---|---|
| 📊 Özet | İçerik sayıları ve hızlı işlemler (AI otomasyon, kelime ekleme, haller) |
| 🤖 AI Otomasyon | Kategori tarama ve eksik çeviri doldurma (aşağıda) |
| 📚 Kelimeler | Kelime listesi: arama, filtre (kategori, artikel, zorluk, durum, istisna), sıralama, ekle/düzenle/sil. AI ile kelime ekleme kutusu |
| 📝 Son Ekler | Son ek kuralları (örn. -ung → die), öncelik yüzdesi |
| 📂 Kategoriler | Kategori kuralları ve örnekleri |
| ⚠️ İstisnalar | Kurala uymayan kelimeler |
| 🔄 Haller | Değişim Macerası cümle alıştırmaları |
| 🏆 Başarılar | Başarı tanımları ve XP ödülleri |
| 💡 Günlük İpuçları | Dile göre günün ipuçları |

Her değişiklik **içerik sürümünü bir artırır**. Çevrimiçi uygulamalar yeni sürümü otomatik olarak indirir.

### 🤖 AI özellikleri
`.env` dosyasında `MINIMAX_API_KEY` ya da `OPENAI_API_KEY` tanımlı olmalıdır. Anahtar yoksa yalnızca kural tabanlı tahmin yapılır.

**AI ile kelime ekleme** (Kelimeler bölümü)
1. Almanca kelimeleri virgülle ya da her satıra bir tane gelecek şekilde yazın (tek seferde en fazla 15).
2. **✨ AI ile Analiz Et**: artikel, kategori, zorluk, son ek, istisna durumu ve 5 dilde çeviri otomatik doldurulur.
3. Kontrol edip **💾 Hepsini Kaydet**'e basın. Zaten kayıtlı ya da geçersiz kelimeler nedeni gösterilerek atlanır.

**Kategori otomasyonu**
1. Bir kategori yazın (örn. *Günler, Aylar, Hayvanlar*).
2. **🔍 Tara & Eksikleri Bul**: AI mevcut kelimeleri inceler, eksik standart kelimeleri ve hal alıştırmalarını önerir, kapsama yüzdesini verir.
3. **💾 Eksikleri Kaydet** ile ekleyin.

**🌍 Eksik Çevirileri Doldur**
- Ukraynaca, Arapça (ya da Türkçe, İngilizce) çevirisi boş olan kelimeleri 15'erli gruplar halinde doldurur.
- Mevcut çevirilerin üzerine yazmaz. Kaç kelimenin eksik olduğu üstte gösterilir.

---

## 15. Sunucu kurulumu ve güvenlik

Ayrıntılı adımlar [DEPLOY.md](./DEPLOY.md) dosyasındadır (Ubuntu + Nginx + PM2 + SSL). Özet:

```bash
cp .env.example .env     # değerleri doldurun
npm install
npm start                # http://localhost:3000
```

### Zorunlu ayarlar (production)
| Değişken | Kural |
|---|---|
| `JWT_SECRET` | En az 32 karakter, rastgele. Üretmek için: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_PASSWORD` | En az 10 karakter. `admin123` gibi yaygın şifreler kabul edilmez |
| `NODE_ENV` | `production` |

Bu değerler eksik ya da zayıfsa **sunucu başlamaz**. Veritabanındaki admin şifresi zayıfsa ve `.env`'de güçlü bir şifre varsa, açılışta otomatik olarak güncellenir.

### İsteğe bağlı ayarlar
| Değişken | İşlev |
|---|---|
| `CORS_ORIGINS` | Admin API'ye başka domainlerden erişim |
| `TRUST_PROXY` | Proxy güven ayarı (varsayılan: aynı sunucudaki Nginx) |
| `AI_PROVIDER` | Varsayılan AI: `gemini`, `claude`, `minimax` ya da `openai` |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Google Gemini (varsayılan model `gemini-3.7-flash`) |
| `ANTHROPIC_API_KEY`, `AI_CLAUDE_MODEL`, `AI_CLAUDE_EFFORT` | Anthropic Claude (varsayılan `claude-opus-5-5`, efor `low`) |
| `MINIMAX_*`, `OPENAI_*` | MiniMax ve OpenAI ayarları |
| `AI_TIMEOUT_MS` | AI isteği zaman aşımı (varsayılan 120000) |
| `AI_PUBLIC_ENABLED` | `false` yapılırsa uygulamadaki AI Koç kapanır |
| `AI_PUBLIC_RATE_LIMIT` | IP başına 10 dakikada en fazla AI isteği (varsayılan 60) |
| `AI_PUBLIC_DAILY_LIMIT` | Günlük toplam AI çağrısı (varsayılan 2000; önbellekten gelenler sayılmaz) |

### AI Koç: maliyet ve güvenlik
- **API anahtarları yalnızca sunucudadır**; APK'ya ve tarayıcıya hiçbir zaman gitmez.
- **Önbellek:** Aynı kelime ve dil için püf noktası ve sözlük cevapları 30 gün saklanır, AI tekrar çağrılmaz.
- **Sınırlar:** IP başına istek sınırı, günlük toplam çağrı bütçesi ve küçük istek gövdesi (20 KB).
- **Girdi doğrulama:** Yalnızca tek kelime kabul edilir; "talimatları yok say" gibi istem saldırıları reddedilir.
- **Doğrulama:** AI yanıtları şemaya göre denetlenir. Sözlükte kayıtlı bir kelimede sözlükteki artikel esas alınır. Cümle alıştırmalarındaki hatalı seçenekler düzeltilir, geçersiz olanlar elenir.
- **Claude:** Resmi Anthropic SDK'sı, yapılandırılmış JSON çıktısı ve sunucu taraflı reddetme yedeği (`fallbacks: "default"`) ile çağrılır.

### Güvenlik önlemleri
- Yalnızca uygulama dosyaları dışarıya sunulur. Veritabanı, `.env` ve sunucu kodu erişilemez.
- Güvenlik başlıkları eklidir: CSP, X-Frame-Options, HSTS, nosniff.
- Kullanıcı ve AI kaynaklı tüm içerik ekrana basılmadan önce temizlenir (XSS koruması).
- Girdi doğrulaması yapılır; geçersiz artikel ya da eksik alan reddedilir.
- Silinen kelimelerin ID'leri tekrar kullanılmaz, bu yüzden kullanıcı ilerlemesi bozulmaz.

### Yedekleme (sunucu)
Veritabanı `server/data/artikelmeister.db` dosyasındadır. Düzenli yedek alınmalıdır; ayrıntılar DEPLOY.md'de.

---

## 16. APK derleme ve sürümleme

### Gereksinimler
- Node.js 18+
- **JDK 21**
- Android SDK (Android Studio ile gelir)

### Komutlar
```bash
npm run apk:keystore   # bir kez: release imza anahtarı oluşturur
npm run apk            # imzalı release APK → dist/
npm run apk:debug      # test için debug APK
npm run icons          # ikon/splash yeniden üretimi
npm run fonts          # yerel fontları yeniden kopyalar
npm run ai:bundle      # AI çekirdeğini tarayıcı için paketler (npm run apk bunu otomatik yapar)
```

### Ayar dosyası: `mobile.config.json`
```json
{
  "apiUrl": "",
  "appId": "com.artikelmeister.app",
  "appName": "ArtikelMeister",
  "version": "2.0.6",
  "versionCode": 7
}
```

| Alan | Açıklama |
|---|---|
| `apiUrl` | Sunucu adresi (örn. `https://alanadiniz.com`). Boşsa uygulama yalnızca çevrimdışı çalışır. Doluysa derleme anındaki güncel içerik APK'ya gömülür ve uygulama çevrimiçi güncelleme yapar |
| `version` / `versionCode` | **Her derlemede otomatik artar** (2.0.6 → 2.0.7, build 7 → 8). Elle değiştirmeyin |

### Otomatik sürümleme
- Her `npm run apk` derlemesi sürümü bir artırır. Derleme başarısız olursa sürüm artmaz.
- Dosya adı: `dist/ArtikelMeister-<sürüm>-b<build>-release.apk`. Eski APK'lar silinmez.
- Her derleme tarih ve sürümle `dist/builds.log` dosyasına yazılır.
- Büyük sürüm atlamak için: `ARTIKEL_VERSION=2.1.0 npm run apk`

### ⚠️ İmza anahtarı
`android/artikelmeister-release.jks` ve `android/keystore.properties` dosyalarını **güvenli bir yere yedekleyin**. Kaybolurlarsa kullanıcılara aynı uygulamanın güncellemesi yüklenemez; yeni bir uygulama olarak kurmak gerekir. Bu dosyalar git'e eklenmez.

---

## 17. Teknik yapı

| Katman | Teknoloji |
|---|---|
| Arayüz | HTML, CSS, saf JavaScript (çerçeve yok) |
| Mobil | Capacitor 8 (Android, minSdk 24, targetSdk 36) |
| Sunucu | Node.js, Express |
| Veritabanı | SQLite (better-sqlite3) |
| AI | Google Gemini, Anthropic Claude (resmi SDK), MiniMax, OpenAI |
| Fontlar | Inter, Space Grotesk (uygulamaya gömülü) |

### Android eklentileri
| Eklenti | Kullanım |
|---|---|
| `@capacitor/app` | Geri tuşu, uygulamaya dönüş |
| `@capacitor/splash-screen` | Açılış ekranı |
| `@capacitor/text-zoom` | Sistem yazı boyutunu okuma |
| `@capacitor-community/text-to-speech` | Sesli telaffuz |
| `@capacitor/filesystem` + `@capacitor/share` | Yedek dosyası oluşturma ve paylaşma |

### Proje yapısı
```
├── index.html            Ana uygulama
├── js/
│   ├── app.js            Uygulama mantığı (modlar, profil, XP)
│   ├── api-loader.js     İçerik yükleme ve çevrimiçi senkron
│   ├── srs.js            Akıllı tekrar (Leitner)
│   ├── speech.js         Sesli telaffuz
│   ├── backup.js         Yedekleme / geri yükleme
│   ├── ai-coach.js       🤖 AI Koç (3 mod, kendi anahtar yönetimi, çevrimdışı ipucu motoru)
│   └── vendor/ai-core.js AI çekirdeğinin tarayıcı paketi (npm run ai:bundle ile üretilir)
│   ├── display-scale.js  Otomatik ölçek ve yazı boyutu
│   ├── native.js         Android entegrasyonu (geri tuşu, splash)
│   └── config.js         Sunucu adresi ve sürüm (derlemede üretilir)
├── css/style.css
├── fonts/                Gömülü fontlar
├── data/                 Çeviriler (i18n.js) ve yedek içerik (database.js)
├── admin/                Yönetim paneli
├── server/               API, veritabanı, AI, güvenlik
│   ├── ai-core/          Sunucu ve uygulamanın ortak AI çekirdeği (sağlayıcılar, istemler, şemalar)
│   ├── ai-providers.js   .env'den sağlayıcı ayarları
│   ├── ai-coach.js       AI Koç: önbellek, bütçe, sözlük bağlamı
│   └── routes/ai.js      /api/ai/* uçları
├── scripts/              APK derleme, ikon, font, imza betikleri
├── android/              Android projesi (Capacitor)
├── assets/               İkon ve splash kaynakları
└── dist/                 Derlenmiş APK'lar ve builds.log
```

### İçerik
Gömülü içerik: **229 kelime** (69 der, 75 die, 85 das), **45 son ek kuralı**, **21 kategori kuralı**, **11 istisna**, **8 hal alıştırması**, 4 halin örnek cümleleri, 14 başarı, 10 seviye.

---

## 18. Sık sorulan sorular ve sorun giderme

**APK yüklenmiyor: "Uygulama yüklenmedi" hatası**
→ Eski bir sürüm farklı bir imzayla kuruluysa önce onu kaldırın. Önce yedek almayı unutmayın.
→ Yüklediğiniz sürüm telefondakinden düşükse Android kabul etmez. Daha yüksek sürümü kullanın.

**Ses çıkmıyor / 🔊 düğmeleri görünmüyor**
→ Telefonda Almanca ses paketi eksik olabilir. **Ayarlar → Sistem → Diller ve giriş → Metin okuma çıkışı** (Samsung'da: Genel yönetim → Metin okuma) → Tercih edilen motor (Google) → ⚙️ → **Ses verilerini yükle → Deutsch**. Ardından uygulamayı kapatıp yeniden açın.
→ Telefonun medya sesi kapalı olabilir.

**Yazılar çok küçük ya da çok büyük**
→ Profil → 🔤 Yazı boyutu bölümünden ayarlayın. Android'in sistem yazı boyutu da etkilidir.

**Ukraynaca veya Arapça seçince çeviriler İngilizce görünüyor**
→ Bu dillerin çevirileri henüz eklenmedi. Yönetici, admin panelindeki **🌍 Eksik Çevirileri Doldur** ile ekleyebilir. Eksik çeviri olduğunda Türkçe yerine İngilizce gösterilir.

**AI Koç "Çevrimdışı mod" gösteriyor**
→ En kolay çözüm: **Profil → 🔑 AI anahtarlarım** bölümünden kendi Gemini, Claude ya da MiniMax anahtarını ekle.
→ Ya da uygulamaya sunucu adresi tanımlanmalı ve sunucuda en az bir AI anahtarı (`GEMINI_API_KEY`, `ANTHROPIC_API_KEY` veya `MINIMAX_API_KEY`) bulunmalıdır.
→ İnternet bağlantısını kontrol et.

**"❌ Anahtar çalışmadı"**
→ Anahtarı eksiksiz kopyaladığından emin ol (başında ya da sonunda boşluk olmamalı).
→ Sağlayıcı hesabında kullanım hakkı ya da bakiye olup olmadığını kontrol et. Hata mesajı sağlayıcıdan gelir.
→ "Çok fazla AI isteği" görürseniz birkaç dakika bekleyin (IP sınırı).

**Yeni içerik gelmiyor**
→ Mevcut APK'da sunucu adresi tanımlı değil ([bölüm 12](#12-çevrimdışı-ve-çevrimiçi-çalışma)).
→ Adres tanımlıysa: internet bağlantısını kontrol edin. Uygulamadan çıkıp birkaç dakika sonra tekrar girin.

**İlerlemem kayboldu**
→ İlerleme cihazdadır. Uygulama kaldırıldıysa ya da veriler temizlendiyse, yalnızca daha önce aldığınız bir yedekten geri yüklenebilir.

**Yönetim paneline giremiyorum: "Çok fazla başarısız deneme"**
→ 15 dakika bekleyin. Şifreyi sunucudaki `.env` dosyasından kontrol edin.

**Sunucu açılmıyor: "Güvenlik yapılandırması hatalı"**
→ `.env` dosyasında güçlü bir `JWT_SECRET` (32+ karakter) ve `ADMIN_PASSWORD` (10+ karakter) tanımlayın.

---

## 19. Bilinen sınırlamalar

- **Gerçek cihaz testi:** Bu sürüm tarayıcıda telefon boyutlarında test edildi. Sesli telaffuz, paylaşım menüsü, geri tuşu ve sistem yazı boyutu yalnızca gerçek Android cihazda çalıştığı için henüz cihaz üzerinde doğrulanmadı.
- **Çevrimiçi senkron:** Mevcut APK'da sunucu adresi yok, içerik güncellemesi çalışmaz. AI Koç ise **kendi anahtarınla** sunucu olmadan tam çalışır.
- **Cihazdan AI isteği gerçek Android'de denenmedi:** APK'da istekler Android'in yerel HTTP katmanından (CapacitorHttp) gider. Tarayıcıda Gemini ve Claude ile test edildi, gerçek telefonda henüz doğrulanmadı.
- **AI modülünün boyutu:** Cihaz modu için gereken paket (Anthropic SDK + şema doğrulama) yaklaşık 1 MB. Yalnızca AI kendi anahtarınla ilk kez kullanıldığında yüklenir; uygulamanın açılışını yavaşlatmaz.
- **Gerçek AI sağlayıcılarıyla test:** AI Koç, Gemini, Claude ve MiniMax API'lerinin biçimini taklit eden bir test sunucusuyla uçtan uca doğrulandı. Gerçek API anahtarlarıyla henüz denenmedi; ilk kurulumda her sağlayıcıyı bir kez deneyin.
- **Ukraynaca / Arapça kelime çevirileri** boş; bu dillerde İngilizce gösterilir.
- **🎯 İstisna Avcısı başarısı** şu anda kazanılamıyor; tetikleyici henüz kodlanmadı.
- **Hal alıştırmaları:** Gömülü içerikte 8 alıştırma var, bu yüzden bir pratik turu 8 sorudur.
- **İlerleme senkronu yok:** Kullanıcı ilerlemesi sunucuya gönderilmez. Cihazlar arası taşıma elle yedekleme ile yapılır.
- **iOS sürümü yok:** Yalnızca Android ve web.

---

*ArtikelMeister · Kullanım Kılavuzu · Sürüm 2.0.6*
