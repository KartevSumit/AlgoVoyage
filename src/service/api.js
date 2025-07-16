const BASE_URL = import.meta.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_VERSION = '/api/v1';

// Auth API endpoints
export const AUTH_API = {
  SEND_OTP: `${BASE_URL}${API_VERSION}/auth/sendOtp`,
  SIGNIN: `${BASE_URL}${API_VERSION}/auth/signIn`,
  LOGIN: `${BASE_URL}${API_VERSION}/auth/login`,
  CHANGE_PASSWORD: `${BASE_URL}${API_VERSION}/auth/changePassword`,
  LOGOUT: `${BASE_URL}${API_VERSION}/auth/logout`,
  RESET_PASSWORD_TOKEN: `${BASE_URL}${API_VERSION}/auth/resetPasswordToken`,
  RESET_PASSWORD: `${BASE_URL}${API_VERSION}/auth/resetPassword`,
};
