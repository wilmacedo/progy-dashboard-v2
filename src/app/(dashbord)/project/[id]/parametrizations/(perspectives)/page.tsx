import { api } from '@/services/api';
import { Perspective } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getPerspectives(planningId: number) {
  try {
    const { data, status } = await api<Perspective[]>(
      `/plannings/${planningId}/perspectives`,
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
  const perspectives = await getPerspectives(params.id);
  const emptyText = 'Nenhuma perspectiva encontrada';

  return (
    <ParamTable columns={columns} data={perspectives} emptyText={emptyText} />
  );
}
