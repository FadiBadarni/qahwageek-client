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
