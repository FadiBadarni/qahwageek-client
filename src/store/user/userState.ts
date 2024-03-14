import { UserData, UserProfileType } from 'models/user';
import {
  CommonState,
  LoadingStatus,
  PaginatedData,
} from 'store/shared/commonState';

export interface UserState extends CommonState<UserData | null> {}

export interface ProfileState extends CommonState<UserProfileType | null> {}

export interface AdminState {
  users: CommonState<PaginatedData<UserData[]>>;
}

export const initialUsersState: AdminState = {
  users: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
};
