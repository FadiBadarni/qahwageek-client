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
  static async getEventsByCategory(
    categoryId?: number,
    page = 0,
    size = 10,
    sort = 'dateTime,desc'
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
}
export default EventService;
