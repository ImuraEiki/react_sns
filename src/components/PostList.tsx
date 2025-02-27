import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  likePost,
  selectPosts,
  setCurrentPage,
} from '../store/postsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { selectUser } from '../store/userSlice';
import Link from 'next/link';

export const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, currentPage, postsPerPage } =
    useSelector(selectPosts);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const users = useSelector(selectUser).user.users;

  // 総ページ数の計算
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
        >
          <p>{post.content}</p>
          <button onClick={() => dispatch(likePost(Number(post.id)))}>
            ❤️ {post.likes}
          </button>
          <div>
            <Link
              href={{
                pathname: '/user/[userId]',
                query: { userId: post.userId },
              }}
              className="hover:underline"
            >
              {users.filter(v => v.id === post.userId)[0].name}
            </Link>
          </div>
        </div>
      ))}
      {/* <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};
