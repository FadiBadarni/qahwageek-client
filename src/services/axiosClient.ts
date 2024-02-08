import { Store } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { clearAuthState } from 'store/auth/authReducer';
import { AppDispatch, RootState } from 'store/store';
import { clearUser } from 'store/user/userReducer';

export interface ErrorData {
  status?: number;
  message: string;
}

const BASE_URL = process.env.REACT_APP_API_URL;
const UNAUTHORIZED = 401;
const LOGIN_PAGE_URL = '/login';
const REFRESH_TOKEN_ENDPOINT = '/auth/refresh';

let store: Store<RootState, any> & {
  dispatch: AppDispatch;
};

export const injectStore = (
  _store: Store<RootState, any> & { dispatch: AppDispatch }
) => {
  store = _store;
};

const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const handleApiError = (error: AxiosError<ErrorData>): ErrorData => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
  return {
    message: error.message || 'Network error or server did not respond.',
  };
};

let isRefreshing = false;
axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorData>) => {
    const originalRequest = error.config as any;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === UNAUTHORIZED &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_TOKEN_ENDPOINT
    ) {
      if (isRefreshing) {
        // If a refresh is already in progress, return a rejected promise to avoid further actions
        // Optionally, you could queue this request or handle it differently
        return Promise.reject('Refresh token operation already in progress.');
      }

      isRefreshing = true;
      originalRequest._retry = true; // Mark the request as retried to avoid looping

      try {
        // Attempt to refresh the token
        await axiosClient.post(
          REFRESH_TOKEN_ENDPOINT,
          {},
          { withCredentials: true }
        );
        isRefreshing = false;

        // If the refresh was successful, retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        store.dispatch(clearUser());
        store.dispatch(clearAuthState());
        // If the refresh token request fails, redirect the user to the login page
        window.location.href = LOGIN_PAGE_URL;
        return Promise.reject(refreshError);
      }
    }

    // For all other errors or if the refresh token request itself fails.
    const processedError = handleApiError(error);
    return Promise.reject(processedError);
  }
);

export default axiosClient;
