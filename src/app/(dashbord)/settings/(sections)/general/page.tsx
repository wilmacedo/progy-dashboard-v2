import Input from '@/components/Input';
import { mockedUser } from '@/constants';
import { api } from '@/services/api/server';
import { User } from '@/types/user';
import { toast } from 'react-toastify';
import { fields } from './config';

async function getUserData(): Promise<User | undefined> {
  const { data, error } = await api<User>({
    method: 'GET',
    route: '/users/me',
  });
  if (error) {
    toast.error('Não foi possível carregar os seus dados pessoais');
    return mockedUser;
  }

  return data;
}

export default async function Detail() {
  const user = await getUserData();

  return (
    <div>
      {fields.map((field, index) => (
        <div className="pt-4 pb-8 flex border-b border-gray-100" key={index}>
          <div className="w-[30rem]">
            <span>{field.label}</span>
            <p className="text-sm text-gray-500">{field.description}</p>
          </div>
          <Input
            className="w-full max-w-lg"
            placeholder="Digite seu nome"
            defaultValue={user && user[field.key]}
          />
        </div>
      ))}
    </div>
  );
}
