import { Role } from '@/constants/roles';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface AuthenticateUser {
  role: string;
  token: string;
  user: User;
}
