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
  static async logoutService() {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
  static async getUserInfoService() {
    try {
      const response = await apiClient.get('/user/info');
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user info');
    }
  }
}

export default UserService;
