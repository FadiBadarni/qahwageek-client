import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PostService from 'services/postService';
import { convertBase64ToBlob } from 'utils/fileUpload';

export const uploadImageToS3 = createAsyncThunk(
  'post/uploadImageToS3',
  async (
    { base64Image, filename }: { base64Image: string; filename: string },
    { rejectWithValue }
  ) => {
    try {
      const blob = convertBase64ToBlob(base64Image);
      // Request a presigned URL from the server
      const presignedUrl = await PostService.getPresignedUrl(
        filename,
        blob.type
      );
      // Upload the blob to S3
      await axios.put(presignedUrl, blob, {
        headers: {
          'Content-Type': blob.type,
        },
      });

      const imageUrl = presignedUrl.split('?')[0];
      return imageUrl;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Unable to upload image to S3'
      );
    }
  }
);

export const uploadMainImage = createAsyncThunk(
  'post/uploadMainImage',
  async (
    { file, filename }: { file: File; filename: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const contentType = file.type;
      const presignedUrl = await PostService.getPresignedUrl(
        filename,
        contentType
      );
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': contentType,
        },
      });

      const imageUrl = presignedUrl.split('?')[0];
      return imageUrl;
    } catch (error: any) {
      console.error('Failed to upload main image to S3:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to upload main image to S3'
      );
    }
  }
);

export const savePost = createAsyncThunk(
  'posts/savePost',
  async (
    {
      title,
      content,
      mainImageUrl,
    }: { title: string; content: string; mainImageUrl?: string },
    { rejectWithValue }
  ) => {
    try {
      const savedPost = await PostService.savePost({
        title,
        content,
        mainImageUrl,
      });
      return savedPost;
    } catch (error: any) {
      console.error('Failed to save post:', error);
      return rejectWithValue(error.response?.data || 'Unable to save post');
    }
  }
);

export const getRecentPosts = createAsyncThunk(
  'posts/getRecentPosts',
  async (_, { rejectWithValue }) => {
    try {
      const recentPosts = await PostService.getRecentPosts();
      return recentPosts;
    } catch (error: any) {
      console.error('Failed to fetch recent posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch recent posts'
      );
    }
  }
);
