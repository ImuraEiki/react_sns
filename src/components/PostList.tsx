import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, likePost, selectPosts } from '../store/postsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { generatePosts } from '../utils/generateTestData';

export const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(selectPosts);
  const postsOfTest = generatePosts();

  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {postsOfTest.map((post) => (
        <div
          key={post.id}
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
        >
          <p>{post.content}</p>
          <button onClick={() => dispatch(likePost(Number(post.id)))}>
            ❤️ {post.likes}
          </button>
          <p>{post.auther}</p>
        </div>
      ))}
    </div>
  );
};
