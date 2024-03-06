import { ContactForm } from 'models/user';
import axiosClient from './axiosClient';

class ContactService {
  static async sendContactForm(formData: ContactForm): Promise<any> {
    try {
      const response = await axiosClient.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ContactService;
