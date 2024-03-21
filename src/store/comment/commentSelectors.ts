import { createSelector } from '@reduxjs/toolkit';
import { CommonState, LoadingStatus } from 'store/shared/commonState';
import { RootState } from 'store/store';
import { CommentsByPostId } from './commentState';
import { Comment } from 'models/comment';

type CommentsDataState = CommonState<Comment[]>;

export const selectCommentsByPostId = createSelector<
  [
    (state: RootState) => CommentsByPostId,
    (_: RootState, postId: number) => number
  ],
  CommentsDataState
>(
  (state: RootState) => state.postComments.commentsByPostId,
  (_: RootState, postId: number) => postId,
  (commentsByPostId: CommentsByPostId, postId: number): CommentsDataState =>
    commentsByPostId[postId] || {
      data: [],
      status: LoadingStatus.Idle,
      error: null,
    }
);
