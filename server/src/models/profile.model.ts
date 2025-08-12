import e from 'express';
import { Schema, model, Document } from 'mongoose';

interface IProfile extends Document {
  userName: string;
  codeforces: string;
  image: string;
  instituteName: string;
  Year: number;
}

const profileSchema = new Schema<IProfile>({
  userName: {
    type: String,
    trim: true,
  },
  codeforces: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  instituteName: {
    type: String,
    trim: true,
  },
  Year: {
    type: Number,
  },
});

const Profile = model<IProfile>('Profile', profileSchema);
export default Profile;
