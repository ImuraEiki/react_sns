import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/authSlice';
import postsReducer from '../../store/postsSlice';
import { PostForm } from '../PostForm';
import { ReactNode } from 'react';

// ユーティリティ関数：モックストアの作成
const renderWithProviders = (ui: ReactNode, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
    },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('PostForm コンポーネントのテスト', () => {
  test('認証されていない場合、ログインメッセージが表示される', () => {
    renderWithProviders(<PostForm />, {
      preloadedState: {
        auth: { user: null, isAuthenticated: false },
      },
    });

    expect(
      screen.getByText(/ログインして投稿してください/i),
    ).toBeInTheDocument();
  });

  test('認証されている場合、投稿フォームが表示される', () => {
    const mockUser = {
      name: 'テストユーザー',
      email: 'test@example.com',
      picture: '',
    };

    renderWithProviders(<PostForm />, {
      preloadedState: {
        auth: { user: mockUser, isAuthenticated: true },
      },
    });

    expect(screen.getByText(/投稿する/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/何を考えていますか？/i),
    ).toBeInTheDocument();
  });

  test('投稿内容を入力し、フォームを送信できる', () => {
    const mockUser = {
      name: 'テストユーザー',
      email: 'test@example.com',
      picture: '',
    };

    renderWithProviders(<PostForm />, {
      preloadedState: {
        auth: { user: mockUser, isAuthenticated: true },
      },
    });

    const textarea = screen.getByPlaceholderText(/何を考えていますか？/i);
    const submitButton = screen.getByText(/投稿する/i);

    fireEvent.change(textarea, { target: { value: 'これはテスト投稿です。' } });
    fireEvent.click(submitButton);

    // 投稿後にテキストエリアがクリアされるか確認
    expect(textarea).toHaveValue('');
  });
});
