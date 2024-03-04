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
