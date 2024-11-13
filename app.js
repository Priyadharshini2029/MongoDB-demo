// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemsRoutes = require('./routes/items');
const productsRoutes = require('./routes/products');
const shoesRoutes = require('./routes/shoes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Set up routes
app.use('/api/items', itemsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/shoes', shoesRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;