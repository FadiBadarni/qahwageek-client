import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from 'models/user';
import { LoadingStatus } from 'store/shared/commonState';
import {
  deleteUser,
  fetchAllUsers,
  updateUserRoles,
} from 'store/user/userActions';
import { initialAdminState } from './adminState';
import { fetchAllPosts } from 'store/post/postActions';

export const adminSlice = createSlice({
  name: 'search',
  initialState: initialAdminState,
  reducers: {},
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
        state.posts.data.items = action.payload.items;
        state.posts.data.totalCount = action.payload.totalCount;
        state.posts.data.currentPage = action.payload.currentPage;
        state.posts.data.totalPages = action.payload.totalPages;
        state.posts.status = LoadingStatus.Succeeded;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.posts.status = LoadingStatus.Failed;
        state.posts.error = action.error.message || 'Could not fetch posts';
      });
  },
});

export default adminSlice.reducer;
