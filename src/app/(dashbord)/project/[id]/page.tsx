import { ContentNavbar, TabConfig } from '@/components/content-navbar';
import { DatePickerWithRange } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Role } from '@/constants/roles';
import { getServerAuth } from '@/contexts/auth/get-server-auth';
import { api } from '@/services/api';
import { Planning } from '@/types/request';
import { addDays } from 'date-fns';
import { notFound } from 'next/navigation';
import { ProjectSwitcher } from './project-switcher';

interface PageProps {
  params: {
    id: number;
  };
}

async function getPlannings() {
  try {
    const { data, status } = await api<Planning[]>('/plannings/');
    if (status === 404) {
      notFound();
    }

    if (status !== 200) {
      // TODO: Redirect error page
      notFound();
    }

    return data;
  } catch (error) {
    // TODO: Redirect error page
    notFound();
  }
}

const tabs: TabConfig[] = [
  { name: 'Visão Geral', path: '/', excludeRoles: [] },
  {
    name: 'Parametrizações',
    path: '/parametrization',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Iniciativas',
    path: '/initiatives',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Atividades',
    path: '/activities',
    excludeRoles: [Role.USER],
  },
];

export default async function Page({ params }: PageProps) {
  if (isNaN(params.id)) {
    notFound();
  }

  const auth = getServerAuth();
  if (!auth) {
    notFound();
  }

  const plannings = await getPlannings();
  const planning = plannings.find(
    planning => planning.id === Number(params.id),
  );
  if (!planning) {
    notFound();
  }

  function generateTabs() {
    const basePath = `/project/${planning?.id}`;

    return tabs.map(tab => ({ ...tab, path: basePath + tab.path }));
  }

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />

        <div className="w-full flex flex-col sm:w-auto sm:flex-row items-center gap-2">
          <DatePickerWithRange
            className="w-full sm:w-auto"
            range={{
              from: new Date(2022, 0, 20),
              to: addDays(new Date(2022, 0, 20), 20),
            }}
          />
          <Button disabled className="w-full sm:w-auto">
            Relatório
          </Button>
        </div>
      </div>

      <ContentNavbar tabs={generateTabs()} />
    </div>
  );
}
