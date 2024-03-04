import axiosClient from './axiosClient';

class CategoryService {
  static async getAllCategories(): Promise<any> {
    try {
      const response = await axiosClient.get(`/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
