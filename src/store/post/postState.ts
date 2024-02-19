import { Category, LightPost } from 'models/post';
import { CommonState, LoadingStatus } from 'store/shared/commonState';

export interface PostState {
  currentPost: CommonState<LightPost | null>;
  recentPosts: CommonState<LightPost[]>;
  featuredPosts: CommonState<LightPost[]>;
}

export interface CategoryState extends CommonState<Category[]> {}

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
};
