import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followUser, selectfollowing, unFollowUser } from '../../../store/followingSlice';
import { likePost, selectPosts } from '../../../store/postsSlice';
import { selectAuth } from '../../../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../../../store/userSlice';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function User() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const displayUser = useSelector(selectUser).user.users.filter(
    (v) => v.id === Number(pathname?.replace(/\/user\//, '')),
  )[0];

  const userPosts = posts.filter((post) => post.userId === displayUser?.id);
  const users = useSelector(selectUser).user.users;
  const loginUser = users.filter(user => user.email === session?.user?.email)[0];
  const loginUserFollowing = 
    useSelector(selectfollowing).followings.filter(
        following => 
          following.follow_id === loginUser.id
      );
  const isFollowing = loginUserFollowing.filter(following => following.followed_id === displayUser.id).length > 0;
  
  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unFollowUser({follow_id: loginUser.id, followed_id: displayUser.id}));
    } else {
      dispatch(followUser({follow_id: loginUser.id, followed_id: displayUser.id}));
    }
  };

  // const handleAddComment = (postId, comment) => {
  //   dispatch(addComment({ postId, comment }));
  // };

  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(displayUser?.name)}
        />
        <div>{displayUser?.name}'s Profile</div>
        {/* <p>{session.user?.email}</p> */}
        <button 
          className={"px-4 py-2 text-white rounded-lg" + (isFollowing ? " bg-red-500 hover:bg-red-600" : " bg-blue-500 hover:bg-blue-600")}
          onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {userPosts.length > 0 && <h2>Posts by {displayUser?.name}</h2>}
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
          </div>
        ))}
      </div>
    )
  );
}
