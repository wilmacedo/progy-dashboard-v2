'use server';

import { api } from '@/services/api';
import { ActionResponse } from '@/types/action';
import { MemberFormValues } from './member-dialog-form';

export async function memberInviteAction(
  data: MemberFormValues,
): Promise<ActionResponse<boolean>> {
  try {
    const { status } = await api('/users/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (status !== 200) {
      return { error: 'O membro já foi convidado previamente.' };
    }

    return { data: true };
  } catch (error) {
    return { error: 'Erro desconhecido' };
  }
}
