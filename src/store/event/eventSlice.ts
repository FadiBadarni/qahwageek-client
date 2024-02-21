import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEventState } from './eventState';
import { LoadingStatus } from 'store/shared/commonState';
import { MeetupEvent } from 'models/event';
import { getUpcomingEvents } from './eventActions';

const eventSlice = createSlice({
  name: 'events',
  initialState: initialEventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingEvents.pending, (state) => {
        state.upcomingEvents.status = LoadingStatus.Loading;
      })
      .addCase(
        getUpcomingEvents.fulfilled,
        (state, action: PayloadAction<MeetupEvent[]>) => {
          state.upcomingEvents.status = LoadingStatus.Succeeded;
          state.upcomingEvents.data = action.payload;
        }
      )
      .addCase(getUpcomingEvents.rejected, (state, action) => {
        state.upcomingEvents.status = LoadingStatus.Failed;
        state.upcomingEvents.error =
          action.error.message ?? 'An unexpected error occurred';
      });
  },
});

export default eventSlice.reducer;
