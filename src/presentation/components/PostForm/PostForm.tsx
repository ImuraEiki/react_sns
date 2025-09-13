import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { AppDispatch } from '../../../store/store';
import { PostRepositoryImpl } from '../../../data/repositories/PostRepository';
import { AddPostUseCase } from '../../../domain/usecase/AddPostUseCase';
import { PostFormPresenter } from '../../presenters/PostFormPresenter';
import { selectUser } from '../../../store/userSlice';
import { addPostSync } from '../../../store/postsSlice';

export const PostForm = () => {
  const [content, setContent] = useState('');
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUser).users;
  const loginUser = users.find((user) => user.email === session?.user?.email);

  // ユースケースとプレゼンターの初期化
  const postRepository = new PostRepositoryImpl(dispatch);
  const addPostUseCase = new AddPostUseCase(postRepository);
  const presenter = new PostFormPresenter();

  // ViewModelを取得
  const viewModel = presenter.toViewModel(content);

  if (!session) {
    return (
      <div>
        <p>サインインが必要です。</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPostUseCase.execute(content, loginUser?.id);
      dispatch(
      addPostSync({
          content: content,
          userId: loginUser?.id || 0,
      }),
    );
      setContent(viewModel.resetForm()); // フォームをリセット
    } catch (error) {
      console.error('投稿エラー:', error);
      // TODO: ユーザー向けエラーメッセージを表示
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <textarea
        className="w-full p-2 border rounded-lg"
        rows={3}
        placeholder="何を考えていますか？"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        disabled={!viewModel.canSubmit}
      >
        投稿する
      </button>
    </form>
  );
};