import React, { useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likePost, selectPosts } from '../store/postsSlice';
import { selectAuth } from '../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../store/userSlice';
import Link from 'next/link';
import { selectfollowing } from '../store/followingSlice';
import { PostForm } from '../components/PostForm';
import { Tab } from '../components/Tab';
import { targetUserFollowers, targetUserfollowingUsers } from '../utils/utils';
import { CommentElement } from '../components/Comment';
import { useLoginUser } from '../hooks/loginUserHooks';

export default function Profile() {
  const {loginUser, session} = useLoginUser();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const loginUserfollowingUsers = targetUserfollowingUsers(loginUser);
  const loginUserFollowers = targetUserFollowers(loginUser);
  // タブ切り替え
  const [activeTab, setActiveTab] = useState(1);

  // if (status === 'loading') return <p>読み込み中...</p>;
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
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} titles={['投稿', 'フォロー中', 'フォロワー']} />
        {activeTab === 1 && userPosts.length > 0 && (
          <h2 className="py-2">Posts by {loginUser?.name}</h2>
        )}
        {activeTab === 1 &&
          <div className="py-4 grid grid-cols-4 gap-4">
            {userPosts.map((post) => (
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
                <CommentElement postId={post.id} />
              </div>
            ))}
          </div>  
        }
        {activeTab === 1 && <PostForm />}
        {activeTab === 2 &&
          loginUserfollowingUsers.map((user) => (
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
              {loginUserFollowers.some(v => v === user) ? <span className="text-gray-500"> フォローされています</span> : ''}
            </div>
          ))}
        {activeTab === 3 &&
          loginUserFollowers.map((user) => (
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
              {loginUserfollowingUsers.some(v => v === user) ? <span className="text-gray-500"> フォローしています</span> : ''}
            </div>
          ))}
      </div>
    )
  );
}
