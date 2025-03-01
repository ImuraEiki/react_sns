import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import followingReducer from './followingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    posts: postsReducer,
    following: followingReducer,
  },
});

// 型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
