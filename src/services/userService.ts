import { LoginRequest } from 'models/user';
import axiosClient from './axiosClient';

class UserService {
  static async loginService(credentials: LoginRequest) {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
  static async logoutService() {
    try {
      await axiosClient.post('/auth/logout');
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
  static async getUserInfoService() {
    try {
      const response = await axiosClient.get('/user/info');
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user info');
    }
  }
}

export default UserService;
