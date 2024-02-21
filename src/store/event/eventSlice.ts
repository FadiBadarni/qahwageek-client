import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEventState } from './eventState';
import { getAllEvents } from './eventActions';
import { LoadingStatus } from 'store/shared/commonState';
import { MeetupEvent } from 'models/event';

const eventSlice = createSlice({
  name: 'events',
  initialState: initialEventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.upcomingEvents.status = LoadingStatus.Loading;
      })
      .addCase(
        getAllEvents.fulfilled,
        (state, action: PayloadAction<MeetupEvent[]>) => {
          state.upcomingEvents.status = LoadingStatus.Succeeded;
          state.upcomingEvents.data = action.payload;
        }
      )
      .addCase(getAllEvents.rejected, (state, action) => {
        state.upcomingEvents.status = LoadingStatus.Failed;
        state.upcomingEvents.error =
          action.error.message ?? 'An unexpected error occurred';
      });
  },
});

export default eventSlice.reducer;
