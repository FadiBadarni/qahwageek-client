import { Category, LightPost } from 'models/post';
import { CommonState } from 'store/shared/commonState';

export interface PostState extends CommonState<LightPost[]> {}

export interface CategoryState extends CommonState<Category[]> {}
