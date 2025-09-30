import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { PostList } from '../PostList';
import { ReactNode } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

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

describe('PostList コンポーネントのテスト', () => {
  test('投稿一覧が表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {
        preloadedState: {},
      },
      session,
    );

    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    expect(screen.getByText(/クールサラダホイールベルベット普通のトリビュート/i)).toBeInTheDocument();
  });
  test('初期表示で「すべての投稿」ボタンがactiveの状態になっている', async () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session,
    );

    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    const allPostsButton = screen.getByRole('button', {name: 'すべての投稿'});
    expect(allPostsButton).toBeDefined();
    expect(allPostsButton).toHaveClass('border-blue-500');
  });
  test('フォロー中ボタンを押下するとactiveの状態になっている', async () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki2', email: 'test@test.com', image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session,
    );

    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    const followingButton = screen.getByRole('button', {name: 'フォロー中'});
    expect(followingButton).toBeDefined();
    fireEvent.click(followingButton);
    expect(followingButton).toHaveClass('border-blue-500');
  });  
  test('フォロー中ボタンを押下するとフォロー中のユーザーの投稿が表示される', async () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki2', email: 'test@test.com', image: '' },
    };
    renderWithProviders(
      <PostList />,
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
            { id: 5001, content: '初めての投稿！', likes: 3, userId: 501 },
            { id: 5002, content: 'Redux Toolkit のテスト投稿', likes: 7, userId: 501 },
            { id: 5003, content: 'Go の API も作る予定', likes: 5, userId: 501 },
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
              followUserId: 503,
              followedUserId: 502,
            },
            {
              id: 2,
              followUserId: 503,
              followedUserId: 501,
            },
        ]},
        comment: {comments: []}
      },
      session,
    );

    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    const followingButton = screen.getByRole('button', {name: 'フォロー中'});
    expect(followingButton).toBeDefined();
    fireEvent.click(followingButton);
    expect(screen.getAllByRole('link', { name: '初めての投稿！' })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: 'Redux Toolkit のテスト投稿' })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: 'Go の API も作る予定' })[0]).toBeDefined();
  });  
});
