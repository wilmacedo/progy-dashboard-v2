export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthenticateUser {
  role: string;
  token: string;
  user: User;
}
