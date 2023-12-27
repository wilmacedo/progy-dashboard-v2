import { ContentNavbar } from '@/components/content-navbar';
import { generateProjectTabs } from '@/config/project-config';
import { api } from '@/services/api';
import { Initiative, Stage } from '@/types/request';
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

async function getStages(planningId: number) {
  try {
    const { data, status } = await api<Stage[]>(
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

  const [initiatives, stages] = await Promise.all([
    getInitiatives(planning.id),
    getStages(planning.id),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateProjectTabs(planning.id)} />

      <InitiativeTable
        columns={columns}
        data={initiatives as any}
        stages={stages}
      />
    </div>
  );
}
