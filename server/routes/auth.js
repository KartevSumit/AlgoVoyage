import express from 'express';
const router = express.Router();

import { auth } from '../middlewares/auth.js';
import {
  sendOtp,
  signIn,
  logIn,
  changePassword,
  logOut,
  resetPasswordToken,
  resetPassword,
} from '../controllers/auth.js';

router.post('/sendOtp', sendOtp);
router.post('/signIn', signIn);
router.post('/logIn', logIn);
router.post('/changePassword', auth, changePassword);
router.post('/logOut', auth, logOut);
router.post('/resetPasswordToken', resetPasswordToken);
router.post('/resetPassword', resetPassword);

export default router;
