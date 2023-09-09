import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '../styles/global.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: 'Progy',
    template: '%s | Progy',
  },
  description: 'Dashboard to manage planning',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="light">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
