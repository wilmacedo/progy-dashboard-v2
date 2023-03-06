import { ReactNode, Suspense } from 'react';

interface ListLayoutProps {
  children: ReactNode;
}

export default async function ListLayout({ children }: ListLayoutProps) {
  return (
    <div>
      <div className="pb-4 border-b border-gray-100">
        <h1 className="mb-6 font-semibold text-3xl">Planejamentos</h1>
        <span className="text-md text-gray-500">
          Veja todos os planejamentos disponíveis aqui
        </span>
      </div>

      <Suspense fallback={<h1>CARREGANDO PLANEJAMENTOS...</h1>}>
        {children}
      </Suspense>
    </div>
  );
}
