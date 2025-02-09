import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { generatePosts } from '../utils/generateTestData';

// 投稿データの型
interface Post {
  id: number;
  content: string;
  likes: number;
  auther: string | null;
}

// 初期データ（仮の投稿）
// const initialPosts: Post[] = [
//   { id: 1, content: '初めての投稿！', likes: 3, auther: 'ei' },
//   { id: 2, content: 'Redux Toolkit のテスト投稿', likes: 7, auther: 'ei' },
//   { id: 3, content: 'Go の API も作る予定', likes: 5, auther: 'ei' },
// ];
// テストデータを生成
const initialPosts: Post[] = generatePosts();

// ステートの型
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  postsPerPage: number;
}

// 初期状態
const initialState: PostsState = {
  posts: initialPosts,
  loading: false,
  error: null,
  currentPage: 1,
  postsPerPage: 15,
};

export const addPostAsync = createAsyncThunk(
  'posts/addPost',
  async (content: string) => {
    const response = await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error('投稿の追加に失敗しました');

    return (await response.json()) as Post;
  },
);

// 非同期の投稿データ取得処理
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/api/posts'); // Go の API にリクエスト
  if (!response.ok) throw new Error('投稿の取得に失敗しました');
  return (await response.json()) as Post[];
});

// export const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     addPost: (state, action: PayloadAction<Post>) => {
//       state.posts.unshift(action.payload);
//     },
//     likePost: (state, action: PayloadAction<number>) => {
//       const post = state.posts.find((p) => p.id === action.payload);
//       if (post) post.likes += 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'エラーが発生しました';
//       });
//   },
// });

// テストデータを返す
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, 'id' | 'likes'>>) => {
      state.posts.unshift({
        id: state.posts[state.posts.length - 1].id + 1,
        content: action.payload.content,
        likes: 0,
        auther: action.payload.auther,
      });
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) post.likes += 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addPostAsync.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      },
    );
  },
});

export const { addPost, likePost, setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts;
