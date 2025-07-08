import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function DBConnect() {
  return mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log('DB connected');
    })
    .catch(() => {
      console.log('Could not connect to database');
    });
}