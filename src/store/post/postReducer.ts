import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchPostsByCategory,
  getFeaturedPosts,
  getNewestProgrammingPosts,
  getPostById,
  getRecentPosts,
} from './postActions';
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
      //Handling featerd posts
      .addCase(getFeaturedPosts.pending, (state) => {
        state.featuredPosts.status = LoadingStatus.Loading;
      })
      .addCase(
        getFeaturedPosts.fulfilled,
        (state, action: PayloadAction<LightPost[]>) => {
          state.featuredPosts.status = LoadingStatus.Succeeded;
          state.featuredPosts.data = action.payload;
        }
      )
      .addCase(getFeaturedPosts.rejected, (state, action) => {
        state.featuredPosts.status = LoadingStatus.Failed;
        state.featuredPosts.error =
          action.error.message ?? 'An unexpected error occurred';
      })
      //Handling post by id
      .addCase(getPostById.pending, (state) => {
        state.currentPost.status = LoadingStatus.Loading;
        state.currentPost.data = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.currentPost.status = LoadingStatus.Succeeded;
        state.currentPost.data = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.currentPost.status = LoadingStatus.Failed;
        state.currentPost.error =
          action.error.message ?? 'Failed to load the post';
      })
      //Handling Newest Programming Posts
      .addCase(getNewestProgrammingPosts.pending, (state) => {
        state.latestProgrammingPosts.status = LoadingStatus.Loading;
      })
      .addCase(
        getNewestProgrammingPosts.fulfilled,
        (state, action: PayloadAction<LightPost[]>) => {
          state.latestProgrammingPosts.status = LoadingStatus.Succeeded;
          state.latestProgrammingPosts.data = action.payload;
        }
      )
      .addCase(getNewestProgrammingPosts.rejected, (state, action) => {
        state.latestProgrammingPosts.status = LoadingStatus.Failed;
        state.latestProgrammingPosts.error =
          action.error.message ?? 'An unexpected error occurred';
      })
      .addCase(fetchPostsByCategory.pending, (state) => {
        state.categoryPosts.status = LoadingStatus.Loading;
      })
      .addCase(fetchPostsByCategory.fulfilled, (state, action) => {
        state.categoryPosts.status = LoadingStatus.Succeeded;
        state.categoryPosts.data.items = action.payload.content;
        state.categoryPosts.data.totalCount = action.payload.totalElements;
        state.categoryPosts.data.currentPage =
          action.payload.pageable.pageNumber;
        state.categoryPosts.data.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPostsByCategory.rejected, (state, action) => {
        state.categoryPosts.status = LoadingStatus.Failed;
        state.categoryPosts.error =
          action.error.message ?? 'Unable to fetch posts for the category';
      });
  },
});

export default postSlice.reducer;
