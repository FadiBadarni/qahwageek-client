import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from 'store/shared/commonState';
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryBySlug,
  updateCategory,
} from './categoryActions';
import { Category } from 'models/post';
import { initialCategoryState } from './categoryState';

const categorySlice = createSlice({
  name: 'categories',
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.categories.status = LoadingStatus.Loading;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories.status = LoadingStatus.Succeeded;
        state.categories.data = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categories.status = LoadingStatus.Failed;
        state.categories.error =
          action.error.message ??
          'An unexpected error occurred fetching categories';
      })
      .addCase(fetchCategoryBySlug.pending, (state) => {
        state.currentCategory.status = LoadingStatus.Loading;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.currentCategory.status = LoadingStatus.Succeeded;
        state.currentCategory.data = action.payload;
      })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        state.currentCategory.status = LoadingStatus.Failed;
        state.currentCategory.error =
          action.error.message ?? 'Unable to fetch category';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.categories.status = LoadingStatus.Loading;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories.status = LoadingStatus.Succeeded;

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
        state.categories.data = deleteSubCategory(
          state.categories.data,
          action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.categories.status = LoadingStatus.Failed;
        state.categories.error =
          action.error.message ?? 'Failed to delete the category';
      })
      .addCase(addCategory.pending, (state) => {
        state.categories.status = LoadingStatus.Loading;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.status = LoadingStatus.Succeeded;
        if (action.payload.parentId) {
          const parentIndex = state.categories.data.findIndex(
            (category) => category.id === action.payload.parentId
          );
          if (parentIndex !== -1) {
            if (!state.categories.data[parentIndex].subCategories) {
              state.categories.data[parentIndex].subCategories = [];
            }
            state.categories.data[parentIndex].subCategories?.push(
              action.payload
            );
          }
        } else {
          state.categories.data.push(action.payload);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.categories.status = LoadingStatus.Failed;
        state.categories.error =
          action.error.message ?? 'Failed to add the category';
      })
      .addCase(updateCategory.pending, (state) => {
        state.categories.status = LoadingStatus.Loading;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories.status = LoadingStatus.Succeeded;
        const index = state.categories.data.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories.data[index] = action.payload;
        } else {
          const updateSubCategory = (categories: Category[]): Category[] => {
            return categories.map((category) => {
              if (category.subCategories) {
                category.subCategories = updateSubCategory(
                  category.subCategories
                );
              }
              return category.id === action.payload.id
                ? action.payload
                : category;
            });
          };
          state.categories.data = updateSubCategory(state.categories.data);
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.categories.status = LoadingStatus.Failed;
        state.categories.error =
          action.error.message ?? 'Failed to update the category';
      });
  },
});

export default categorySlice.reducer;
