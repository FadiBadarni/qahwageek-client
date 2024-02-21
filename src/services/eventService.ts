import axiosClient from './axiosClient';

class EventService {
  static async getAllEvents(): Promise<any> {
    try {
      const response = await axiosClient.get(`/events`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default EventService;
