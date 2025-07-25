import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
