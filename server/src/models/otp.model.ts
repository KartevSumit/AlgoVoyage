import { Schema, model, Document } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: number;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
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

const OTP = model<IOtp>('OTP', otpSchema);
export default OTP;
