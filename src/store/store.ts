import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer, // 投稿一覧の状態を管理
  },
});

// 型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
