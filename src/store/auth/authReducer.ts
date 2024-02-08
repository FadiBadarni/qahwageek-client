import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { LoadingStatus, RehydrateAction } from 'store/shared/commonState';

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
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      const incomingAuth = action.payload?.auth;
      if (incomingAuth) {
        state.status = incomingAuth.status ?? initialState.status;
        state.error = incomingAuth.error ?? initialState.error;
      }
    });
  },
});

export const { setAuthLoading, setAuthError } = authSlice.actions;

export default authSlice.reducer;
