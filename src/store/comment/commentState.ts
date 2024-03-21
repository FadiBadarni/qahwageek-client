import { CommonState, LoadingStatus } from 'store/shared/commonState';
import { Comment } from 'models/comment';

export interface CommentsByPostId {
  [key: number]: CommonState<Comment[]>;
}

export interface CommentState {
  commentsByPostId: CommentsByPostId;
  currentComment: CommonState<number | null>;
}

export const initialCommentState: CommentState = {
  commentsByPostId: {},
  currentComment: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
};
