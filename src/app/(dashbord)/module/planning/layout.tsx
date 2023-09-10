import { ReactNode } from 'react';

interface PlanningLayoutProps {
  children: ReactNode;
}

export default function PlanningLayout({ children }: PlanningLayoutProps) {
  return (
    <div className="relative h-[calc(100vh-2rem)]">
      <div className="pb-4 border-b border-border space-y-2">
        <h1 className="font-semibold text-3xl">Criar novo módulo</h1>
        <p className="text-md text-muted-foreground">
          Defina as informações, variáveis e métricas para o novo planejamento
        </p>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
