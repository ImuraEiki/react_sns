import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../store/postsSlice';
import userReducer from '../store/userSlice';
import followingReducer from '../store/followingSlice';
import commentReducer from '../store/commentSlice';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Profile from '../pages/profile';
import Home from '../pages';

// ユーティリティ関数：モックストアの作成
const renderWithProviders = (
  ui: ReactNode,
  preloadedState = {},
  session: Session | null,
) => {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
      user: userReducer,
      following: followingReducer,
      comment: commentReducer
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <SessionProvider session={session}>{ui}</SessionProvider>
    </Provider>,
  );
};

describe('Homeコンポーネントのテスト', () => {
  test('ホーム画面(index.tsx)が表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki2', email: 'test@test.com', image: '' },
    };
    renderWithProviders(
      <Home />,
      {
        user: {
          users: [
            {
              id: 501,
              name: 'eiki',
              email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1 || '',
            },
            {
              id: 502,
              name: 'iimura',
              email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL2 || '',
            },
            {
              id: 503,
              name: 'eiki2',
              email: 'test@test.com',
            }
          ]
        },
        posts: {
          posts: [
            { id: 5001, content: '初めての投稿！', likes: 3, userId: 503 },
            { id: 5002, content: 'Redux Toolkit のテスト投稿', likes: 7, userId: 503 },
            { id: 5003, content: 'Go の API も作る予定', likes: 5, userId: 503 },
            { id: 5004, content: '初めての投稿！', likes: 3, userId: 502 },
            { id: 5005, content: 'Redux Toolkit のテスト投稿', likes: 7, userId: 502 },
            { id: 5006, content: 'Go の API も作る予定', likes: 5, userId: 502 },
          ],
          loading: false,
          error: null,
        },
        following: {
          followings: [
            {
              id: 1,
              follow_id: 503,
              followed_id: 502,
            },
            {
              id: 2,
              follow_id: 503,
              followed_id: 501,
            },
        ]},
        comment: {comments: []}
      },
      session,
    );
    
    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '初めての投稿！' })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: 'Redux Toolkit のテスト投稿' })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: 'Go の API も作る予定' })[0]).toBeDefined();
    expect(screen.getByText(/投稿する/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/何を考えていますか？/i),
    ).toBeInTheDocument();
  });
});
