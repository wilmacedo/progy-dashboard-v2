'use client';

import { Button } from '@/components/ui/button';
import { ParametrizationSection } from '@/config/parametrization-routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface SidebarNavProps {
  planningId: number;
  links: ParametrizationSection[];
}

export function SidebarNav({ planningId, links }: SidebarNavProps) {
  const pathname = usePathname();
  const baseUrl = `/project/${planningId}/parametrizations/`;

  function isCurrentRoute(href: string) {
    let path = pathname.split('parametrizations/')[1];
    if (path === undefined) path = '';

    return path === href;
  }

  return (
    <div className="flex gap-2">
      <nav className="w-full flex md:flex-col space-y-1">
        {links.map(link => (
          <Button
            key={link.href}
            variant="ghost"
            data-current={isCurrentRoute(link.href)}
            className={twMerge(
              'w-full justify-start',
              'data-[current=true]:bg-muted data-[current=true]:hover:bg-muted',
            )}
            asChild
          >
            <Link href={baseUrl + link.href}>
              {link.Icon && (
                <link.Icon strokeWidth={1.5} className="mr-2 w-5 h-5" />
              )}
              {link.name}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
