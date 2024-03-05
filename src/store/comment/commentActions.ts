import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewComment } from 'models/comment';
import CommentService from 'services/commentService';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: NewComment, { rejectWithValue }) => {
    try {
      const newComment = await CommentService.createComment(commentData);
      return newComment;
    } catch (error: any) {
      console.error('Failed to create comment:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to create comment'
      );
    }
  }
);

export const getCommentsByPostId = createAsyncThunk(
  'comments/getCommentsByPostId',
  async (postId: number, { rejectWithValue }) => {
    try {
      const comments = await CommentService.getCommentsByPostId(postId);
      return { postId, comments };
    } catch (error: any) {
      console.error(`Failed to fetch comments for post ID ${postId}:`, error);
      return rejectWithValue(
        error.response?.data || `Unable to fetch comments for post ID ${postId}`
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await CommentService.deleteComment(commentId);
      return commentId;
    } catch (error: any) {
      console.error(`Failed to delete comment with ID ${commentId}:`, error);
      return rejectWithValue(
        error.response?.data || `Unable to delete comment with ID ${commentId}`
      );
    }
  }
);
