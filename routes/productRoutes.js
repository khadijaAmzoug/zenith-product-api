const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// POST /api/products
router.post('/', async (req, res) => {
  try {

    const productData = req.body;

    const newProduct = await Product.create(productData);

    res.status(201).json(newProduct);
  } catch (error) {

    res.status(400).json({ message: error.message });
  } 

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'لمنتج غير موجود' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

});

module.exports = router;
