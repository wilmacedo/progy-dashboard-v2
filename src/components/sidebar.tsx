'use client';

import { redirectUrl } from '@/config/auth';
import sidebarRoutes, { isCurrentRoute } from '@/config/routes';
import { useAuth } from '@/contexts/auth/auth-context';
import { useTheme } from '@/contexts/theme/theme-context';
import { getFirstsLetters } from '@/utils';
import { ct } from '@/utils/style';
import { getCookie, setCookie } from 'cookies-next';
import { Menu, Palette } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { Logo } from './logo';
import { Button } from './ui/button';

interface SidebarProps {
  children: ReactNode;
}

function getExpandedValue(): boolean {
  const cookie = getCookie('@progy/sidebar');
  if (!cookie) return false;

  try {
    const data = JSON.parse(cookie);

    return data.expanded ?? false;
  } catch (error) {
    return false;
  }
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, signOut, user } = useAuth();
  const { toggleTheme } = useTheme();

  const [expanded, setExpanded] = useState(getExpandedValue());
  const [expandedMobile, setExpandedMobile] = useState(false);

  const routes = sidebarRoutes(role);
  const splittedRoutes = [
    routes.filter(route => !route.bottom),
    routes.filter(route => route.bottom),
  ];

  const handleExpand = () => {
    setExpanded(prev => {
      setCookie('@progy/sidebar', JSON.stringify({ expanded: !prev }));

      return !prev;
    });
  };

  function handleExpandMobile() {
    setExpandedMobile(prev => !prev);
  }

  const handleLogout = () => {
    signOut();
    router.push(redirectUrl);
  };

  return (
    <div data-expanded={expanded} className="group">
      <div
        className={ct(
          'fixed p-2 hidden md:flex flex-col w-64 h-screen bg-accent dark:bg-background border-r border-border duration-200',
          'group-data-[expanded=true]:w-20',
        )}
      >
        <BsArrowLeftShort
          onClick={handleExpand}
          className={ct(
            'absolute top-16 -right-3 bg-background text-foreground text-2xl border border-border rounded-full duration-200 cursor-pointer',
            'hover:bg-accent',
            'group-data-[expanded=true]:rotate-180',
          )}
        />

        <Link href="/" className="h-fit">
          <div className="flex gap-2 h-fit w-fit py-6 px-4 items-center duration-300">
            <Logo className="w-8 h-8" />
            <h1
              className={ct(
                'font-bold tracking-widest whitespace-nowrap',
                'group-data-[expanded=true]:hidden',
              )}
            >
              PROGY
            </h1>
          </div>
        </Link>

        <div className="h-full flex flex-col justify-between">
          {splittedRoutes.map((sideRoute, sideIndex) => (
            <ul key={sideIndex}>
              {sideRoute.map((route, index) => (
                <Link href={route.basePath} key={index}>
                  <li
                    data-current={isCurrentRoute(route, pathname)}
                    className={ct(
                      'group',
                      'm-2 p-2.5 flex flex-row items-center gap-3 rounded-md cursor-pointer duration-200',
                      'hover:bg-foreground/10',
                      'data-[current=true]:bg-foreground/10',
                    )}
                  >
                    <span
                      className={ct(
                        'text-foreground/80 text-2xl',
                        'group-data-[current=true]:text-primary',
                      )}
                    >
                      <route.Icon
                        strokeWidth={route.basePath === '/module' ? 1.25 : 1}
                      />
                    </span>
                    <span
                      className={ct(
                        'flex-1 text-foreground/80 text-sm truncate',
                        'group-data-[current=true]:text-primary',
                        'group-data-[expanded=true]:hidden',
                      )}
                    >
                      {route.name}
                    </span>
                  </li>
                </Link>
              ))}
              {sideIndex === splittedRoutes.length - 1 && (
                <li
                  onClick={toggleTheme}
                  className={ct(
                    'm-2 p-2.5 flex flex-row items-center justify-between gap-3 rounded-md cursor-pointer duration-200',
                    'hover:bg-foreground/10',
                  )}
                >
                  <span
                    className={ct(
                      'text-foreground/80 text-2xl',
                      'group-data-[current=true]:text-primary',
                    )}
                  >
                    <Palette />
                  </span>
                  <span
                    className={ct(
                      'flex-1 text-foreground/80 text-sm truncate',
                      'group-data-[current=true]:text-primary',
                      'group-data-[expanded=true]:hidden',
                    )}
                  >
                    Alterar tema
                  </span>
                </li>
              )}
              {sideIndex === splittedRoutes.length - 1 && (
                <li
                  onClick={handleLogout}
                  className={ct(
                    'm-2 p-2.5 flex flex-row items-center justify-between gap-3 rounded-md cursor-pointer duration-200',
                    'hover:bg-foreground/10',
                  )}
                >
                  <div className="group-data-[expanded=true]:hidden">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#6f6f7c] rounded-full">
                        <span className="text-sm text-white">
                          {getFirstsLetters(user.name)}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm truncate max-w-[7rem]">
                          {user.name}
                        </span>
                        <span className="text-xs opacity-70 truncate max-w-[8rem]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-foreground/80 text-2xl">
                    <FiLogOut />
                  </span>
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>
      <div
        className={twMerge(
          'group p-4 py-4 fixed z-30 w-full flex items-center justify-between',
          'md:hidden',
        )}
      >
        <Button
          variant="ghost"
          className="px-0 h-8 inline-flex items-center gap-2"
          asChild
        >
          <Link href="/">
            <Logo className="w-8 h-8" />
            <h1 className="font-bold tracking-widest text-lg">PROGY</h1>
          </Link>
        </Button>
        <Button
          className="px-0 h-8"
          variant="ghost"
          onClick={handleExpandMobile}
        >
          <Menu />
        </Button>
      </div>
      <div
        className="fixed md:hidden group z-20 h-16 w-full bg-accent dark:bg-background border-b border-border transition-all duration-500 data-[expanded=true]:h-[20.5rem] data-[expanded=true]:sahdow-md"
        data-expanded={expandedMobile}
      >
        <div
          className="opacity-0 invisible transition-all duration-500 data-[expanded=true]:visible data-[expanded=true]:opacity-100"
          data-expanded={expandedMobile}
        >
          <nav className="mt-16 mx-4 space-y-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                data-current={isCurrentRoute(route, pathname)}
                className={twMerge(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md',
                  'hover:bg-muted-foreground/10',
                  'data-[current=true]:text-primary data-[current=true]:bg-muted-foreground/10',
                )}
                href={route.basePath}
                onClick={handleExpandMobile}
              >
                <route.Icon
                  size={20}
                  strokeWidth={route.basePath === '/module' ? 1.25 : 1}
                />
                <p>{route.name}</p>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-base h-9 px-2 font-normal hover:bg-muted-foreground/10"
              onClick={() => {
                handleExpandMobile();
                toggleTheme();
              }}
            >
              <Palette size={18} />
              <p className="ml-2">Alterar tema</p>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-9 px-2 font-normal hover:bg-muted-foreground/10"
              onClick={signOut}
            >
              <FiLogOut size={18} />
              <p className="ml-2">Sair</p>
            </Button>
          </nav>
        </div>
      </div>
      <div
        className={ct(
          'pt-20 px-4 duration-200',
          'md:mt-0 md:ml-72 md:pt-8 md:pr-12',
          'md:group-data-[expanded=true]:ml-28',
        )}
      >
        {children}
      </div>
    </div>
  );
}
