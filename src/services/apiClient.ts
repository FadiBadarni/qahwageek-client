import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ErrorData {
  status?: number;
  message: string;
}

const BASE_URL = process.env.REACT_APP_API_URL;
const UNAUTHORIZED = 401;
const LOGIN_PAGE_URL = '/login';

const apiClient = axios.create({
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

apiClient.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorData>) => {
    const originalRequest = error.config as any;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Attempt to refresh the token
        await apiClient.post('/auth/refresh', {}, { withCredentials: true });

        // If refresh was successful, retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login on refresh token failure
        window.location.href = LOGIN_PAGE_URL;
        return Promise.reject(refreshError);
      }
    }

    // For all other errors, use the handleApiError function to process and reject the promise
    const processedError = handleApiError(error);
    return Promise.reject(processedError);
  }
);

export default apiClient;
