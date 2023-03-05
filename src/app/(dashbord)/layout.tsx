import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

interface DashboardLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Planejamentos',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Sidebar>{children}</Sidebar>;
}
