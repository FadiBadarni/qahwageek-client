import { LoginRequest, RegisterRequest, SocialMediaHandle } from 'models/user';
import axiosClient from './axiosClient';

class UserService {
  static async registerService(registerRequest: RegisterRequest) {
    try {
      const response = await axiosClient.post(
        '/auth/register',
        registerRequest
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
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
  static async getUserProfileService(userId: number) {
    try {
      const response = await axiosClient.get(`/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPresignedUrlForProfilePicture(
    filename: string,
    contentType: string
  ) {
    try {
      const response = await axiosClient.post(
        `/user/profile-picture/presigned-url`,
        {
          filename,
          contentType,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserProfile(
    userId: number,
    profileData: { profilePicture: string }
  ) {
    try {
      const response = await axiosClient.put(
        `/user/${userId}/profile`,
        profileData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserDetails(
    userId: number,
    profileData: { bio: string; socialMediaHandles: SocialMediaHandle[] }
  ) {
    try {
      const response = await axiosClient.put(
        `/user/${userId}/profile/details`,
        profileData
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export default UserService;
