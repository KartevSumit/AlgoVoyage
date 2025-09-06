import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface decodedToken {
  exp: number;
}

function getToken(): string | null {
  const token = localStorage.getItem('token') || null;
  if (!token) {
    return null;
  } else {
    const decoded: decodedToken = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  }
}

const initialState = {
  signUpData: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  loading: false,
  token: getToken(),
  emailSent: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setEmailSent(state, action) {
      state.emailSent = action.payload;
    },
  },
});

export const { setSignUpData, setLoading, setToken, setEmailSent } =
  authSlice.actions;
export default authSlice.reducer;
