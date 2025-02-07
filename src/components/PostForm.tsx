import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addPost, addPostAsync } from '../store/postsSlice';
import { selectAuth } from '../store/authSlice';

export const PostForm = () => {
  const { isAuthenticated, user } = useSelector(selectAuth);
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  if (!isAuthenticated) {
    return <p>ログインして投稿してください！</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // await dispatch(addPostAsync(content));
    dispatch(
      addPost({
        content: content,
        auther: user.name,
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
