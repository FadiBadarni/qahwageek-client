import { LightPost } from './post';

export interface UserData {
  id: number;
  email: string;
  username: string;
  roles: string[];
  profilePicture?: string;
}

export interface UserProfileType {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  joinDate: string;
  posts: LightPost[];
  socialMediaHandles: SocialMediaHandle[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SocialMediaHandle {
  id?: number;
  platform: string;
  handle: string;
}
