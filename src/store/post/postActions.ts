import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EditedPost, NewPost } from 'models/post';
import PostService from 'services/postService';
import { convertBase64ToBlob } from 'utils/fileUpload';

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id: number, { rejectWithValue }) => {
    try {
      const post = await PostService.getPostById(id);
      return post;
    } catch (error: any) {
      console.error('Failed to fetch post by ID:', error);
      return rejectWithValue(error.response?.data || 'Unable to fetch post');
    }
  }
);

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
  async (postData: NewPost, { rejectWithValue }) => {
    try {
      const savedPost = await PostService.savePost(postData);
      return savedPost;
    } catch (error: any) {
      console.error('Failed to save post:', error);
      return rejectWithValue(error.response?.data || 'Unable to save post');
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postData }: { postData: EditedPost }, { rejectWithValue }) => {
    try {
      const updatedPost = await PostService.updatePost(postData);
      return updatedPost;
    } catch (error: any) {
      console.error(`Failed to update post with ID ${postData.id}:`, error);
      return rejectWithValue(
        error.response?.data || `Unable to update post with ID ${postData.id}`
      );
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

export const getFeaturedPosts = createAsyncThunk(
  'posts/getFeaturedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const featuredPosts = await PostService.getFeaturedPosts();
      return featuredPosts;
    } catch (error: any) {
      console.error('Failed to fetch featured posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch featured posts'
      );
    }
  }
);

export const getNewestProgrammingPosts = createAsyncThunk(
  'posts/getNewestProgrammingPosts',
  async (_, { rejectWithValue }) => {
    try {
      const programmingPosts = await PostService.getNewestProgrammingPosts();
      return programmingPosts;
    } catch (error: any) {
      console.error('Failed to fetch programming posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch programming posts'
      );
    }
  }
);

export const getNewestCareerPosts = createAsyncThunk(
  'posts/getNewestCareerPosts',
  async (_, { rejectWithValue }) => {
    try {
      const careerPosts = await PostService.getNewestCareerPosts();
      return careerPosts;
    } catch (error: any) {
      console.error('Failed to fetch career posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch career posts'
      );
    }
  }
);

export const getNewestTermsPosts = createAsyncThunk(
  'posts/getNewestTermsPosts',
  async (_, { rejectWithValue }) => {
    try {
      const termsPosts = await PostService.getNewestTermsPosts();
      return termsPosts;
    } catch (error: any) {
      console.error('Failed to fetch terms posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch terms posts'
      );
    }
  }
);

export const fetchPostsByCategory = createAsyncThunk(
  'posts/fetchByCategory',
  async (
    {
      categorySlug,
      page,
      size,
    }: { categorySlug: string; page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const posts = await PostService.getPostsByCategory(
        categorySlug,
        page,
        size
      );
      return posts;
    } catch (error: any) {
      console.error(
        `Failed to fetch posts for category ${categorySlug}:`,
        error
      );
      return rejectWithValue(
        error.response?.data ||
          `Unable to fetch posts for category ${categorySlug}`
      );
    }
  }
);

export const fetchRelatedPosts = createAsyncThunk(
  'posts/fetchRelatedPosts',
  async (
    {
      relatedPostId,
      page,
      size,
    }: { relatedPostId: number; page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const posts = await PostService.getRelatedPosts(
        relatedPostId,
        page,
        size
      );
      return posts;
    } catch (error: any) {
      console.error(`Failed to fetch related posts:`, error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch related posts'
      );
    }
  }
);

export const searchPosts = createAsyncThunk(
  'posts/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const searchResults = await PostService.searchPosts(query);
      return searchResults;
    } catch (error: any) {
      console.error('Failed to search posts:', error);
      return rejectWithValue(error.response?.data || 'Unable to search posts');
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (
    {
      page,
      size,
      status,
      sort,
    }: {
      page: number;
      size: number;
      status?: string;
      sort?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const posts = await PostService.getAllPosts({
        page,
        size,
        status,
        sort,
      });
      return posts;
    } catch (error: any) {
      console.error('Failed to fetch all posts:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch all posts'
      );
    }
  }
);

export const updatePostStatus = createAsyncThunk(
  'posts/updateStatus',
  async (
    { postId, status }: { postId: number; status: 'REJECTED' | 'PUBLISHED' },
    { rejectWithValue }
  ) => {
    try {
      const updatedPost = await PostService.updatePostStatus(postId, status);
      return updatedPost;
    } catch (error: any) {
      console.error(
        `Failed to update status for post with ID ${postId}:`,
        error
      );
      return rejectWithValue(
        error.response?.data || `Unable to update post status to ${status}`
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number, { rejectWithValue }) => {
    try {
      await PostService.deletePost(postId);
      return postId;
    } catch (error: any) {
      console.error(`Failed to delete post with ID ${postId}:`, error);
      return rejectWithValue(
        error.response?.data || `Unable to delete post with ID ${postId}`
      );
    }
  }
);
