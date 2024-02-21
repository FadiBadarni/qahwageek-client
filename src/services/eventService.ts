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
}
export default EventService;
