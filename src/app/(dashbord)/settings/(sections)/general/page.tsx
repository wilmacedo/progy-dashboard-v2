import { mockedUser } from '@/constants';
import { api } from '@/services/api/server';
import { User } from '@/types/user';
import { Form } from './Form';

export interface GeneralResponse {
  user: User;
  error?: string;
}

async function getUserData(): Promise<GeneralResponse> {
  const { data, error } = await api<User>({
    method: 'GET',
    route: '/users/me',
  });

  return { user: data || mockedUser, error };
}

export default async function General() {
  const data = await getUserData();

  return <Form loading={false} {...data} />;
}
