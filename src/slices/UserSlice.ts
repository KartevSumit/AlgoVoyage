import { createSlice } from '@reduxjs/toolkit';
import image from '../assets/defaultImage.png'

const initialState = {
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  dp: localStorage.getItem('dp') ? localStorage.getItem('dp') : image,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setDp(state, action) {
      state.dp = action.payload;
    },
  },
});

export const { setUser, setDp } = userSlice.actions;
export default userSlice.reducer;
