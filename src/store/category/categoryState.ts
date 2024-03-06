import { Category } from 'models/post';
import { CommonState, LoadingStatus } from 'store/shared/commonState';

export interface CategoryState {
  categories: CommonState<Category[]>;
  currentCategory: CommonState<Category | null>;
}

export const initialCategoryState: CategoryState = {
  categories: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  currentCategory: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
};
