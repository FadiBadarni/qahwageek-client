import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCommentState } from './commentState';
import { LoadingStatus } from 'store/shared/commonState';
import { Comment } from 'models/comment';
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
} from './commentActions';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByPostId.pending, (state, action) => {
        const postId = action.meta.arg;
        state.commentsByPostId[postId] = {
          data: [],
          status: LoadingStatus.Loading,
          error: null,
        };
      })
      .addCase(
        getCommentsByPostId.fulfilled,
        (
          state,
          action: PayloadAction<{ postId: number; comments: Comment[] }>
        ) => {
          const { postId, comments } = action.payload;
          state.commentsByPostId[postId] = {
            data: comments,
            status: LoadingStatus.Succeeded,
            error: null,
          };
        }
      )
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.commentsByPostId[postId] = {
          data: [],
          status: LoadingStatus.Failed,
          error: action.error.message ?? 'Failed to fetch comments',
        };
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const comment = action.payload;
          const commentsState = state.commentsByPostId[comment.postId];
          if (commentsState && commentsState.data) {
            commentsState.data.push(comment);
            commentsState.status = LoadingStatus.Succeeded;
          }
        }
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          const commentId = action.payload;
          Object.entries(state.commentsByPostId).forEach(
            ([postId, commentsState]) => {
              if (commentsState && commentsState.data) {
                const filteredComments = commentsState.data.filter(
                  (comment) => comment.id !== commentId
                );
                state.commentsByPostId[+postId] = {
                  ...commentsState,
                  data: filteredComments,
                };
              }
            }
          );
        }
      );
  },
});

export default commentsSlice.reducer;
