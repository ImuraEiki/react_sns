import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dummy_users from '../data/dummy_users.json'

export interface User {
  id: number;
  name?: string;
  email?: string;
  picture?: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: dummy_users
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      // state.users.unshift(action.payload);
      // auth0上にも
    },
    clearUser: (state) => {
      // idで検索、userを消去
    },
    updateUsername: (
      state,
      action: PayloadAction<{ id: number; name: string }>,
    ) => {
      const user = state.users.find((p) => p.id === action.payload.id);
      if (user) user.name = action.payload.name;
      // TODO: APIでauth0上の登録も変更
    },
  },
});

export const { createUser, clearUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state;
