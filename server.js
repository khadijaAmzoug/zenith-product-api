const express = require('express');
const connectDB = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes 
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Basic route to test
app.get('/', (req, res) => {
  res.send('API is working...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
