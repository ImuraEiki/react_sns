import React, { useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { followUser, unfollowUser, addComment } from '../../../store/userSlice';
import { likePost, selectPosts } from '../store/postsSlice';
import { selectAuth } from '../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../store/userSlice';
import Link from 'next/link';
import { selectfollowing } from '../store/followingSlice';
import { PostForm } from '../components/PostForm';
import { Tab } from '../components/Tab';

export default function Profile() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const users = useSelector(selectUser).user.users;
  const loginUser = users.filter((v) => v.email === session?.user?.email)[0];
  const followings = useSelector(selectfollowing).followings;
  const loginUserFollowings = followings.filter(
    (following) => following.follow_id === loginUser?.id,
  );
  const followingUsers = users.filter((user) =>
    loginUserFollowings.some((v) => v.followed_id === user.id),
  );

  // タブ切り替え
  const [activeTab, setActiveTab] = useState(1);

  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  const userPosts = posts.filter((post) => post.userId === loginUser?.id);
  const activeTabClass =
    ' text-blue-500 border-b-2 font-medium border-blue-500';
  // const handleAddComment = (postId, comment) => {
  //   dispatch(addComment({ postId, comment }));
  // };

  return (
    session && (
      <div>
        <img src={String(session.user?.image)} alt={String(loginUser?.name)} />
        <div>
          {loginUser?.name}'s Profile
          <Link href="/setting" className="hover:underline">
            &nbsp;⚙
          </Link>
        </div>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} titles={['投稿', 'フォロー中']} />
        {activeTab === 1 && userPosts.length > 0 && (
          <h2 className="py-2">Posts by {loginUser?.name}</h2>
        )}
        {activeTab === 1 &&
          userPosts.map((post) => (
            <div
              key={post.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
              }}
            >
              <p>{post.content}</p>
              <button onClick={() => dispatch(likePost(Number(post.id)))}>
                ❤️ {post.likes}
              </button>
              {/* <CommentSection postId={post.id} onAddComment={handleAddComment} /> */}
            </div>
          ))}
        {activeTab === 1 && <PostForm />}
        {activeTab === 2 &&
          followingUsers.map((user) => (
            <div className="py-2 px-6">
              <Link
                href={{
                  pathname: '/user/[userId]',
                  query: { userId: user.id },
                }}
                className="hover:underline"
              >
                {user.name}
              </Link>
            </div>
          ))}
      </div>
    )
  );
}
