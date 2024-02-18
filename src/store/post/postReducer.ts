import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRecentPosts } from './postActions';
import { LoadingStatus } from 'store/shared/commonState';
import { PostState } from './postState';
import { RecentPost } from 'models/post';

const initialState: PostState = {
  data: [],
  status: LoadingStatus.Idle,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentPosts.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(
        getRecentPosts.fulfilled,
        (state, action: PayloadAction<RecentPost[]>) => {
          state.status = LoadingStatus.Succeeded;
          state.data = action.payload;
        }
      )
      .addCase(getRecentPosts.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'An unexpected error occurred';
      });
  },
});

export default postSlice.reducer;
