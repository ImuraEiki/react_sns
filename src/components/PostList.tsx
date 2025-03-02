import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  likePost,
  selectPosts,
  setCurrentPage,
} from '../store/postsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { selectUser } from '../store/userSlice';
import { selectfollowing } from '../store/followingSlice';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Tab } from './Tab';
import { CommentElement } from './Comment';

export const PostList = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, currentPage, postsPerPage } =
    useSelector(selectPosts);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const users = useSelector(selectUser).users;

  // 総ページ数の計算
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(1);
  const activeTabClass =
    ' text-blue-500 border-b-2 font-medium border-blue-500';

  const loginUser = users.filter((v) => v.email === session?.user?.email)[0];
  const followings = useSelector(selectfollowing).followings;
  const loginUserFollowings = followings.filter(
    (following) => following.follow_id === loginUser?.id,
  );
  const followingUsers = users.filter((user) =>
    loginUserFollowings.some((v) => v.followed_id === user.id),
  );
  const followingUsersPosts = posts.filter((post) =>
    followingUsers.some(
      (followingUser) =>
        followingUser.id === post.userId || loginUser.id === post.userId,
    ),
  );

  const displayPosts = activeTab === 1 ? posts : followingUsersPosts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} titles={['すべての投稿', 'フォロー中']} />
      <div className="py-4 grid grid-cols-4 gap-4">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
            }}
            className="rounded-xl"
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
                {users.filter((v) => v.id === post.userId)[0].name}
              </Link>
            </div>
            <CommentElement postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
