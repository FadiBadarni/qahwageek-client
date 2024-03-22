import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from 'models/user';
import { LoadingStatus } from 'store/shared/commonState';
import {
  deleteUser,
  fetchAllUsers,
  updateUserRoles,
} from 'store/user/userActions';
import { initialAdminState } from './adminState';
import { fetchAllPosts, updatePostStatus } from 'store/post/postActions';
import { Post } from 'models/post';

export const adminSlice = createSlice({
  name: 'search',
  initialState: initialAdminState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post>) {
      state.selectedPost.data = action.payload;
      state.selectedPost.status = LoadingStatus.Idle;
      state.selectedPost.error = null;
    },
    clearSelectedPost(state) {
      state.selectedPost.data = null;
      state.selectedPost.status = LoadingStatus.Idle;
      state.selectedPost.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.users.status = LoadingStatus.Loading;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users.data.items = action.payload.content;
        state.users.data.totalCount = action.payload.totalElements;
        state.users.data.currentPage = action.payload.number;
        state.users.data.totalPages = action.payload.totalPages;
        state.users.status = LoadingStatus.Succeeded;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.users.status = LoadingStatus.Failed;
        state.users.error = action.error.message || 'Could not fetch users';
      })
      .addCase(updateUserRoles.pending, (state) => {
        state.users.status = LoadingStatus.Loading;
      })
      .addCase(
        updateUserRoles.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          const index = state.users.data.items.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users.data.items[index] = action.payload;
          }
          state.users.status = LoadingStatus.Succeeded;
        }
      )
      .addCase(updateUserRoles.rejected, (state, action) => {
        state.users.status = LoadingStatus.Failed;
        state.users.error =
          action.error.message || 'Could not update user roles';
      })
      .addCase(deleteUser.pending, (state) => {
        state.users.status = LoadingStatus.Loading;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users.data.items = state.users.data.items.filter(
          (user) => user.id !== action.payload
        );
        state.users.data.totalCount -= 1;
        state.users.status = LoadingStatus.Succeeded;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.users.status = LoadingStatus.Failed;
        state.users.error = action.error.message || 'Could not delete user';
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.posts.status = LoadingStatus.Loading;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts.data.items = action.payload.content;
        state.posts.data.totalCount = action.payload.totalElements;
        state.posts.data.currentPage = action.payload.pageable.pageNumber;
        state.posts.data.totalPages = action.payload.totalPages;
        state.posts.status = LoadingStatus.Succeeded;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.posts.status = LoadingStatus.Failed;
        state.posts.error = action.error.message || 'Could not fetch posts';
      })
      .addCase(updatePostStatus.pending, (state) => {
        state.selectedPost.status = LoadingStatus.Loading;
      })
      .addCase(
        updatePostStatus.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.selectedPost.status = LoadingStatus.Succeeded;
          // Find and update the post in the state
          const index = state.posts.data.items.findIndex(
            (post) => post.id === action.payload.id
          );
          if (index !== -1) {
            state.posts.data.items[index] = action.payload;
          }
        }
      )
      .addCase(updatePostStatus.rejected, (state, action) => {
        state.selectedPost.status = LoadingStatus.Failed;
        state.selectedPost.error =
          action.error.message || 'Failed to update post status';
      });
  },
});

export const { setSelectedPost, clearSelectedPost } = adminSlice.actions;

export default adminSlice.reducer;
