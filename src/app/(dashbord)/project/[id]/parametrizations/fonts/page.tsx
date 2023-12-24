import { api } from '@/services/api';
import { Font } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getFonts(planningId: number) {
  try {
    const { data, status } = await api<Font[]>(
      `/plannings/${planningId}/fonts`,
    );
    if (status !== 200) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const fonts = await getFonts(params.id);
  const emptyText = 'Nenhuma fonte encontrada';

  return <ParamTable columns={columns} data={fonts} emptyText={emptyText} />;
}
