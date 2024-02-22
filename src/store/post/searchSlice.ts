import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState, LoadingStatus } from '../shared/commonState';
import { PostSearchResult } from 'models/post';
import { searchPosts } from './postActions';

interface SearchData {
  results: PostSearchResult[];
  query: string;
}
const initialState: CommonState<SearchData> = {
  data: {
    results: [],
    query: '',
  },
  status: LoadingStatus.Idle,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.data.query = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<PostSearchResult[]>) => {
      state.data.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(
        searchPosts.fulfilled,
        (state, action: PayloadAction<PostSearchResult[]>) => {
          state.status = LoadingStatus.Succeeded;
          state.data.results = action.payload;
        }
      )
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message || 'Failed to search posts';
      });
  },
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
