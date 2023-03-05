import { ReactNode } from 'react';

interface SettingsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Configurações | Progy',
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <div>{children}</div>;
}
