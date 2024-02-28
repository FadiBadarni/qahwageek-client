import { UserData, UserProfileType } from 'models/user';
import { CommonState } from 'store/shared/commonState';

export interface UserState extends CommonState<UserData | null> {}

export interface ProfileState extends CommonState<UserProfileType | null> {}
