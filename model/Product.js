// models/Product.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 

module.exports = mongoose.model('Products', ItemSchema);