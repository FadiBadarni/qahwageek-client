import { Post } from 'models/post';
import { UserData } from 'models/user';
import {
  CommonState,
  LoadingStatus,
  PaginatedData,
} from 'store/shared/commonState';

export interface AdminState {
  users: CommonState<PaginatedData<UserData[]>>;
  posts: CommonState<PaginatedData<Post[]>>;
  selectedPost: CommonState<Post | null>;
}

export const initialAdminState: AdminState = {
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
  posts: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
  selectedPost: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
};
