import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';

export const getUpcomingEvents = createAsyncThunk(
  'events/getUpcomingEvents ',
  async (_, { rejectWithValue }) => {
    try {
      const events = await EventService.getUpcomingEvents();
      return events;
    } catch (error: any) {
      console.error('Failed to fetch upcoming events:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch upcoming events'
      );
    }
  }
);

export const getAllEventCategories = createAsyncThunk(
  'events/fetchEventCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await EventService.getAllEventCategories();
      return categories;
    } catch (error: any) {
      console.error('Failed to fetch event categories:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch event categories'
      );
    }
  }
);
