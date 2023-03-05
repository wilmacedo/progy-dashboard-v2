'use client';

import { getCurrentTab, tabs } from '@/config/tabs';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export default function SectionLayout({ children }: SectionProps) {
  const pathname = usePathname();

  return (
    <div>
      <h1 className="mb-6 font-semibold text-3xl">Configurações</h1>

      <div className="mb-8 font-medium text-center text-[#7b7a88] border-b border-gray-100">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <li
              key={index}
              data-current={getCurrentTab(pathname) === index}
              className="group mr-2"
            >
              <span className="inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg cursor-pointer hover:text-[#4D4C5F] hover:border-[#4D4C5F] group-data-[current=true]:text-[#3E6BF7] group-data-[current=true]:border-[#3E6BF7]">
                {tab.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  );
}
