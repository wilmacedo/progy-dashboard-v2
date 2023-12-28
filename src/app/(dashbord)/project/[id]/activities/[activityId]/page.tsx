import { ContentNavbar } from '@/components/content-navbar';
import { generateProjectTabs } from '@/config/project-config';
import { api } from '@/services/api';
import { Activity } from '@/types/request';
import { notFound } from 'next/navigation';
import { getPlannings } from '../../get-planning';
import { ProjectSwitcher } from '../../project-switcher';
import { ActivityForm } from './activity-form';

interface PageProps {
  params: {
    id: string;
    activityId: string;
  };
}

async function getActivity(planningId: number, id: number) {
  const filters = {
    populate: 'states,initiatives',
  };
  const params = new URLSearchParams(filters);

  try {
    const { data, status } = await api<Activity>(
      `/plannings/${planningId}/activities/${id}?${params.toString()}`,
    );
    if (status !== 200) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const planningId = Number(params.id);
  const activityId = Number(params.activityId);
  if (isNaN(planningId) || isNaN(activityId)) {
    notFound();
  }

  const plannings = await getPlannings();
  const planning = plannings.find(
    planning => planning.id === Number(params.id),
  );
  if (!planning) {
    notFound();
  }

  const activity = await getActivity(planningId, activityId);
  if (activity === null) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateProjectTabs(planning.id)} />

      <ActivityForm planning={planning} activity={activity} />
    </div>
  );
}
