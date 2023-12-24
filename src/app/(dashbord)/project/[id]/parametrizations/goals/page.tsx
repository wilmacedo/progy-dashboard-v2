import { api } from '@/services/api';
import { Goal } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getGoals(planningId: number) {
  try {
    const { data, status } = await api<Goal[]>(
      `/plannings/${planningId}/goals`,
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
  const goals = await getGoals(params.id);
  const emptyText = 'Nenhum objetivo encontrado';

  return <ParamTable columns={columns} data={goals} emptyText={emptyText} />;
}
