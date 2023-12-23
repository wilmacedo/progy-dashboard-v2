import { ContentNavbar } from '@/components/content-navbar';
import { links } from '@/config/parametrization-routes';
import { generateTabs } from '@/config/project';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getPlannings } from '../get-planning';
import { ProjectSwitcher } from '../project-switcher';
import { SidebarNav } from './sidebar-nav';

interface PageProps {
  params: {
    id: number;
  };
  children: ReactNode;
}

export default async function Layout({ params, children }: PageProps) {
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

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <ProjectSwitcher active={planning} list={plannings} />
      </div>

      <ContentNavbar tabs={generateTabs(planning.id)} />

      <div className="grid grid-cols-1 md:grid-cols-[15rem_1fr] items-start gap-8">
        <SidebarNav planningId={planning.id} links={links} />

        {children}
      </div>
    </div>
  );
}
