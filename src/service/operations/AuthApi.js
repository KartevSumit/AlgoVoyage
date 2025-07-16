import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { AUTH_API } from '../api';
import { setLoading, setToken, setEmailSent } from '../../slices/AuthSlice';

// 1) SEND OTP
export function sendOtpAction({ data }) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      console.log(getState().auth.signUpData);
      const { email, password, confirmPassword } = getState().auth.signUpData;
      const response = await apiConnector('POST', AUTH_API.SEND_OTP, {
        email,
        password,
        confirmPassword,
      });
      console.log(response);
      if (response.data.success) {
        dispatch(setEmailSent(true));
        toast.success('OTP sent! Check your inbox.');
      } else {
        throw new Error(response.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('error:', err);
      dispatch(setEmailSent(false));
      toast.error(err.response.data.error || 'Error sending OTP.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 2) SIGN UP (with OTP)
export function signUpAction(otp) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { email, password } = getState().auth.signUpData;
      console.log('damn', email, password, otp);
      const response = await apiConnector('POST', AUTH_API.SIGNIN, {
        email,
        password,
        otp,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        console.log(response);
        dispatch(setToken(token));
        toast.success('Signup successful!');
      } else {
        throw new Error(response.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err.response.data);
      toast.error(err.response.data.error || 'Error during signup.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 3) LOGIN
export function loginAction({ email, password }) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.LOGIN, {
        email,
        password,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        console.log(response);
        dispatch(setToken(token));
        toast.success('Logged in successfully');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || 'Error during login.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 4) CHANGE PASSWORD
export function changePasswordAction({
  email,
  oldPassword,
  newPassword,
  confirmPassword,
}) {
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
      } else {
        throw new Error(response.data.message || 'Change password failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || 'Error changing password.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 5) LOGOUT
export function logoutAction() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', AUTH_API.LOGOUT);
      if (response.data.success) {
        dispatch(setToken(null));
        toast.success('Logged out successfully');
      } else {
        throw new Error(response.data.message || 'Logout failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || 'Error during logout.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 6) REQUEST RESET PASSWORD TOKEN
export function requestResetTokenAction({ email }) {
  return async (dispatch, getState) => {
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
      } else {
        throw new Error(response.data.message || 'Failed to send reset link');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || 'Error sending reset email.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 7) RESET PASSWORD
export function resetPasswordAction({ token, password, confirmPassword }) {
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
      } else {
        throw new Error(response.data.message || 'Reset password failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || 'Error resetting password.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}
