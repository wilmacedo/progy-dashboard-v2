import { ReactNode, Suspense } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Suspense fallback={<h1>CARREGANDO DASHBOARD...</h1>}>{children}</Suspense>
  );
}
