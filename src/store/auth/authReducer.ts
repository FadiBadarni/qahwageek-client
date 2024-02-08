import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { LoadingStatus, RehydrateAction } from 'store/shared/commonState';
import { login, logout } from 'store/user/userActions';

export interface AuthState {
  status: LoadingStatus;
  error: string | null;
}

const initialState: AuthState = {
  status: LoadingStatus.Idle,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearAuthState: (state) => {
      state.status = LoadingStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LoadingStatus.Loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error =
          action.error.message ?? 'An unexpected error occurred during login.';
      })
      .addCase(logout.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error =
          action.error.message ?? 'An unexpected error occurred during logout.';
      })
      .addCase(REHYDRATE, (state, action: RehydrateAction) => {
        const incomingAuth = action.payload?.auth;
        if (incomingAuth) {
          state.status = incomingAuth.status ?? initialState.status;
          state.error = incomingAuth.error ?? initialState.error;
        }
      });
  },
});

export const { setAuthLoading, setAuthError, clearAuthState } =
  authSlice.actions;

export default authSlice.reducer;
