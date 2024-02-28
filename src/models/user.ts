export interface UserData {
  id: number;
  email: string;
  username: string;
  roles: string[];
  profilePicture?: string;
}

export interface UserProfileType {
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  joinDate: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
