# 🛒 E-Commerce Backend (Node.js + Express)

MockAPI o'rniga ishlaydigan real backend server.

---

## 📁 Papka Tuzilmasi

```
loyiha-papkasi/
├── backend/                 ← Bu papka (backend)
│   ├── server.js            ← Asosiy server fayli
│   ├── package.json         ← Kutubxonalar ro'yxati
│   ├── .env.example         ← Sozlamalar namunasi
│   ├── routes/
│   │   └── products.js      ← API yo'nalishlari
│   ├── models/
│   │   └── Product.js       ← Ma'lumotlar bilan ishlash
│   └── data/
│       └── products.js      ← Boshlang'ich ma'lumotlar
│
└── frontend/                ← Sizning React/Vue loyihangiz
    ├── src/
    └── package.json
```

---

## 🚀 Ishga Tushirish

### 1-qadam: Backend papkasiga kiring
```bash
cd backend
```

### 2-qadam: Kutubxonalarni o'rnating
```bash
npm install
```

### 3-qadam: Serverni ishga tushiring
```bash
# Oddiy ishga tushirish
npm start

# Yoki development rejimida (fayl o'zgarganda avtomatik qayta ishga tushadi)
npm run dev
```

### ✅ Server mana bu manzilda ishlaydi:
```
http://localhost:3001
```

---

## 📡 API Endpointlar

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | `/api/products` | Barcha mahsulotlar |
| GET | `/api/products/:id` | Bitta mahsulot |
| GET | `/api/products/categories` | Barcha kategoriyalar |
| POST | `/api/products` | Yangi mahsulot qo'shish |
| PUT | `/api/products/:id` | Mahsulotni yangilash |
| DELETE | `/api/products/:id` | Mahsulotni o'chirish |

---

## 🔍 Filter va Qidiruv

```
GET /api/products?category=Kiyim
GET /api/products?search=nike
GET /api/products?sort=price_asc
GET /api/products?sort=price_desc
GET /api/products?sort=newest
GET /api/products?page=1&limit=6
```

---

## 💻 Frontendda Ishlatish

### MockAPI ni o'rniga quyidagicha almashtiring:

```javascript
// ESKI (mockapi)
const API_URL = 'https://mockapi.io/api/v1/products';

// YANGI (o'zimizning backend)
const API_URL = 'http://localhost:3001/api/products';
```

### Fetch misollari:

```javascript
// Barcha mahsulotlarni olish
const res = await fetch('http://localhost:3001/api/products');
const data = await res.json();
console.log(data.data); // mahsulotlar massivi

// Yangi mahsulot qo'shish
const res = await fetch('http://localhost:3001/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Yangi mahsulot",
    description: "Tavsif",
    image: "https://...",
    category: "Kiyim",
    price: 150000
  })
});
const newProduct = await res.json();

// Mahsulotni o'chirish
await fetch(`http://localhost:3001/api/products/${id}`, {
  method: 'DELETE'
});
```

---

## ⚠️ Muhim Eslatma

Hozirda ma'lumotlar **xotirada** saqlanadi. Server qayta ishga tushganda boshlang'ich ma'lumotlar tiklanadi.

Doimiy saqlash kerak bo'lsa, keyinroq **SQLite** yoki **MongoDB** qo'shish mumkin.
