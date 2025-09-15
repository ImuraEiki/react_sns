import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../domain/entities/Post";

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post: Omit<Post, 'id' | 'likes'>) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (!response.ok) throw new Error('投稿の追加に失敗しました');

    return (await response.json()) as {"message": string};
  },
);

// 非同期の投稿データ取得処理
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/posts'); // Go の API にリクエスト
  if (!response.ok) throw new Error('投稿の取得に失敗しました');
  return (await response.json()) as Post[];
});

export const fetchPostById= createAsyncThunk('posts/fetchPostById', async (postId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/posts/' + postId);
  if (!response.ok) throw new Error('投稿の取得に失敗しました');
  return (await response.json()) as Post;
}); 