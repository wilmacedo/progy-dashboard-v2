import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { Inter } from '@next/font/google';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

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
    <html lang="pt-BR" className={inter.className}>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
