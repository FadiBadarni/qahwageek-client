import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRecentPosts } from './postActions';
import { LoadingStatus } from 'store/shared/commonState';
import { initialPostsState } from './postState';
import { LightPost } from 'models/post';

const postSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentPosts.pending, (state) => {
        state.recentPosts.status = LoadingStatus.Loading;
      })
      .addCase(
        getRecentPosts.fulfilled,
        (state, action: PayloadAction<LightPost[]>) => {
          state.recentPosts.status = LoadingStatus.Succeeded;
          state.recentPosts.data = action.payload;
        }
      )
      .addCase(getRecentPosts.rejected, (state, action) => {
        state.recentPosts.status = LoadingStatus.Failed;
        state.recentPosts.error =
          action.error.message ?? 'An unexpected error occurred';
      });
  },
});

export default postSlice.reducer;
