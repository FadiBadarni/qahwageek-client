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
}
export default EventService;
