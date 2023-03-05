export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface User extends AuthUser {
  role_id: string;
  institution_id: string;
}
