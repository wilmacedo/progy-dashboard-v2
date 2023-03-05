import { AuthUser } from '@/types/user';

export const STORAGE_PATH = '@progy';
export const AUTH_DATA_KEY = `${STORAGE_PATH}/auth`;

export const mockedUser: AuthUser = {
  id: -1,
  name: 'Desconhecido',
  email: 'desconhecido@gmail.com',
};
