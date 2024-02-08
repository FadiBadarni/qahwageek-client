import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest } from 'models/user';
import UserService from 'services/userService';
import { clearUser } from './userReducer';

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
