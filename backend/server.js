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
  const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_testing_purposes';
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️ Missing JWT_SECRET in environment. Using default fallback key for local dev.');
    process.env.JWT_SECRET = JWT_SECRET;
  }

  let mongoConnected = false;
  if (process.env.MONGO_URI) {
    try {
      console.log('🔄 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000, // 3 seconds timeout
      });
      console.log('✅ Connected to MongoDB Atlas');
      mongoConnected = true;
      global.useLocalDB = false;
    } catch (err) {
      console.warn(`⚠️ MongoDB connection failed (${err.message}). Falling back to local JSON database.`);
    }
  } else {
    console.warn('⚠️ MONGO_URI not provided. Falling back to local JSON database.');
  }

  if (!mongoConnected) {
    global.useLocalDB = true;
    console.log('📁 Local JSON database enabled (backend/data/users.json)');
  }

  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}

start();
