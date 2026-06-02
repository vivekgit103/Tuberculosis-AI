import express from 'express';
import dotenv from 'dotenv';
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

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
