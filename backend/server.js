const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Frontend bilan ishlash uchun CORS yoqildi
app.use(express.json()); // JSON bodyni o'qish uchun

// Routes
app.use('/api/products', productRoutes);

// Asosiy route - test uchun
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce Backend ishlayapti! 🚀' });
});

// Server ishga tushirish
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});
