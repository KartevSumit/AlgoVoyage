import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DBConnect from './config/database.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

DBConnect();
app.listen(PORT, () => {
  console.log('Server running at port', PORT);
});
