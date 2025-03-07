import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
}

interface commentState {
  comments: comment[];
}

const initialState: commentState = {
  comments: [
    {
      id: 1,
      content: 'コメント',
      postId: 5001,
      userId: 502,
    },
    {
      id: 2,
      content: 'コメントです',
      postId: 5001,
      userId: 502,
    },
    {
      id: 3,
      content: 'コメントだよ',
      postId: 5001,
      userId: 502,
    },
  ],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{
        content: string;
        postId: number;
        userId: number;
      }>,
    ) => {
      state.comments.unshift({
        id: state.comments.length + 1,
        content: action.payload.content,
        postId: action.payload.postId,
        userId: action.payload.userId,
      });
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
export const selectComment = (state: RootState) => state.comment;
