import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { CommentElement } from '../CommentElement';
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

describe('CommentElement コンポーネントのテスト', () => {
  test('コメントが表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    const props = {
      postId: 5001,
      isCommentDisp: true
    }
    renderWithProviders(
      <CommentElement {...props} />,
      {
        preloadedState: {},
      },
      session,
    );

    expect(screen.getByText(/コメントです/i)).toBeInTheDocument();
  });
  test('コメントの件数が表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <CommentElement postId={5001} />,
      {
        preloadedState: {},
      },
      session,
    );

    expect(screen.getByText(/コメント件数\[3\]/i)).toBeInTheDocument();
  });
});
