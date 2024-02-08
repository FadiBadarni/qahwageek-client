import { LoadingStatus, RehydrateAction } from 'store/shared/commonState';
import { UserState } from './userState';
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { login, logout } from './userActions';

const initialState: UserState = {
  data: null,
  status: LoadingStatus.Idle,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.status = action.payload
        ? LoadingStatus.Succeeded
        : LoadingStatus.Failed;
    },

    clearUser: (state) => {
      state.data = null;
      state.status = LoadingStatus.Idle;
    },

    setLoading: (state, action) => {
      state.status = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'An unexpected error occurred';
      })
      .addCase(REHYDRATE, (state, action: RehydrateAction) => {
        const incomingUser = action.payload?.user;
        if (incomingUser) {
          state.data = incomingUser.data;
          state.status = incomingUser.status ?? initialState.status;
          state.error = incomingUser.error ?? initialState.error;
        }
      })
      .addCase(logout.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = LoadingStatus.Idle;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error =
          action.error.message ?? 'An unexpected error occurred during logout';
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
