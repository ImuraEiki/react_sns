import { createAsyncThunk } from "@reduxjs/toolkit";
import { Following } from "../domain/entities/Following";

export const addFollowing = createAsyncThunk(
  'followings/addFollowing',
  async (following: Omit<Following, 'id'>) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/followings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(following),
    });

    if (!response.ok) throw new Error('フォロー情報の追加に失敗しました');

    return (await response.json()) as Following;
  },
);

// 非同期のフォロー情報データ取得処理
export const fetchFollowings = createAsyncThunk('followings/fetchFollowings', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/followings');
  if (!response.ok) throw new Error('フォロー情報の取得に失敗しました');
  return (await response.json()) as Following[];
});

export const fetchFollowingByUserId= createAsyncThunk('followings/fetchFollowingByUserId', async (followingId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/followings/user/' + followingId);
  if (!response.ok) throw new Error('フォロー情報の取得に失敗しました');
  return (await response.json()) as Following[];
}); 

export interface DeleteFollowingResponse {
  id: number
  deleted: boolean
}

export const deleteFollowing = createAsyncThunk(
  'followings/deleteFollowing',
  async (following: Omit<Following, 'followUserId' | 'followedUserId'>) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/followings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(following),
    });

    if (!response.ok) throw new Error('フォロー情報の削除に失敗しました');

    return (await response.json()) as DeleteFollowingResponse;
  },
);