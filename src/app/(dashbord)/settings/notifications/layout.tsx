import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Notificações',
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
