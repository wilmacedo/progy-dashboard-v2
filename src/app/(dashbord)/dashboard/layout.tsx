import { ReactNode, Suspense } from 'react';
import { DashboardSkeleton } from './skeleton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>;
}
