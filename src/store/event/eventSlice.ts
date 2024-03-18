import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEventState } from './eventState';
import { LoadingStatus } from 'store/shared/commonState';
import { EventCategory, MeetupEvent } from 'models/event';
import { getAllEventCategories, getUpcomingEvents } from './eventActions';

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
      })
      .addCase(getAllEventCategories.pending, (state) => {
        state.eventsCategories.status = LoadingStatus.Loading;
      })
      .addCase(
        getAllEventCategories.fulfilled,
        (state, action: PayloadAction<EventCategory[]>) => {
          state.eventsCategories.status = LoadingStatus.Succeeded;
          state.eventsCategories.data = action.payload;
        }
      )
      .addCase(getAllEventCategories.rejected, (state, action) => {
        state.eventsCategories.status = LoadingStatus.Failed;
        state.eventsCategories.error =
          action.error.message ?? 'An unexpected error occurred';
      });
  },
});

export default eventSlice.reducer;
