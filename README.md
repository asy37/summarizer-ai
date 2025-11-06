# 🤖 AI Metin Özetleyici

Modern ve kullanıcı dostu bir AI tabanlı metin özetleme uygulaması. Hugging Face API kullanarak uzun metinlerinizi hızlıca özetleyin ve kaydedin.

## ✨ Özellikler

- **AI Destekli Özetleme**: Hugging Face API kullanarak yüksek kaliteli metin özetleri
- **Özet Kaydetme**: Özetlerinizi MongoDB veritabanında saklayın
- **Özet Geçmişi**: Daha önce oluşturduğunuz özetleri görüntüleyin
- **Kopyalama**: Özetleri tek tıkla panoya kopyalayın
- **Modern UI**: Tailwind CSS ile tasarlanmış responsive ve kullanıcı dostu arayüz
- **Hata Yönetimi**: Kapsamlı hata yakalama ve kullanıcı bildirimleri

## 🛠️ Teknolojiler

- **Framework**: Next.js 16 (App Router)
- **Dil**: TypeScript
- **Veritabanı**: MongoDB (Prisma ORM)
- **Stil**: Tailwind CSS 4
- **AI Servisi**: Hugging Face API

## 📋 Gereksinimler

- Node.js 18+ 
- MongoDB veritabanı (yerel veya cloud)
- Hugging Face API anahtarı

## 🚀 Kurulum

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd summarizer-ai
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

4. **Veritabanını hazırlayın**
```bash
npx prisma generate
npx prisma db push
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.
Demo https://nextsummarizeai.netlify.app
## 📁 Proje Yapısı

```
summarizer-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API route'ları
│   │   ├── summarize/     # Özetleme endpoint'i
│   │   ├── save-summary/  # Özet kaydetme endpoint'i
│   │   └── summaries/     # Özet listesi endpoint'i
│   ├── summarize/         # Özetleme sayfası
│   └── page.tsx           # Ana sayfa
├── features/              # Özellik bazlı modüller
│   ├── home/             # Ana sayfa özellikleri
│   └── summarize/        # Özetleme özellikleri
│       ├── components/   # React bileşenleri
│       ├── hooks/        # Custom React hooks
│       └── view/         # View bileşenleri
├── lib/                   # Yardımcı kütüphaneler
│   └── prisma.ts         # Prisma client
└── prisma/               # Prisma şeması
    └── schema.prisma
```

## 🔌 API Endpoints

### POST `/api/summarize`
Metin özetleme endpoint'i.

**Request Body:**
```json
{
  "text": "Özetlenecek metin..."
}
```

**Response:**
```json
{
  "summary": "Özetlenmiş metin..."
}
```

### POST `/api/save-summary`
Özet kaydetme endpoint'i.

**Request Body:**
```json
{
  "originalText": "Orijinal metin...",
  "summary": "Özet metin..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "originalText": "...",
    "summary": "...",
    "createdAt": "..."
  }
}
```

### GET `/api/summaries`
Kaydedilmiş özetleri listeleme endpoint'i.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "originalText": "...",
      "summary": "...",
      "createdAt": "..."
    }
  ]
}
```

## 💻 Kullanım

1. Ana sayfada "Özetle" butonuna tıklayın
2. Özetlemek istediğiniz metni girin
3. "Özetle" butonuna tıklayın
4. Oluşturulan özeti inceleyin
5. İsterseniz özeti kaydedin veya kopyalayın
6. "Özet Geçmişini Göster" ile daha önce kaydedilen özetleri görüntüleyin

## 🧪 Geliştirme

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Lint
```bash
npm run lint
```

## 📝 Notlar

- Hugging Face API anahtarınızı güvenli bir şekilde saklayın
- MongoDB bağlantı URL'inizi doğru yapılandırdığınızdan emin olun
- Production ortamında ortam değişkenlerini güvenli bir şekilde yönetin

## 📄 Lisans

Bu proje özel bir projedir.
