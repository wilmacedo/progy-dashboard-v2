import { ContentNavbar } from '@/components/content-navbar';
import { generateTabs } from '@/config/project';
import { api } from '@/services/api';
import { Activity, Initiative, State } from '@/types/request';
import { notFound } from 'next/navigation';
import { getPlannings } from '../get-planning';
import { ProjectSwitcher } from '../project-switcher';
import { ActivityTable } from './activity-table';
import { columns } from './columns';

interface PageProps {
  params: {
    id: number;
  };
}

async function getActivities(planningId: number) {
  const filters = {
    populate: 'states,initiatives',
  };
  const params = new URLSearchParams(filters);

  try {
    const { data, status } = await api<Activity[]>(
      `/plannings/${planningId}/activities?${params.toString()}`,
    );
    if (status !== 200) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
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

async function getInitiatives(planningId: number) {
  try {
    const { data, status } = await api<Initiative[]>(
      `/plannings/${planningId}/initiatives`,
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

  const [activities, states, initiatives] = await Promise.all([
    getActivities(planning.id),
    getStates(planning.id),
    getInitiatives(planning.id),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateTabs(planning.id)} />

      <ActivityTable
        columns={columns}
        data={activities}
        states={states}
        initiatives={initiatives}
      />
    </div>
  );
}
