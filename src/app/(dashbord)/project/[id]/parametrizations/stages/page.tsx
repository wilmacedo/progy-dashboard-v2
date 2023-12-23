import { api } from '@/services/api';
import { Perspective } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getStages(planningId: number) {
  try {
    const { data, status } = await api<Perspective[]>(
      `/plannings/${planningId}/stages`,
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
  const stages = await getStages(params.id);
  const emptyText = 'Nenhum estágio encontrado';

  return <ParamTable columns={columns} data={stages} emptyText={emptyText} />;
}
