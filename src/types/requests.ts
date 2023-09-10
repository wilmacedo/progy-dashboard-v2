export interface User {
  email: string;
  id: number;
  name: string;
  role: string;
}

export interface AuthenticateUser {
  role_id: number;
  token: string;
  user: User;
}
