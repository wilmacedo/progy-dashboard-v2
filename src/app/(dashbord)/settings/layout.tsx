import { ReactNode } from 'react';

interface SettingsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: 'Configurações | Progy',
    template: '%s | Configurações',
  },
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <div>{children}</div>;
}
