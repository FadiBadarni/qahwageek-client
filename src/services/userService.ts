import { LoginRequest } from 'models/user';
import apiClient from './apiClient';

class UserService {
  static async loginService(credentials: LoginRequest) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}

export default UserService;
