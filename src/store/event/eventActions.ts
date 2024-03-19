import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewEvent } from 'models/event';
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

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: NewEvent, { rejectWithValue }) => {
    try {
      const newEvent = await EventService.createEvent(eventData);
      return newEvent;
    } catch (error: any) {
      console.error('Failed to create event:', error);
      return rejectWithValue(error.response?.data || 'Unable to create event');
    }
  }
);

export const getEventsByCategory = createAsyncThunk(
  'events/getEventsByCategory',
  async (
    {
      categoryId,
      page,
      size,
      sort,
    }: { categoryId?: number; page?: number; size?: number; sort?: string },
    { rejectWithValue }
  ) => {
    try {
      const events = await EventService.getEventsByCategory(
        categoryId,
        page,
        size,
        sort
      );
      return events;
    } catch (error: any) {
      console.error(
        `Failed to fetch ${categoryId ? 'category events' : 'all events'}:`,
        error
      );
      return rejectWithValue(
        error.response?.data ||
          `Unable to fetch ${categoryId ? 'category events' : 'all events'}`
      );
    }
  }
);
