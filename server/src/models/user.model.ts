import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  additionalInfo: Schema.Types.ObjectId;
  authProvider: 'local'|'google'|'both';
  progress: boolean;
  token?: string;
  resetPasswordExpires?: Date;

}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
  },
  additionalInfo: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'both'],
    default: 'local',
  },
  progress: {
    type: Boolean,
    default: false,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User = model<IUser>('User', userSchema);
export default User;
