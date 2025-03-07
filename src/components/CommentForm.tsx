import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addPost, addPostAsync, selectPosts } from '../store/postsSlice';
import { selectAuth } from '../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../store/userSlice';
import { useLoginUser } from '../hooks/loginUserHooks';
import { addComment } from '../store/commentSlice';
import { usePathname } from 'next/navigation';

export const CommentForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loginUser, session } = useLoginUser();
  const pathname = usePathname();
  const post = useSelector(selectPosts).posts.filter(
    (v) => v.id == Number(pathname?.replace(/\/post\/detail\//, '')),
  )[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // await dispatch(addPostAsync(content));
    dispatch(
      addComment({
        content: content,
        postId: post.id,
        userId: loginUser?.id,
      }),
    );
    setContent(''); // フォームをリセット
  };
  if (!session) return <p>サインインが必要です。</p>;
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <textarea
        className="w-full p-2 border rounded-lg"
        rows={3}
        placeholder="返信"
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
