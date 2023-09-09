'use server';

import { AUTH_DATA_KEY } from '@/config/auth';
import { api } from '@/services/api';
import { ActionResponse } from '@/types/action';
import { AuthenticateUser } from '@/types/requests';
import { cookies } from 'next/headers';
import { SignInValues } from './signin-form';

export async function signInAction(
  data: SignInValues,
): Promise<ActionResponse<AuthenticateUser>> {
  try {
    const { data: response, status } = await api<AuthenticateUser>(
      '/users/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    if (status !== 200) {
      return { error: 'Credenciais inválidas' };
    }

    cookies().set(AUTH_DATA_KEY, JSON.stringify(response));
    return { data: response };
  } catch (error) {
    return { error: 'Erro desconhecido' };
  }
}
