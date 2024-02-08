import { UserData } from 'models/user';
import { CommonState } from 'store/shared/commonState';

export interface UserState extends CommonState<UserData | null> {}
