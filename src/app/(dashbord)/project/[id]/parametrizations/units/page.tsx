import { api } from '@/services/api';
import { Unit } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getUnits(planningId: number) {
  try {
    const { data, status } = await api<Unit[]>(
      `/plannings/${planningId}/units`,
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
  const units = await getUnits(params.id);
  const emptyText = 'Nenhuma unidade encontrada';

  return <ParamTable columns={columns} data={units} emptyText={emptyText} />;
}
