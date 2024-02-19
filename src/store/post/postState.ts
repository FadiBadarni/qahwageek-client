import { Category, RecentPost } from 'models/post';
import { CommonState } from 'store/shared/commonState';

export interface PostState extends CommonState<RecentPost[]> {}

export interface CategoryState extends CommonState<Category[]> {}
