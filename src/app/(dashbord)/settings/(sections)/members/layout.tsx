import { ReactNode, Suspense } from 'react';

interface MembersLayoutProps {
  children: ReactNode;
}

export default function MembersLayout({ children }: MembersLayoutProps) {
  return (
    <div>
      <Suspense fallback={<h1>CARREGANDO MEMBERS...</h1>}>{children}</Suspense>
    </div>
  );
}
