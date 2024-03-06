import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from 'models/post';
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
      slug,
      description,
      parentId,
    }: {
      name: string;
      slug: string;
      description: string;
      parentId?: number | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const newCategory = await CategoryService.addCategory({
        name,
        slug,
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

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (category: Category, { rejectWithValue }) => {
    try {
      const updatedCategory = await CategoryService.updateCategory(category);
      return updatedCategory;
    } catch (error: any) {
      console.error(`Failed to update category:`, error);
      return rejectWithValue(
        error.response?.data || 'Unable to update category'
      );
    }
  }
);
