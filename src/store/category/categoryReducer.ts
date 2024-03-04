import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../post/postState';
import { LoadingStatus } from 'store/shared/commonState';
import { deleteCategory, fetchAllCategories } from './categoryActions';

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
        state.data = state.data.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'Failed to delete the category';
      });
  },
});

export default categorySlice.reducer;
