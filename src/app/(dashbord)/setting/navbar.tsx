'use client';

import { getCurrentTab, tabs } from '@/config/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 font-medium text-center text-muted-foreground border-b border-border overflow-x-auto overflow-y-hidden">
      <ul className="flex -mb-px">
        {tabs.map((tab, index) => (
          <Link href={tab.path} key={index}>
            <li
              key={index}
              data-current={getCurrentTab(pathname) === index}
              className="group mr-2"
            >
              <span
                className={twMerge(
                  'inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg cursor-pointer',
                  'hover:text-600 hover:border-foreground/70',
                  'group-data-[current=true]:text-primary group-data-[current=true]:border-primary',
                )}
              >
                {tab.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
