import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Products (with filtering, sorting, pagination)
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    let sortOptions = {};
    if (sortBy === 'price_asc') sortOptions.price = 1;
    else if (sortBy === 'price_desc') sortOptions.price = -1;

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Product by ID
router.get('/:id', async (req, res) => {
  try {
    const found = await Product.findById(req.params.id);
    if (!found) return res.status(404).json({ message: 'Product not found' });
    res.json(found);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
