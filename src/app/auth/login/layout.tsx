import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Log In',
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <div>{children}</div>;
}
