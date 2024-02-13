export interface UserData {
  id: number;
  email: string;
  username: string;
  roles: any[];
}

export interface LoginRequest {
  username: string;
  password: string;
}
