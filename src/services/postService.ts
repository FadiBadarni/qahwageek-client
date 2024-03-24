import { EditedPost, NewPost, PostSearchResult } from 'models/post';
import axiosClient from './axiosClient';

class PostService {
  static async getPostById(id: number): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPresignedUrl(
    filename: string,
    contentType: string
  ): Promise<string> {
    try {
      const response = await axiosClient.get(`/posts/generate-presigned-url`, {
        params: { filename, contentType },
      });
      return response.data.url;
    } catch (error) {
      throw error;
    }
  }

  static async savePost(postData: NewPost): Promise<any> {
    try {
      const response = await axiosClient.post(`/posts`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentPosts(): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/recent`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getFeaturedPosts(): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/featured`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getNewestProgrammingPosts(): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/programming/newest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getNewestCareerPosts(): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/career/newest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getNewestTermsPosts(): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/terms/newest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByCategory(
    categorySlug: string,
    page: number = 0,
    size: number = 10
  ): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/category`, {
        params: { categorySlug, page, size },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRelatedPosts(
    relatedPostId: number,
    page: number = 0,
    size: number = 10
  ): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts/related`, {
        params: { relatedPostId, page, size },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async searchPosts(query: string): Promise<PostSearchResult[]> {
    try {
      const response = await axiosClient.get(`/posts/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllPosts({
    page = 0,
    size = 10,
    status,
    sort,
  }: {
    page?: number;
    size?: number;
    status?: string;
    sort?: string;
  }): Promise<any> {
    try {
      const response = await axiosClient.get(`/posts`, {
        params: {
          page,
          size,
          ...(status ? { status } : {}),
          ...(sort ? { sort } : {}),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePostStatus(
    postId: number,
    status: 'REJECTED' | 'PUBLISHED'
  ): Promise<any> {
    try {
      const response = await axiosClient.patch(`/posts/${postId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: number): Promise<void> {
    try {
      await axiosClient.delete(`/posts/${postId}`);
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(postData: EditedPost): Promise<any> {
    try {
      const response = await axiosClient.put(`/posts/${postData.id}`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async featurePost(postId: number): Promise<any> {
    try {
      const response = await axiosClient.patch(`/posts/${postId}/feature`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
