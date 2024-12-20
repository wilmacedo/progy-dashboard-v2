import { Metadata } from 'next';
import { Fragment, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Recuperação de senha',
};

export default function Layout({ children }: LayoutProps) {
  return <Fragment>{children}</Fragment>;
}
