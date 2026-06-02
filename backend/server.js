import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ Missing MONGO_URI in environment');
      process.exit(1);
    }
    if (!process.env.JWT_SECRET) {
      console.error('❌ Missing JWT_SECRET in environment');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
    
    app.listen(PORT, () => {
      console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
