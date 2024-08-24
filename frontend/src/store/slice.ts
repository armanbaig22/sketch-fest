// src/redux/slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  avatar: string;
}

const initialState: UserState = {
  username: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string; avatar: string }>) {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
