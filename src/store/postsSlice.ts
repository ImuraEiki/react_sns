import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Post } from '../domain/entities/Post';
import { addPost, fetchPostById, fetchPosts } from '../api/postApi';

// ステートの型
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// 初期状態
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // TODO: APIレスポンス実装したら消す。
    addPostSync: (state, action: PayloadAction<Omit<Post, 'id' | 'likes'>>) => {
      state.posts.push({
        id: 0,
        content: action.payload.content,
        likes: 0,
        userId: action.payload.userId,
      });
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) post.likes += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'エラーが発生しました';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.fulfilled, (state) => {
        state.loading = false;
        // APIからは何も返ってこない。
        // TODO: 投稿した内容を返す。
      });
  },
});

export const { addPostSync, likePost } = postsSlice.actions;
export default postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts;