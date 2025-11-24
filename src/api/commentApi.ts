import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../domain/entities/Comment";

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });

    if (!response.ok) throw new Error('コメントの追加に失敗しました');

    return (await response.json()) as Comment;
  },
);

// 非同期のコメントデータ取得処理
export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments');
  if (!response.ok) throw new Error('コメントの取得に失敗しました');
  return (await response.json()) as Comment[];
});

export const fetchCommentsByPostId= createAsyncThunk('comments/fetchCommentsByPostId', async (postId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments/posts/' + postId);
  if (!response.ok) throw new Error('コメントの取得に失敗しました');
  return (await response.json()) as Comment[];
}); 