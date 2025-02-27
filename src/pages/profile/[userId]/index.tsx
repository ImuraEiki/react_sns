import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { followUser, unfollowUser, addComment } from '../../../store/userSlice';
import { likePost, selectPosts } from '../../../store/postsSlice';
import { selectAuth } from '../../../store/authSlice';
import { useSession } from 'next-auth/react';
import { selectUser } from '../../../store/userSlice';
import Link from 'next/link';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { userId } = useParams();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  // const user = useSelector((state) => state.users.find(user => user.id === userId));
  const currentUser = useSelector(selectUser).user.users.filter(
    (v) => v.email === session?.user?.email,
  )[0];

  if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  const userPosts = posts.filter((post) => post.userId === currentUser?.id);
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
          alt={String(currentUser?.name)}
        />
        <div>
          {currentUser?.name}'s Profile
          <Link
            href={{
              pathname: '/setting/[userId]',
              query: { userId: currentUser?.id || 0 },
            }}
            className="hover:underline"
          >
            &nbsp;⚙
          </Link>
        </div>
        {/* <p>{session.user?.email}</p> */}
        {/* <button onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button> */}
        {userPosts.length > 0 && <h2>Posts by {currentUser?.name}</h2>}
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
