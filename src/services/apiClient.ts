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
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorData>) => {
    const apiError = handleApiError(error);

    if (apiError.status === UNAUTHORIZED) {
      window.location.href = LOGIN_PAGE_URL;
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
