import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from 'services/categoryService';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await CategoryService.getAllCategories();
      return categories;
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch categories'
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await CategoryService.deleteCategory(categoryId);
      return response;
    } catch (error: any) {
      console.error(`Failed to delete category with ID ${categoryId}:`, error);
      return rejectWithValue(
        error.response?.data ||
          `Unable to delete category with ID ${categoryId}`
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/add',
  async (
    {
      name,
      description,
      parentId,
    }: { name: string; description: string; parentId?: number | null },
    { rejectWithValue }
  ) => {
    try {
      const newCategory = await CategoryService.addCategory({
        name,
        description,
        parentId,
      });
      return newCategory;
    } catch (error: any) {
      console.error('Failed to add category:', error);
      return rejectWithValue(error.response?.data || 'Unable to add category');
    }
  }
);
