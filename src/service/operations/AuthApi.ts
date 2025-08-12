// src/service/operations/AuthApi.ts

import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { AUTH_API } from '../api';
import { setLoading, setToken, setEmailSent } from '../../slices/AuthSlice';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';
import { AnyAction } from 'redux';
import axios from 'axios';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

// 1) SEND OTP
export function sendOtpAction({ data }: { data: any }): AppThunk {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { email, password, confirmPassword } = getState().auth.signUpData;
      const response = await apiConnector('POST', AUTH_API.SEND_OTP, {
        email,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        dispatch(setEmailSent(true));
        toast.success('OTP sent! Check your inbox.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error sending OTP.');
      } else {
        toast.error('An unexpected error occurred.');
      }
      dispatch(setEmailSent(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 2) SIGN UP (with OTP)
export function signUpAction({otp}: any): AppThunk {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { email, password } = getState().auth.signUpData;
      const response = await apiConnector('POST', AUTH_API.SIGNIN, {
        email,
        password,
        otp,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        dispatch(setToken(token));
        toast.success('Signup successful!');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error during signup.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 3) LOGIN
export function loginAction({ email, password }: Record<string, string>): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.LOGIN, {
        email,
        password,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        dispatch(setToken(token));
        toast.success('Logged in successfully');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error during login.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 4) CHANGE PASSWORD
interface ChangePasswordProps {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export function changePasswordAction({
  email,
  oldPassword,
  newPassword,
  confirmPassword,
}: ChangePasswordProps): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.CHANGE_PASSWORD, {
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (response.data.success) {
        toast.success('Password changed successfully');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error changing password.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 5) LOGOUT
export function logoutAction(): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.LOGOUT, null);
      if (response.data.success) {
        dispatch(setToken(null));
        toast.success('Logged out successfully');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error during logout.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 6) REQUEST RESET PASSWORD TOKEN
export function requestResetTokenAction({ email }: { email: string }): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        'POST',
        AUTH_API.RESET_PASSWORD_TOKEN,
        { email }
      );
      if (response.data.success) {
        dispatch(setEmailSent(true));
        toast.success('Reset link sent. Check your inbox.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error sending reset email.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 7) RESET PASSWORD
interface ResetPasswordProps {
  token: string;
  password?: string;
  confirmPassword?: string;
}
export function resetPasswordAction({
  token,
  password,
  confirmPassword,
}: ResetPasswordProps): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.RESET_PASSWORD, {
        token,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        toast.success('Password reset successfully');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error resetting password.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 8) GOOGLE AUTH
export function googleAuthAction({ code }: { code: string }): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.GOOGLE_AUTH, {
        code,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Error logging in.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}