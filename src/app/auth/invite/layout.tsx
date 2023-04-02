import { ReactNode } from 'react';

interface InviteLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Confirmar convite',
};

export default function InviteLayout({ children }: InviteLayoutProps) {
  return <div>{children}</div>;
}
