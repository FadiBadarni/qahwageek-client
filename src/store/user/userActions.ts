import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest } from 'models/user';
import UserService from 'services/userService';

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
