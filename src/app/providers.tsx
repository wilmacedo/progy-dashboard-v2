import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth/auth-context';
import { Fragment, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Fragment>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </Fragment>
  );
}
