'use client';

import Button from '@/components/Button';
import { getCurrentTab, tabs } from '@/config/tabs';
import { ct } from '@/utils/style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, ReactNode } from 'react';

interface SectionLayoutProps {
  children: ReactNode;
}

export default function SectionLayout({ children }: SectionLayoutProps) {
  const pathname = usePathname();
  const currentTab = tabs[getCurrentTab(pathname)];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="mb-6 font-semibold text-3xl">Configurações</h1>

      <div className="mb-8 font-medium text-center text-gray-500 border-b border-gray-100">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <Link href={tab.path} key={index}>
              <li
                key={index}
                data-current={getCurrentTab(pathname) === index}
                className="group mr-2"
              >
                <span
                  className={ct(
                    'inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg cursor-pointer',
                    'hover:text-600 hover:border-gray-600',
                    'group-data-[current=true]:text-blue-300 group-data-[current=true]:border-blue-300',
                  )}
                >
                  {tab.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <form id="form" onSubmit={handleSubmit}>
        <div>
          <div className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-xl font-semibold">
                  {currentTab.title}
                </h2>
                <span className=" text-sm text-gray-500">
                  {currentTab.description}
                </span>
              </div>

              <Button type="submit">Salvar</Button>
            </div>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </form>
    </div>
  );
}
