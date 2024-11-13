//routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// Create a new item
router.post('/create', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity || 1,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Get a single item by ID
router.get('/:id/new/:data', async (req, res) => {
  try {
    const products = await Product.findOne({quantity:req.params.data});
    if (products) {
      res.status(200).json(products);
      console.log("Second data:",req.params.data)
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, quantity: req.body.quantity },
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;