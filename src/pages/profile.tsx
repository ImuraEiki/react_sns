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

export default function Profile() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const users = useSelector(selectUser).user.users;
  const loginUser = users.filter(
    (v) => v.email === session?.user?.email,
  )[0];
  const followings = useSelector(selectfollowing).followings;
  const loginUserFollowings = followings.filter(following => following.follow_id === loginUser.id);
  const followingUsers = users.filter(user => loginUserFollowings.some(v => v.followed_id === user.id));
  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  const userPosts = posts.filter((post) => post.userId === loginUser?.id);

  // const handleAddComment = (postId, comment) => {
  //   dispatch(addComment({ postId, comment }));
  // };

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(loginUser?.name)}
        />
        <div>
          {loginUser?.name}'s Profile
          <Link
            href='/setting'
            className="hover:underline"
          >
            &nbsp;⚙
          </Link>
        </div>
        {userPosts.length > 0 && <h2>Posts by {loginUser?.name}</h2>}
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
        {followingUsers.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>
    )
  );
}
