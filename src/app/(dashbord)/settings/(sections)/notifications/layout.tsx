import { ReactNode, Suspense } from 'react';
import { OptionsSkeleton } from './OptionsSkeleton';

interface NotificationLayoutProps {
  children: ReactNode;
}

export default function NotificationLayout({
  children,
}: NotificationLayoutProps) {
  return <Suspense fallback={<OptionsSkeleton />}>{children}</Suspense>;
}
