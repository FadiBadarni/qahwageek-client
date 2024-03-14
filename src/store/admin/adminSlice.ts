import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from 'store/shared/commonState';
import { fetchAllUsers } from 'store/user/userActions';
import { initialUsersState } from 'store/user/userState';

export const adminSlice = createSlice({
  name: 'search',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.users.status = LoadingStatus.Loading;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users.data = action.payload;
        state.users.status = LoadingStatus.Succeeded;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.users.status = LoadingStatus.Failed;
        state.users.error = action.error.message || 'Could not fetch users';
      });
  },
});

export default adminSlice.reducer;
