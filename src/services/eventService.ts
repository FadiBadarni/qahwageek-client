import { NewEvent } from 'models/event';
import axiosClient from './axiosClient';

class EventService {
  static async getUpcomingEvents(): Promise<any> {
    try {
      const response = await axiosClient.get(`/events/upcoming`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAllEventCategories(): Promise<any> {
    try {
      const response = await axiosClient.get(`/events/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async createEvent(eventData: NewEvent): Promise<any> {
    try {
      const response = await axiosClient.post(`/events`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async deleteEvent(eventId: number): Promise<any> {
    try {
      const response = await axiosClient.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async updateEvent(eventId: number, eventData: FormData): Promise<any> {
    try {
      const response = await axiosClient.patch(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getEventsByCategory(
    categoryId?: number,
    page = 0,
    size = 10,
    sort = 'startDateTime,desc'
  ): Promise<any> {
    try {
      const params = categoryId
        ? { page, size, sort, categoryId }
        : { page, size, sort };
      const response = await axiosClient.get(`/events`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getEventPresignedUrl(
    filename: string,
    contentType: string
  ): Promise<string> {
    try {
      const response = await axiosClient.get(`/events/generate-presigned-url`, {
        params: { filename, contentType },
      });
      return response.data.url;
    } catch (error) {
      throw error;
    }
  }

  static async getAllEvents(
    page = 0,
    size = 10,
    sort = 'createdAt,desc',
    status?: string
  ): Promise<any> {
    try {
      const params = { page, size, sort, status };
      const response = await axiosClient.get(`/events/all`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateEventStatus(
    eventId: number,
    status: 'REJECTED' | 'PUBLISHED'
  ): Promise<any> {
    try {
      const response = await axiosClient.patch(`/events/${eventId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default EventService;
