import { ReactNode } from 'react';

interface PlanningLayoutProps {
  children: ReactNode;
}

export default function PlanningLayout({ children }: PlanningLayoutProps) {
  return (
    <div className="relative h-[calc(100vh-2rem)]">
      <div className="pb-4 border-b border-gray-100">
        <h1 className="mb-6 font-semibold text-3xl">Criar novo módulo</h1>
        <span className="text-md text-gray-500">
          De o passo inicial para a criação de um novo módulo
        </span>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
