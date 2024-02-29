import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest } from 'models/user';
import UserService from 'services/userService';
import { clearUser } from './userReducer';
import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const data = await UserService.loginService(credentials);
      return data;
    } catch (error) {
      const message = (error as Error).message || 'Failed to log in';
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await UserService.logoutService();
      dispatch(clearUser());
    } catch (error) {
      const message = (error as Error).message || 'Failed to log out';
      return rejectWithValue(message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await UserService.getUserInfoService();
      return data;
    } catch (error) {
      const message = (error as Error).message || 'Failed to fetch user info';
      return rejectWithValue(message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (userId: number, { rejectWithValue }) => {
    try {
      const userProfile = await UserService.getUserProfileService(userId);
      return userProfile;
    } catch (error) {
      const message =
        (error as Error).message || 'Failed to fetch user profile';
      return rejectWithValue(message);
    }
  }
);
//TODO: add reducers in response to this action.
export const uploadProfilePicture = createAsyncThunk(
  'user/uploadProfilePicture',
  async (
    { userId, file }: { userId: number; file: File },
    { rejectWithValue }
  ) => {
    try {
      const { presignedUrl, imageUrl } =
        await UserService.getPresignedUrlForProfilePicture(
          file.name,
          file.type
        );

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      await UserService.updateUserProfile(userId, { profilePicture: imageUrl });

      return imageUrl;
    } catch (error: any) {
      console.error('Failed to upload profile picture:', error);
      return rejectWithValue(
        error.response?.data || 'Unable to upload profile picture'
      );
    }
  }
);
