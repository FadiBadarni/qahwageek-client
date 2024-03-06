import { Category } from 'models/post';
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

  static async addCategory(data: {
    name: string;
    slug: string;
    description: string;
    parentId?: number | null;
  }): Promise<any> {
    try {
      const response = await axiosClient.post(`/categories`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(category: Category): Promise<Category> {
    try {
      const response = await axiosClient.put(
        `/categories/${category.id}`,
        category
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
