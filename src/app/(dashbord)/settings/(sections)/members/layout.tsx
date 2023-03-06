import { ReactNode, Suspense } from 'react';

interface MembersLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Membros',
};

export default function MembersLayout({ children }: MembersLayoutProps) {
  return (
    <div>
      <Suspense fallback={<h1>CARREGANDO MEMBERS...</h1>}>{children}</Suspense>
    </div>
  );
}
