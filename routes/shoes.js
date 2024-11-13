//routes/shoes.js

const express = require('express');
const router = express.Router();
const Shoe = require('../model/Shoe');

// Create a new item
router.post('/create', async (req, res) => {
  try {
    const newShoe = new Shoe({
      name: req.body.name, brand: req.body.brand,
      price: req.body.price, shoetype: req.body.shoetype});
    const savedShoe = await newShoe.save();
    res.status(201).json(savedShoe);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Get a single item by ID
router.get('/id/:data', async (req, res) => {
  try {
    const shoes = await Shoe.findOne({price:req.params.data});
    if (shoes) {
      res.status(200).json(shoes);
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
    const updatedShoe = await Shoe.findByIdAndUpdate(req.params.id,
      { name: req.body.name, shoetype: req.body.shoetype, 
        brand: req.body.brand,price: req.body.price},
      { new: true, runValidators: true }
    );
    if (updatedShoe) {
      res.status(200).json(updatedShoe);
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
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);
    if (deletedShoe) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;

