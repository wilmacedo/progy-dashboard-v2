import { ContentNavbar } from '@/components/content-navbar';
import { tabs } from '@/config/tabs';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'Configurações – Progy',
    template: '%s – Configurações – Progy',
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-semibold text-3xl">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta
        </p>
      </div>

      <ContentNavbar tabs={tabs} />

      <div className="pt-2">{children}</div>
    </div>
  );
}
