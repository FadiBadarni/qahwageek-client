import axiosClient from './axiosClient';
import { Comment, NewComment } from 'models/comment';

class CommentService {
  static async createComment(commentData: NewComment): Promise<Comment> {
    try {
      const response = await axiosClient.post<Comment>(
        '/comments',
        commentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const response = await axiosClient.get<Comment[]>(
        `/comments/post/${postId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(commentId: number): Promise<void> {
    try {
      await axiosClient.delete(`/comments/${commentId}`);
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
