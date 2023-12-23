import { ContentNavbar } from '@/components/content-navbar';
import { generateTabs } from '@/config/project';
import { api } from '@/services/api';
import { Initiative } from '@/types/request';
import { notFound } from 'next/navigation';
import { getPlannings } from '../get-planning';
import { ProjectSwitcher } from '../project-switcher';
import { columns } from './columns';
import { InitiativeTable } from './initiative-table';

interface PageProps {
  params: {
    id: number;
  };
}

async function getInitiatives(planningId: number) {
  const filters = {
    populate: 'fonts,stages,units',
  };
  const params = new URLSearchParams(filters);

  try {
    const { data, status } = await api<Initiative[]>(
      `/plannings/${planningId}/initiatives?${params.toString()}`,
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
  if (isNaN(params.id)) {
    notFound();
  }

  const plannings = await getPlannings();
  const planning = plannings.find(
    planning => planning.id === Number(params.id),
  );
  if (!planning) {
    notFound();
  }

  const initiatives = await getInitiatives(planning.id);

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateTabs(planning.id)} />

      <InitiativeTable columns={columns} data={initiatives as any} />
    </div>
  );
}
