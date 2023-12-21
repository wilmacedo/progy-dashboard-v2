'use server';

import { api } from '@/services/api';
import { ActionResponse } from '@/types/action';
import { NotificationFormValues } from './notification-form';

export async function notificationAction(
  data: NotificationFormValues,
  userId: number,
): Promise<ActionResponse<boolean>> {
  try {
    const { status } = await api('/notifications/' + userId, {
      method: 'PUT',
      body: JSON.stringify({ activity: data.activity }),
    });
    if (status !== 200) {
      return { error: 'Erro ao atualizar as notificações' };
    }

    return { data: status === 200 };
  } catch (error) {
    return { error: 'Erro desconhecido' };
  }
}
