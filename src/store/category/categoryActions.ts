import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from 'models/post';
import { processApiError } from 'services/apiErrorUtils';
import CategoryService from 'services/categoryService';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await CategoryService.getAllCategories();
      return categories;
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
      return rejectWithValue(processApiError(error));
    }
  }
);

export const fetchCategoryBySlug = createAsyncThunk(
  'categories/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const category = await CategoryService.getCategoryBySlug(slug);
      return category;
    } catch (error) {
      console.error(`Failed to fetch category with slug ${slug}:`, error);
      return rejectWithValue(processApiError(error));
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
      return rejectWithValue(processApiError(error));
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
      return rejectWithValue(processApiError(error));
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
      return rejectWithValue(processApiError(error));
    }
  }
);
