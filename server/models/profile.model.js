import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  institueName: {
    type: String,
    trim: true,
  },
  Year: {
    type: Number,
  },
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
