import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signUpData: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  loading: false,
  token: localStorage.getItem('token') || null,
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
