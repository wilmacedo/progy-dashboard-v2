import { ContentNavbar } from '@/components/content-navbar';
import { generateProjectTabs } from '@/config/project-config';
import { api } from '@/services/api';
import { Activity, Initiative, State } from '@/types/request';
import { User } from '@/types/requests';
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
    populate: 'initiatives',
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

async function getUsers(planningId: number) {
  try {
    const { data, status } = await api<User[]>(
      `/plannings/${planningId}/users`,
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

  const [activity, states, initiatives, users] = await Promise.all([
    getActivity(planningId, activityId),
    getStates(planningId),
    getInitiatives(planningId),
    getUsers(planningId),
  ]);
  if (activity === null) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateProjectTabs(planning.id)} />

      <ActivityForm
        planning={planning}
        activity={activity}
        states={states}
        initiatives={initiatives}
        users={users}
      />
    </div>
  );
}
