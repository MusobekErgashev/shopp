const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET /api/products - Barcha mahsulotlar
// Query params: ?category=Kiyim&search=nike&sort=price_asc&page=1&limit=10
router.get('/', (req, res) => {
  try {
    const result = Product.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Mahsulotlarni olishda xatolik', details: error.message });
  }
});

// ✅ GET /api/products/categories - Barcha kategoriyalar
router.get('/categories', (req, res) => {
  try {
    const categories = Product.getCategories();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Kategoriyalarni olishda xatolik' });
  }
});

// ✅ GET /api/products/:id - Bitta mahsulot
router.get('/:id', (req, res) => {
  try {
    const product = Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Mahsulotni olishda xatolik' });
  }
});

// ✅ POST /api/products - Yangi mahsulot qo'shish
// Body: { title, description, image, category, price }
router.post('/', (req, res) => {
  try {
    const { title, price } = req.body;

    // Majburiy maydonlarni tekshirish
    if (!title || price === undefined) {
      return res.status(400).json({
        error: 'title va price majburiy maydonlar'
      });
    }

    const newProduct = Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Mahsulot qo\'shishda xatolik', details: error.message });
  }
});

// ✅ PUT /api/products/:id - Mahsulotni yangilash
router.put('/:id', (req, res) => {
  try {
    const updated = Product.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Mahsulotni yangilashda xatolik' });
  }
});

// ✅ DELETE /api/products/:id - Mahsulotni o'chirish
router.delete('/:id', (req, res) => {
  try {
    const deleted = Product.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }
    res.json({ message: 'Mahsulot muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: 'Mahsulotni o\'chirishda xatolik' });
  }
});

module.exports = router;
