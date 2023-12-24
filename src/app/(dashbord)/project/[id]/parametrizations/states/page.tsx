import { api } from '@/services/api';
import { State } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getStates(planningId: number) {
  try {
    const { data, status } = await api<State[]>(
      `/plannings/${planningId}/states`,
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
  const states = await getStates(params.id);
  const emptyText = 'Nenhum status encontrado';

  return <ParamTable columns={columns} data={states} emptyText={emptyText} />;
}
