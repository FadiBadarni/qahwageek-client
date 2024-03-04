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

  static async deleteCategory(categoryId: number): Promise<any> {
    try {
      const response = await axiosClient.delete(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
