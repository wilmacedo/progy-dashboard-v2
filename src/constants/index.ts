import { User } from '@/types/user';

export const STORAGE_PATH = '@progy';
export const AUTH_DATA_KEY = `${STORAGE_PATH}/auth`;

export const mockedUser: User = {
  id: -1,
  name: 'Desconhecido',
  email: 'desconhecido@gmail.com',
  institution_id: -1,
  role_id: -1,
};
