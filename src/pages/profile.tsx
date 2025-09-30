import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postsSlice';
import { selectUser } from '../store/userSlice';
import Link from 'next/link';
import { selectfollowing } from '../store/followingSlice';
import { PostForm } from '../components/PostForm';
import { Tab } from '../components/Tab';
import { PostElement } from '../components/PostElement';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const posts = useSelector(selectPosts).posts;
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
  const loginUserfollowingUsers = users.filter((user) =>
    followings.filter(
      (following) => following.followUserId === loginUser?.id
    ).some(v => v.followedUserId === user.id));
  const loginUserFollowers = users.filter((user) => 
    followings.filter(
      (following) => following.followedUserId === loginUser?.id
    ).some(v => v.followUserId === user.id));

  // タブ切り替え
  const [activeTab, setActiveTab] = useState(1);

  // if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  const userPosts = posts.filter((post) => post.userId === loginUser?.id);
  const activeTabClass =
    ' text-blue-500 border-b-2 font-medium border-blue-500';

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
              <PostElement post={post} />
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
