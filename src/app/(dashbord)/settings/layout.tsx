import { ReactNode } from 'react';
import { Navbar } from './navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-semibold text-3xl">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta
        </p>
      </div>

      <Navbar />

      <div className="pt-2">{children}</div>
    </div>
  );
}
