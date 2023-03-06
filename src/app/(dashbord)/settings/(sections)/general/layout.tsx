import { mockedUser } from '@/constants';
import { ReactNode, Suspense } from 'react';
import { Form } from './Form';

interface GeneralLayoutProps {
  children: ReactNode;
}

export default async function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <Suspense fallback={<Form loading={true} user={mockedUser} />}>
      {children}
    </Suspense>
  );
}
