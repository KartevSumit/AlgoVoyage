import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import Profile from '../models/profile.model.js';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
} from '../config/env.js';

type AnyUserDoc = HydratedDocument<any>;

export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.body as { code?: string };

  if (!code) {
    return res.status(400).json({ success: false, message: 'Authorization code is required' });
  }

  try {
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'postmessage'
    );

    const tokenResponse = await oAuth2Client.getToken(code);
    const tokens = tokenResponse.tokens ?? {};
    const idToken = tokens.id_token;

    if (!idToken) {
      return res
        .status(400)
        .json({ success: false, message: 'No id_token returned from Google' });
    }

    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res
        .status(400)
        .json({ success: false, message: 'Could not retrieve email from Google payload' });
    }

    console.log('User Payload:', payload);

    let userDoc: AnyUserDoc | null = await User.findOne({ email: payload.email }).exec();

    if (!userDoc) {
      const profile = await Profile.create({
        userName: null,
        codeforces: null,
        image: payload.picture ?? null,
        instituteName: null,
        year: null,
      });

      userDoc = await User.create({
        email: payload.email,
        authProvider: 'google',
        additionalInfo: profile._id,
      });

      const userObj = (userDoc as AnyUserDoc).toObject() as Record<string, any>;

      const tokenPayload = {
        email: userObj.email,
        id: userObj._id ?? userObj.id,
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });
      userObj.token = token;
      if ('password' in userObj) delete userObj.password;

      const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('token', token, cookieOptions);
      return res.status(201).json({
        success: true,
        message: 'Signed up successfully',
        data: userObj,
      });
    }

    if ((userDoc as any).authProvider === 'local') {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const userObj = (userDoc as AnyUserDoc).toObject() as Record<string, any>;
    const tokenPayload = {
      email: userObj.email,
      id: userObj._id ?? userObj.id,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });
    userObj.token = token;
    if ('password' in userObj) delete userObj.password;

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('token', token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      data: userObj,
    });
  } catch (error) {
    console.error('Failed to exchange authorization code or authenticate:', error);
    return res
      .status(400)
      .json({ success: false, message: 'Authentication failed', error });
  }
};
