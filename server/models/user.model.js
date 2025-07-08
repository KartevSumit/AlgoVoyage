import mongoose from 'mongoose';
import { progress } from 'motion';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  codeforces: {
    type: String,
    trim: true,
  },
  additionalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  progress: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
