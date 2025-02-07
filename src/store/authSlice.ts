import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    picture: '',
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
