import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  followUser,
  selectfollowing,
  unFollowUser,
} from '../../../store/followingSlice';
import { likePost, selectPosts } from '../../../store/postsSlice';
import { selectAuth } from '../../../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../../../store/userSlice';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoginUser } from '../../../hooks/loginUserHooks';
import { PostElement } from '../../../components/PostElement';

export default function User() {
  const pathname = usePathname();
<<<<<<< HEAD
  const { loginUser, session } = useLoginUser();
=======
  const {loginUser, session} = useLoginUser();
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const displayUser = useSelector(selectUser).users.filter(
    (v) => v.id === Number(pathname?.replace(/\/user\//, '')),
  )[0];

  const userPosts = posts.filter((post) => post.userId === displayUser?.id);
  const users = useSelector(selectUser).users;
  const loginUserFollowing = useSelector(selectfollowing).followings.filter(
    (following) => following.follow_id === loginUser?.id,
  );
  const isFollowing =
    loginUserFollowing.filter(
      (following) => following.followed_id === displayUser.id,
    ).length > 0;

  const handleFollow = () => {
    if (!loginUser) return;
    if (isFollowing) {
      dispatch(
        unFollowUser({ follow_id: loginUser.id, followed_id: displayUser.id }),
      );
    } else {
      dispatch(
        followUser({ follow_id: loginUser.id, followed_id: displayUser.id }),
      );
    }
  };

  // if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(displayUser?.name)}
        />
        <div>{displayUser?.name}'s Profile</div>
<<<<<<< HEAD
        {displayUser?.id !== loginUser?.id && (
=======
        {displayUser?.id !== loginUser?.id && 
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
          <button
            className={
              'px-4 py-2 text-white rounded-lg' +
              (isFollowing
                ? ' bg-red-500 hover:bg-red-600'
                : ' bg-blue-500 hover:bg-blue-600')
            }
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
<<<<<<< HEAD
          </button>
        )}
=======
          </button>}
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
        {userPosts.length > 0 && <h2>Posts by {displayUser?.name}</h2>}
        {userPosts.map((post) => (
          <PostElement post={post} />
        ))}
      </div>
    )
  );
}
