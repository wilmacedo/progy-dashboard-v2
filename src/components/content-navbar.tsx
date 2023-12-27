'use client';

import { Role, roleAlias } from '@/constants/roles';
import { useAuth } from '@/contexts/auth/auth-context';
import { TabConfig } from '@/types/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface ContentNavbar {
  tabs: TabConfig[];
  disabled?: boolean;
}

export function ContentNavbar({ tabs, disabled }: ContentNavbar) {
  const pathname = usePathname();
  const { role: userRole } = useAuth();

  function getTabs() {
    const role = roleAlias.find(alias => alias.current === userRole)?.current;

    return tabs.filter(tab => !tab.excludeRoles?.includes(role ?? Role.USER));
  }

  function getCurrentTab(pathname: string) {
    const index = tabs.findIndex(tab => {
      for (const path of tab.paths) {
        if ((tab.basePath || '') + path === pathname) {
          return true;
        }
      }

      return false;
    });
    if (index === -1) return 0;

    return index;
  }

  return (
    <nav className="mb-4 font-medium text-center text-muted-foreground border-b border-border overflow-x-auto overflow-y-hidden">
      <ul className="flex -mb-px">
        {getTabs().map((tab, index) => (
          <Link href={(tab.basePath || '') + tab.paths[0]} key={index}>
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
