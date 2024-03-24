import { LightPost } from 'models/post';
import { UserData, UserProfileType } from 'models/user';
import { CommonState, PaginatedData } from 'store/shared/commonState';

export interface UserState extends CommonState<UserData | null> {}

export interface ProfileState {
  userProfile: CommonState<UserProfileType | null>;
  userPosts: CommonState<PaginatedData<LightPost[]>>;
}
