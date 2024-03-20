import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEventState } from './eventState';
import { LoadingStatus } from 'store/shared/commonState';
import { EventCategory, MeetupEvent } from 'models/event';
import {
  getAllEventCategories,
  getAllEvents,
  getEventsByCategory,
  getUpcomingEvents,
  updateEventStatus,
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
          items: action.payload.content,
          totalCount: action.payload.totalElements,
          currentPage: action.payload.pageable.pageNumber,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getEventsByCategory.rejected, (state, action) => {
        state.eventsByCategory.status = LoadingStatus.Failed;
        state.eventsByCategory.error =
          action.error.message ?? 'Unable to fetch events';
      })
      .addCase(getAllEvents.pending, (state) => {
        state.allEvents.status = LoadingStatus.Loading;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.allEvents.status = LoadingStatus.Succeeded;
        state.allEvents.data = {
          items: action.payload.content,
          totalCount: action.payload.totalElements,
          currentPage: action.payload.pageable.pageNumber,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.allEvents.status = LoadingStatus.Failed;
        state.allEvents.error =
          action.error.message ?? 'Unable to fetch events';
      })
      .addCase(updateEventStatus.pending, (state) => {
        state.selectedEvent.status = LoadingStatus.Loading;
      })
      .addCase(
        updateEventStatus.fulfilled,
        (state, action: PayloadAction<MeetupEvent>) => {
          state.selectedEvent.status = LoadingStatus.Succeeded;
          state.selectedEvent.data = action.payload;
          // Update the event in allEvents
          const updatedEventIndex = state.allEvents.data.items.findIndex(
            (event) => event.id === action.payload.id
          );
          if (updatedEventIndex !== -1) {
            state.allEvents.data.items[updatedEventIndex] = action.payload;
          }
        }
      )
      .addCase(updateEventStatus.rejected, (state, action) => {
        state.selectedEvent.status = LoadingStatus.Failed;
        state.selectedEvent.error =
          action.error.message ?? 'Failed to update event status';
      });
  },
});

export default eventSlice.reducer;
