export interface UserData {
  id: number;
  email: string;
  username: string;
  roles: string[];
  profilePicture?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
