import mongoose from 'mongoose';

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: '5m',
  },
});

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;
