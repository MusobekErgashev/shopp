const { v4: uuidv4 } = require('uuid');
const initialProducts = require('../data/products');

// Ma'lumotlar xotirada saqlanadi (database o'rniga)
// Server qayta ishga tushganda boshlang'ich ma'lumotlar tiklanadi
let products = [...initialProducts];

const ProductModel = {
  // Barcha mahsulotlarni olish
  getAll: (query = {}) => {
    let result = [...products];

    // Kategoriya bo'yicha filter
    if (query.category) {
      result = result.filter(p =>
        p.category.toLowerCase() === query.category.toLowerCase()
      );
    }

    // Qidiruv (title yoki description bo'yicha)
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Narx bo'yicha sort
    if (query.sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (query.sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (query.sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: result.slice(startIndex, endIndex),
      total: result.length,
      page,
      limit,
      totalPages: Math.ceil(result.length / limit)
    };
  },

  // ID bo'yicha bitta mahsulot
  getById: (id) => {
    return products.find(p => p.id === id) || null;
  },

  // Yangi mahsulot qo'shish
  create: (productData) => {
    const newProduct = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      title: productData.title,
      description: productData.description || '',
      image: productData.image || '',
      category: productData.category || '',
      price: Number(productData.price) || 0
    };
    products.push(newProduct);
    return newProduct;
  },

  // Mahsulotni yangilash (to'liq)
  update: (id, productData) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      title: productData.title ?? products[index].title,
      description: productData.description ?? products[index].description,
      image: productData.image ?? products[index].image,
      category: productData.category ?? products[index].category,
      price: productData.price !== undefined ? Number(productData.price) : products[index].price
    };

    return products[index];
  },

  // Mahsulotni o'chirish
  delete: (id) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },

  // Barcha kategoriyalar ro'yxati
  getCategories: () => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.filter(Boolean);
  }
};

module.exports = ProductModel;
