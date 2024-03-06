import { LightPost, Post } from 'models/post';
import {
  CommonState,
  LoadingStatus,
  PaginatedData,
} from 'store/shared/commonState';

export interface PostState {
  currentPost: CommonState<Post | null>;
  recentPosts: CommonState<LightPost[]>;
  featuredPosts: CommonState<LightPost[]>;
  latestProgrammingPosts: CommonState<LightPost[]>;
  latestCareerPosts: CommonState<LightPost[]>;
  latestTermsPosts: CommonState<LightPost[]>;
  categoryPosts: CommonState<PaginatedData<LightPost[]>>;
  relatedPosts: CommonState<PaginatedData<LightPost[]>>;
}

export const initialPostsState: PostState = {
  currentPost: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
  recentPosts: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  featuredPosts: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  latestProgrammingPosts: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  latestCareerPosts: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  latestTermsPosts: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  categoryPosts: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
  relatedPosts: {
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
