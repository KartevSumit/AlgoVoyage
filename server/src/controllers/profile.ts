import User from '../models/user.model.js';
import Profile from '../models/profile.model.js';
import { Request, Response } from 'express';

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, codeforces, university, year } =
      req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    console.log(user.additionalInfo);
    const profile = await Profile.findOne({ _id: user.additionalInfo });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: 'Profile not found',
      });
    }
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.codeforces = codeforces;
    profile.university = university;
    profile.year = year;
    await profile.save();

    user.progress = true;
    await user.save();
    await user.populate('additionalInfo');
    return res.status(200).json({
      success: true,
      message: 'Profile created successfully',
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating profile',
      error: error,
    });
  }
};
