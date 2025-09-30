import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Following } from '../domain/entities/Following';

interface followingState {
  followings: Following[];
}

const initialState: followingState = {
  followings: [
    {
      id: 1,
      followUserId: 501,
      followedUserId: 502,
    },
    {
      id: 2,
      followUserId: 502,
      followedUserId: 501,
    },
    {
      id: 3,
      followUserId: 6,
      followedUserId: 501,
    },
  ],
};

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    // followUser: (
    //   state,
    //   action: PayloadAction<{ followUserId: number; followedUserId: number }>,
    // ) => {
    //   state.followings.unshift({
    //     id: state.followings.length + 1,
    //     followUserId: action.payload.followUserId,
    //     followedUserId: action.payload.followedUserId,
    //   });
    // },
    // unFollowUser: (
    //   state,
    //   action: PayloadAction<{ followUserId: number; followedUserId: number }>,
    // ) => {
    //   const newFollowings = state.followings
    //     .filter((v) => !(v.followUserId === action.payload.followUserId && v.followedUserId === action.payload.followedUserId));
    //   state.followings = newFollowings; 
    // },
  },
});

// export const { followUser, unFollowUser } = followingSlice.actions;
export default followingSlice.reducer;
export const selectfollowing = (state: RootState) => state.following;
