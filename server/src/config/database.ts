import mongoose from 'mongoose';
import { DATABASE } from './env.js';

export default function DBConnect() {
  return mongoose
    .connect(DATABASE)
    .then(() => {
      console.log('DB connected');
    })
    .catch(() => {
      console.log('Could not connect to database');
    });
}