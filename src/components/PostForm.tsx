import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addPost, addPostAsync } from '../store/postsSlice';
import { selectAuth } from '../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../store/userSlice';

export const PostForm = () => {
  const { isAuthenticated, user } = useSelector(selectAuth);
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // if (!isAuthenticated) {
  //   return <p>ログインして投稿してください！</p>;
  // }

  const { data: session, status } = useSession();
  const currentUser = useSelector(selectUser).users.filter(
    (v) => v.email === session?.user?.email,
  )[0];

  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session)
    return (
      <div>
        <p>サインインが必要です。</p>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // await dispatch(addPostAsync(content));
    dispatch(
      addPost({
        content: content,
        userId: currentUser?.id,
      }),
    );
    setContent(''); // フォームをリセット
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
      >
        投稿する
      </button>
    </form>
  );
};
