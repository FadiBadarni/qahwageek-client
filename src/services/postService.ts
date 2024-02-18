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
}

export default PostService;
