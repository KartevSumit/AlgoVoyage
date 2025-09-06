import e from 'express';
import { Schema, model, Document } from 'mongoose';

interface IProfile extends Document {
  firstName: string;
  lastName: string;
  codeforces: string;
  university: string;
  year: number;
}

const profileSchema = new Schema<IProfile>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  codeforces: {
    type: String,
    trim: true,
  },
  university: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
  },
});

const Profile = model<IProfile>('Profile', profileSchema);
export default Profile;
