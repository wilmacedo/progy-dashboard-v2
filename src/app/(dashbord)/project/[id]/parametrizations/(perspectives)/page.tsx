import { api } from '@/services/api';
import { Perspective } from '@/types/request';
import { columns } from './columns';
import { PerspectiveTable } from './perspective-table';

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

  return <PerspectiveTable columns={columns} data={perspectives} />;
}
