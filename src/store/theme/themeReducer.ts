import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

interface RehydrateThemePayload {
  theme?: ThemeState;
}

export interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      REHYDRATE,
      (
        state,
        action: PayloadAction<RehydrateThemePayload, typeof REHYDRATE>
      ) => {
        const incomingTheme = action.payload?.theme;
        if (incomingTheme?.theme) {
          state.theme = incomingTheme.theme;
        }
      }
    );
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
