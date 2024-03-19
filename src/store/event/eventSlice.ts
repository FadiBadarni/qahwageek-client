import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEventState } from './eventState';
import { LoadingStatus } from 'store/shared/commonState';
import { EventCategory, MeetupEvent } from 'models/event';
import {
  getAllEventCategories,
  getEventsByCategory,
  getUpcomingEvents,
} from './eventActions';

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
      })
      .addCase(getEventsByCategory.pending, (state) => {
        state.eventsByCategory.status = LoadingStatus.Loading;
      })
      .addCase(getEventsByCategory.fulfilled, (state, action) => {
        state.eventsByCategory.status = LoadingStatus.Succeeded;
        state.eventsByCategory.data = {
          items: action.payload.items,
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getEventsByCategory.rejected, (state, action) => {
        state.eventsByCategory.status = LoadingStatus.Failed;
        state.eventsByCategory.error =
          action.error.message ?? 'Unable to fetch events';
      });
  },
});

export default eventSlice.reducer;
