import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import { PostForm } from '../PostForm';
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
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <SessionProvider session={session}>{ui}</SessionProvider>
    </Provider>,
  );
};

describe('PostForm コンポーネントのテスト', () => {
  test('認証されていない場合、ログインメッセージが表示される', () => {
    const session = null;
    renderWithProviders(
      <PostForm />,
      {},
      session,
    );
    expect(screen.getByText(/サインインが必要です/i)).toBeInTheDocument();
  });

  test('認証されている場合、投稿フォームが表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: '', email: '', image: '' },
    };
    renderWithProviders(
      <PostForm />,
      {},
      session,
    );

    expect(screen.getByText(/投稿する/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/何を考えていますか？/i),
    ).toBeInTheDocument();
  });

  test('投稿内容を入力し、フォームを送信できる', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: '', email: '', image: '' },
    };
    renderWithProviders(
      <PostForm />,
      {},
      session,
    );

    const textarea = screen.getByPlaceholderText(/何を考えていますか？/i);
    const submitButton = screen.getByText(/投稿する/i);

    fireEvent.change(textarea, { target: { value: 'これはテスト投稿です。' } });
    fireEvent.click(submitButton);

    // 投稿後にテキストエリアがクリアされるか確認
    expect(textarea).toHaveValue('');
  });
});
