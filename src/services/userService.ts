import { LoginRequest } from 'models/user';
import axiosClient from './axiosClient';

class UserService {
  static async loginService(credentials: LoginRequest) {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async logoutService() {
    try {
      await axiosClient.post('/auth/logout');
    } catch (error) {
      throw error;
    }
  }
  static async getUserInfoService() {
    try {
      const response = await axiosClient.get('/user/info');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
