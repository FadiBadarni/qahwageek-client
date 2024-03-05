import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../post/postState';
import { LoadingStatus } from 'store/shared/commonState';
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
} from './categoryActions';
import { Category } from 'models/post';

const initialState: CategoryState = {
  data: [],
  status: LoadingStatus.Idle,
  error: null,
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.data = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error =
          action.error.message ??
          'An unexpected error occurred fetching categories';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;

        const deleteSubCategory = (
          categories: Category[],
          categoryId: number
        ) => {
          return categories
            .map((category) => {
              if (category.subCategories) {
                category.subCategories = deleteSubCategory(
                  category.subCategories,
                  categoryId
                );
              }
              return category;
            })
            .filter((category) => category.id !== categoryId);
        };

        // Start the deletion process from the root categories
        state.data = deleteSubCategory(state.data, action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'Failed to delete the category';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        if (action.payload.parentId) {
          const parentIndex = state.data.findIndex(
            (category) => category.id === action.payload.parentId
          );
          if (parentIndex !== -1) {
            if (!state.data[parentIndex].subCategories) {
              state.data[parentIndex].subCategories = [];
            }
            state.data[parentIndex].subCategories?.push(action.payload);
          }
        } else {
          state.data.push(action.payload);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'Failed to add the category';
      });
  },
});

export default categorySlice.reducer;
