import { mockedUser } from '@/constants';
import { ReactNode, Suspense } from 'react';
import { Form } from './form';

interface GeneralLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Geral',
};

export default async function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <Suspense fallback={<Form loading={true} user={mockedUser} />}>
      {children}
    </Suspense>
  );
}
