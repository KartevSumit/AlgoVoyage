import User from '../models/user.model.js';
import Profile from '../models/profile.model.js';
import OTP from '../models/otp.model.js';
import { mailSender } from '../util/nodeMailer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';

export const sendOtp = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const existingUser = await User.findOne({ email });
    //console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with the following email already exists',
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    while (!(await OTP.find({ otp }))) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpData = await OTP.create({ email: email, otp: otp });

    const response = await mailSender(
      email,
      'OTP Verification',
      `Your OTP is ${otp}`
    );

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: otpData,
      response: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in sending OTP',
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const otpStored = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log(otpStored[0]);
    if (otpStored[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Wrong Otp',
      });
    }

    const HashedPasssword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({
      institueName: null,
      year: null,
    });

    const user = await User.create({
      email: email,
      password: HashedPasssword,
      additionalInfo: profile.id,
    });

    const payload = {
      email: email,
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    user.token = token;
    user.password = undefined;

    const options = {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('token', token, options);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user with this email',
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: email,
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('token', token, options);
      return res.status(200).json({
        success: true,
        message: 'User successfully logged in',
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      const mail = await mailSender({
        email: user.email,
        subject: 'Password Changed',
        text: `Your password has been changed successfully`,
      });

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in changing password',
      error: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers('Authorisation').reaplace('Bearer ', '');
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token missing',
      });
    }

    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in logging out',
      error: error.message,
    });
  }
};

export const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const token = crypto.randomUUID();

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      'Password reset link',
      `Password reset link: ${url}`
    );

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in password reset',
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        message: 'Token expired',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.token = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in password reset',
      error: error.message,
    });
  }
};
