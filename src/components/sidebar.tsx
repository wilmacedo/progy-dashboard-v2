'use client';

import { redirectUrl } from '@/config/auth';
import sidebarRoutes, { isCurrentRoute } from '@/config/routes';
import { useAuth } from '@/contexts/auth/auth-context';
import { useTheme } from '@/contexts/theme/theme-context';
import { getFirstsLetters } from '@/utils';
import { ct } from '@/utils/style';
import { getCookie, setCookie } from 'cookies-next';
import { Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

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
  const { role_id, signOut, user } = useAuth();
  const { toggleTheme } = useTheme();

  const [expanded, setExpanded] = useState(getExpandedValue());

  const imageSize = 30;
  const routes = sidebarRoutes(role_id);
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

  const handleLogout = () => {
    signOut();
    router.push(redirectUrl);
  };

  return (
    <div data-expanded={expanded} className="group">
      <div
        className={ct(
          'fixed p-2 flex flex-col w-64 h-screen bg-gray-200 border-r border-gray-100 duration-200',
          'group-data-[expanded=true]:w-20',
        )}
      >
        <BsArrowLeftShort
          onClick={handleExpand}
          className={ct(
            'absolute top-16 -right-3 bg-white text-black text-2xl border border-gray-100 rounded-full duration-200 cursor-pointer',
            'hover:bg-gray-200',
            'group-data-[expanded=true]:rotate-180',
          )}
        />

        <Link href="/" className="h-fit">
          <div className="flex gap-2 h-fit w-full py-6 px-4 items-center duration-300">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={imageSize}
              height={imageSize}
            />
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
                      'hover:bg-[#E7E9ED]',
                      'data-[current=true]:bg-[#E7E9ED]',
                    )}
                  >
                    <span
                      className={ct(
                        'text-gray-600 text-2xl',
                        'group-data-[current=true]:text-blue-300',
                      )}
                    >
                      {route.basePath === '/module' ? (
                        <route.Icon strokeWidth={1.25} />
                      ) : (
                        <route.Icon />
                      )}
                    </span>
                    <span
                      className={ct(
                        'flex-1 text-gray-600 text-sm truncate',
                        'group-data-[current=true]:text-blue-300',
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
                  onClick={handleLogout}
                  className={ct(
                    'm-2 p-2.5 flex flex-row items-center justify-between gap-3 rounded-md cursor-pointer duration-200',
                    'hover:bg-[#E7E9ED]',
                  )}
                >
                  <div className="group-data-[expanded=true]:hidden">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#6f6f7c] rounded-full">
                        <span className="text-sm text-[#d0d1d7]">
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
                  <span className="text-gray-600 text-2xl">
                    <FiLogOut />
                  </span>
                </li>
              )}
              {sideIndex === splittedRoutes.length - 1 && (
                <li
                  onClick={toggleTheme}
                  className={ct(
                    'm-2 p-2.5 flex flex-row items-center justify-between gap-3 rounded-md cursor-pointer duration-200',
                    'hover:bg-[#E7E9ED]',
                  )}
                >
                  <Palette color="#6f6f7c" />
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>
      <div
        className={ct(
          'ml-72 pt-8 pr-12 duration-200',
          'group-data-[expanded=true]:ml-28',
        )}
      >
        {children}
      </div>
    </div>
  );
}
