import { CommonState } from 'store/shared/commonState';
import { Comment } from 'models/comment';

interface CommentsByPostId {
  [key: number]: CommonState<Comment[]>;
}

export interface CommentState {
  commentsByPostId: CommentsByPostId;
}

export const initialCommentState: CommentState = {
  commentsByPostId: {},
};
