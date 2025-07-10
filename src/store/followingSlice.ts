import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface following {
  id: number;
  follow_id: number;
  followed_id: number;
}

interface followingState {
  followings: following[];
}

const initialState: followingState = {
  followings: [
    {
      id: 1,
      follow_id: 501,
      followed_id: 502,
    },
    {
      id: 2,
      follow_id: 502,
      followed_id: 501,
    },
    {
      id: 3,
      follow_id: 6,
      followed_id: 501,
    },
  ],
};

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    followUser: (
      state,
      action: PayloadAction<{ follow_id: number; followed_id: number }>,
    ) => {
      state.followings.unshift({
        id: state.followings.length + 1,
        follow_id: action.payload.follow_id,
        followed_id: action.payload.followed_id,
      });
    },
    unFollowUser: (
      state,
      action: PayloadAction<{ follow_id: number; followed_id: number }>,
    ) => {
      const newFollowings = state.followings
        .filter((v) => !(v.follow_id === action.payload.follow_id && v.followed_id === action.payload.followed_id));
      state.followings = newFollowings; 
    },
  },
});

export const { followUser, unFollowUser } = followingSlice.actions;
export default followingSlice.reducer;
export const selectfollowing = (state: RootState) => state.following;
