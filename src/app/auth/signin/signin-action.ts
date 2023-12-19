'use server';

import { api } from '@/services/api';
import { ActionResponse } from '@/types/action';
import { AuthenticateUser } from '@/types/requests';
import { SignInValues } from './signin-form';

export async function signInAction(
  data: SignInValues,
): Promise<ActionResponse<AuthenticateUser>> {
  try {
    const { data: response, status } = await api<AuthenticateUser>(
      '/users/authenticate',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    if (status !== 200) {
      return { error: 'Credenciais inválidas' };
    }

    return { data: response };
  } catch (error) {
    return { error: 'Erro desconhecido' };
  }
}
