import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: number, { rejectWithValue }) => {
    try {
      await EventService.deleteEvent(eventId);
      return eventId;
    } catch (error: any) {
      console.error(`Failed to delete event with ID ${eventId}:`, error);
      return rejectWithValue(
        error.response?.data || `Unable to delete event with ID ${eventId}`
      );
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

export const uploadEventImageToS3 = createAsyncThunk(
  'post/uploadEventImage',
  async (
    { file, filename }: { file: File; filename: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const contentType = file.type;
      const presignedUrl = await EventService.getEventPresignedUrl(
        filename,
        contentType
      );
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': contentType,
        },
      });

      const imageUrl = presignedUrl.split('?')[0];
      return imageUrl;
    } catch (error: any) {
      console.error('Failed to upload event image to S3:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to upload event image to S3'
      );
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'events/getAllEvents',
  async (
    {
      page,
      size,
      sort,
      status,
    }: { page?: number; size?: number; sort?: string; status?: string } = {},
    { rejectWithValue }
  ) => {
    try {
      const events = await EventService.getAllEvents(page, size, sort, status);
      return events;
    } catch (error: any) {
      console.error('Failed to fetch all events:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to fetch all events'
      );
    }
  }
);

export const updateEventStatus = createAsyncThunk(
  'events/updateEventStatus',
  async (
    { eventId, status }: { eventId: number; status: 'REJECTED' | 'PUBLISHED' },
    { rejectWithValue }
  ) => {
    try {
      const updatedEvent = await EventService.updateEventStatus(
        eventId,
        status
      );
      return updatedEvent;
    } catch (error: any) {
      console.error(
        `Failed to update status for event with ID ${eventId}:`,
        error
      );
      return rejectWithValue(
        error.response?.data || `Unable to update event status to ${status}`
      );
    }
  }
);
