import { NewPost } from 'models/post';
import axiosClient from './axiosClient';

class PostService {
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
}

export default PostService;
