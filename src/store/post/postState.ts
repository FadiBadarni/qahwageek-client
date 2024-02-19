import { Category, LightPost, Post } from 'models/post';
import { CommonState, LoadingStatus } from 'store/shared/commonState';

export interface PostState {
  currentPost: CommonState<Post | null>;
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
