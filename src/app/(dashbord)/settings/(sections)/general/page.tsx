import { mockedUser } from '@/constants';
import { getRoleByName } from '@/constants/roles';
import { api } from '@/services/api/server';
import { User } from '@/types/user';
import { Form } from './form';

export interface GeneralResponse {
  user: User;
  error?: string;
}

async function getUserData(): Promise<GeneralResponse> {
  const { data, error } = await api<User>({
    method: 'GET',
    route: '/users/me',
  });

  if (data && data.role) {
    const roleId = getRoleByName(data.role);
    data.role_id = roleId;
    delete data.role;
  }

  return { user: data || mockedUser, error };
}

export default async function General() {
  const data = await getUserData();

  return <Form loading={false} {...data} />;
}
