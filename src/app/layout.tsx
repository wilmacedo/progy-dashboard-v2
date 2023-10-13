import { getTheme } from '@/contexts/theme/get-theme';
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
    template: '%s – Progy',
  },
  description:
    'O Progy é uma solução em software de gerenciamento de planejamento. Transforme suas visões em realidade e impulsione seu negócio com estratégias eficientes e resultados concretos. Descubra como podemos otimizar seu planejamento e alcançar seus objetivos.',
  themeColor: '#ffffff',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={getTheme()}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
