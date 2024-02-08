export interface UserData {
  id: number;
  email: string;
  userName: string;
  roles: any[];
}

export interface LoginRequest {
  username: string;
  password: string;
}
