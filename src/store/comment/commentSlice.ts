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
  reducers: {
    setCurrentComment: (state, action: PayloadAction<number | null>) => {
      state.currentComment.data = action.payload;
      state.currentComment.status =
        action.payload === null ? LoadingStatus.Idle : LoadingStatus.Loading;
      state.currentComment.error = null;
    },
    clearCurrentComment: (state) => {
      state.currentComment = {
        data: null,
        status: LoadingStatus.Idle,
        error: null,
      };
    },
  },
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
      .addCase(createComment.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        const commentsState = state.commentsByPostId[postId];
        if (commentsState) {
          commentsState.status = LoadingStatus.Loading;
        }
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const newComment = action.payload;
          const commentsState = state.commentsByPostId[newComment.postId];
          if (commentsState && commentsState.data) {
            if (newComment.parentCommentId) {
              const parentComment = commentsState.data.find(
                (comment) => comment.id === newComment.parentCommentId
              );
              if (parentComment) {
                if (!parentComment.replies) {
                  parentComment.replies = [];
                }
                // Prepend new reply to the beginning of the replies array
                parentComment.replies.unshift(newComment);
              }
            } else {
              // Prepend new comment to the beginning of the comments array
              commentsState.data.unshift(newComment);
            }
            commentsState.status = LoadingStatus.Succeeded;
          }
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        const commentsState = state.commentsByPostId[postId];
        if (commentsState) {
          commentsState.status = LoadingStatus.Failed;
          commentsState.error =
            action.error.message ?? 'Failed to create comment';
        }
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.currentComment = {
          ...state.currentComment,
          status: LoadingStatus.Loading,
          data: action.meta.arg,
        };
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          const commentId = action.payload;
          state.currentComment = {
            data: null,
            status: LoadingStatus.Idle,
            error: null,
          };
          Object.entries(state.commentsByPostId).forEach(
            ([_, commentsState]) => {
              if (commentsState && commentsState.data) {
                commentsState.data.forEach((comment) => {
                  if (comment.replies) {
                    comment.replies = comment.replies.filter(
                      (reply) => reply.id !== commentId
                    );
                  }
                });

                commentsState.data = commentsState.data.filter(
                  (comment) => comment.id !== commentId
                );
              }
            }
          );
        }
      )
      .addCase(
        deleteComment.rejected,
        (state, action: PayloadAction<any, string, { arg: number }, any>) => {
          state.currentComment = {
            ...state.currentComment,
            status: LoadingStatus.Failed,
            error: action.error.message ?? 'Failed to delete comment',
          };
        }
      );
  },
});
export const { setCurrentComment, clearCurrentComment } = commentsSlice.actions;

export default commentsSlice.reducer;
