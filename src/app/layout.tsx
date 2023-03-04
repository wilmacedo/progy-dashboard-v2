import { Inter } from '@next/font/google';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import '../styles/global.css';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Progy',
  description: 'Dashboard to manage planning',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <Sidebar>
          <div>{children}</div>
        </Sidebar>
      </body>
    </html>
  );
}
