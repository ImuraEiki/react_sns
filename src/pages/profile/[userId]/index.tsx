import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { followUser, unfollowUser, addComment } from '../../../store/userSlice';
import { likePost, selectPosts } from '../../../store/postsSlice';
import { selectAuth } from '../../../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../../../store/userSlice';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { userId } = useParams();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  // const user = useSelector((state) => state.users.find(user => user.id === userId));
  const currentUser = useSelector(selectUser).user.users.filter(
    (v) => v.name === session?.user?.name,
  )[0];

  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  const userPosts = posts.filter((post) => post.auther === currentUser.name);
  // const isFollowing = currentUser.following.includes(userId);

  // const handleFollow = () => {
  //   if (isFollowing) {
  //     dispatch(unfollowUser(userId));
  //   } else {
  //     dispatch(followUser(userId));
  //   }
  // };

  // const handleAddComment = (postId, comment) => {
  //   dispatch(addComment({ postId, comment }));
  // };

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(session.user?.name)}
        />
        <h1>{session.user?.name}'s Profile</h1>
        <p>{session.user?.email}</p>
        {/* <button onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button> */}
        <h2>Posts by {session.user?.name}</h2>
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
