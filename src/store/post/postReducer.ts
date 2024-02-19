import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostById, getRecentPosts } from './postActions';
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
      })
      //Handling post by id
      .addCase(getPostById.pending, (state) => {
        state.currentPost.status = LoadingStatus.Loading;
        state.currentPost.data = null; // Clear current post data when loading new
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.currentPost.status = LoadingStatus.Succeeded;
        state.currentPost.data = action.payload; // Set fetched post as current
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.currentPost.status = LoadingStatus.Failed;
        state.currentPost.error =
          action.error.message ?? 'Failed to load the post';
      });
  },
});

export default postSlice.reducer;
