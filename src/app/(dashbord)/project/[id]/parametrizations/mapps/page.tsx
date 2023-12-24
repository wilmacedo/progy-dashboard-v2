import { api } from '@/services/api';
import { Mapp } from '@/types/request';
import { ParamTable } from '../param-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getMapps(planningId: number) {
  try {
    const { data, status } = await api<Mapp[]>(
      `/plannings/${planningId}/mapps`,
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
  const mapps = await getMapps(params.id);
  const emptyText = 'Nenhum código MAPP encontrado';

  return <ParamTable columns={columns} data={mapps} emptyText={emptyText} />;
}
