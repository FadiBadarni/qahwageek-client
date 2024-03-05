export interface Comment {
  id: number;
  postId: number;
  userId: number;
  username: string;
  profilePicture?: string;
  content: string;
  createdAt: Date;
  parentCommentId?: number;
  replies?: Comment[];
}
export interface NewComment {
  postId: number;
  content: string;
  parentCommentId?: number;
}
