import { api } from '@/services/api';
import { Planning } from '@/types/request';
import { notFound } from 'next/navigation';

export async function getPlannings() {
  try {
    const { data, status } = await api<Planning[]>('/plannings');
    if (status === 404) {
      notFound();
    }

    if (status !== 200) {
      // TODO: Redirect error page
      notFound();
    }

    return data;
  } catch (error) {
    // TODO: Redirect error page
    notFound();
  }
}
