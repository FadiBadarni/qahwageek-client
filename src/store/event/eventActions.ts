import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';

export const getAllEvents = createAsyncThunk(
  'events/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const events = await EventService.getAllEvents();
      return events;
    } catch (error: any) {
      console.error('Failed to fetch all events:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch all events'
      );
    }
  }
);
