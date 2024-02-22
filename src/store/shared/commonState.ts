import { Action } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { AuthState } from 'store/auth/authReducer';
import { UserState } from 'store/user/userState';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface CommonState<T> {
  data: T;
  status: LoadingStatus;
  error: string | null;
}

export interface PaginatedData<T> {
  items: T;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

interface RehydratePayload {
  auth?: AuthState;
  user?: UserState;
}

export interface RehydrateAction extends Action<typeof REHYDRATE> {
  payload?: RehydratePayload;
}
