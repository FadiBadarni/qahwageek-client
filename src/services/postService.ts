import { NewPost } from 'models/post';
import axiosClient from './axiosClient';

class PostService {
  static async getPostById(id: number): Promise<any> {
    const response = await axiosClient.get(`/posts/${id}`);
    return response.data;
  }

  static async getPresignedUrl(
    filename: string,
    contentType: string
  ): Promise<string> {
    const response = await axiosClient.get(`/posts/generate-presigned-url`, {
      params: { filename, contentType },
    });
    return response.data.url;
  }

  static async savePost(postData: NewPost): Promise<any> {
    const response = await axiosClient.post(`/posts`, postData);
    return response.data;
  }

  static async getRecentPosts(): Promise<any> {
    const response = await axiosClient.get(`/posts/recent`);
    return response.data;
  }

  static async getFeaturedPosts(): Promise<any> {
    const response = await axiosClient.get(`/posts/featured`);
    return response.data;
  }

  static async getAllCategories(): Promise<any> {
    const response = await axiosClient.get(`/categories`);
    return response.data;
  }
}

export default PostService;
