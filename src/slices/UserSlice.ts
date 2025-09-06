import { createSlice } from '@reduxjs/toolkit';
import image from '../assets/defaultImage.png';

const getUser = localStorage.getItem('user');

const initialState = {
  user: getUser ? JSON.parse(getUser) : null,
  dp: localStorage.getItem('dp') ? localStorage.getItem('dp') : image,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setDp(state, action) {
      state.dp = action.payload;
    },
  },
});

export const { setUser, setDp } = userSlice.actions;
export default userSlice.reducer;
