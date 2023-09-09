import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Planejamentos',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Sidebar>{children}</Sidebar>;
}
