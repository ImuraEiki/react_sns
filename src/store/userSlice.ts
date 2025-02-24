import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface User {
  id: number;
  auth0_sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      auth0_sub: '',
      name: 'eiki',
    },
    {
      id: 2,
      auth0_sub: '',
      name: 'iimura',
    },
    {
      id: 3,
      auth0_sub: '',
      name: 'iimura1560222',
    },
  ],
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
  },
});

export const { createUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state;
