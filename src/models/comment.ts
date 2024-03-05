export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: Date;
  parentCommentId?: number;
  replies?: Comment[];
}
