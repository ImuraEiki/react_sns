import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dummy_users from '../data/dummy_users.json';
import { User } from '../domain/entities/User';

interface UsersState {
  users: User[];
}

const initialUsers = [
  {
    id: 501,
    name: 'eiki',
    email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1 || '',
  },
  {
    id: 502,
    name: 'iimura',
    email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL2 || '',
  },
];

const initialState: UsersState = {
  users: dummy_users.concat(initialUsers),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newId = state.users.length > 0 ? Math.max(...state.users.map(u => u.id)) + 1 : 1; 
      state.users.unshift({ id: newId, ...action.payload });
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
export const selectUser = (state: RootState) => state.user;
