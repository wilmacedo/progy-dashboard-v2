'use server';

import { api } from '@/services/api';
import { ActionResponse } from '@/types/action';
import { ProfileFormValues } from './profile-form';

export async function profileAction(
  data: ProfileFormValues,
  userId: number,
): Promise<ActionResponse<boolean>> {
  try {
    const { status } = await api(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: data.name }),
    });
    if (status !== 200) {
      return { error: 'Erro ao atualizar o perfil' };
    }

    return { data: status === 200 };
  } catch (error) {
    return { error: 'Erro desconhecido' };
  }
}
