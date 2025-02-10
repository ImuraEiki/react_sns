import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { followUser, unfollowUser, addComment } from '../../../store/userSlice';
import { likePost, selectPosts } from '../../../store/postsSlice';
import { selectAuth } from '../../../store/authSlice';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  // const user = useSelector((state) => state.users.find(user => user.id === userId));
  const currentUser = useSelector(selectAuth).user;

  const userPosts = posts.filter(post => post.auther === currentUser.name);
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
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h1>{user?.name}'s Profile</h1>
        <p>{user?.email}</p>
        {/* <button onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button> */}
        <h2>Posts by {user?.name}</h2>
        {userPosts.map(post => (
          <div
            key={post.id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
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
