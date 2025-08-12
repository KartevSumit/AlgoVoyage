import { PORT } from './config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DBConnect from './config/database.js';
import authRoutes from './routes/auth.js';
import contestRoutes from './routes/contest.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contest', contestRoutes);

DBConnect();
app.listen(PORT || 4000, () => {
  console.log('Server running at port', PORT);
});
