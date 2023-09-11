import { ct } from '@/utils/style';
import { ReactNode } from 'react';

interface ListLayoutProps {
  children: ReactNode;
}

export default async function ListLayout({ children }: ListLayoutProps) {
  return (
    <div>
      <div className="pb-4 border-b border-border space-y-2">
        <h1 className=" font-semibold text-3xl">Planejamentos</h1>
        <p className="text-md text-muted-foreground">
          Veja todos os planejamentos disponíveis aqui
        </p>
      </div>

      <div
        className={ct(
          'relative mt-4 grid grid-flow-row gap-6',
          'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5',
        )}
      >
        {children}
      </div>
    </div>
  );
}
