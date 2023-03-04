'use client';

import sidebarRoutes from '@/constants/routes';
import {
  getFirstsLetters,
  getLocalStorageItem,
  saveLocalStorageItem,
} from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

interface SidebarProps {
  children: ReactNode;
}

const fakeUser = {
  name: 'José Wilson Wariss Macedo Sá',
  email: 'wil.macedo.sa@gmail.com',
};

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(
    getLocalStorageItem('sidebar', 'expanded'),
  );
  const imageSize = 30;
  const routes = sidebarRoutes(2);
  const splittedRoutes = [
    routes.filter(route => !route.bottom),
    routes.filter(route => route.bottom),
  ];
  const isCurrentRoute = (routeName: string) => pathname === routeName;

  const handleExpand = () => {
    setExpanded(prev => {
      saveLocalStorageItem('sidebar', { expanded: !prev });

      return !prev;
    });
  };

  const handleLogout = () => {
    // TODO: Add logout logic
  };

  return (
    <div data-expanded={expanded} className="group">
      <div className="fixed p-2 flex flex-col w-64 h-screen bg-gray-200 border-r border-gray-100 duration-200 group-data-[expanded=true]:w-20">
        <BsArrowLeftShort
          onClick={handleExpand}
          className="absolute top-16 -right-3 bg-white text-black text-2xl border border-gray-100 rounded-full duration-200 cursor-pointer hover:bg-gray-200 group-data-[expanded=true]:rotate-180"
        />

        <Link href="/" className="h-fit">
          <div className="flex gap-2 h-fit w-full py-6 px-4 items-center duration-300">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={imageSize}
              height={imageSize}
            />
            <h1 className="font-bold tracking-widest whitespace-nowrap group-data-[expanded=true]:hidden">
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
                    data-current={isCurrentRoute(route.basePath)}
                    className="group m-2 p-2.5 flex flex-row items-center gap-3 rounded-md cursor-pointer duration-200 hover:bg-[#E7E9ED] data-[current=true]:bg-[#E7E9ED]"
                  >
                    <span className="text-[#4D4C5F] text-2xl group-data-[current=true]:text-[#3E6BF7]">
                      <route.Icon />
                    </span>
                    <span className=" flex-1 text-[#4D4C5F] text-sm truncate group-data-[current=true]:text-[#3E6BF7] group-data-[expanded=true]:hidden">
                      {route.name}
                    </span>
                  </li>
                </Link>
              ))}
              {sideIndex === splittedRoutes.length - 1 && (
                <li
                  onClick={handleLogout}
                  className="m-2 p-2.5 flex flex-row items-center justify-between gap-3 rounded-md cursor-pointer duration-200 hover:bg-[#E7E9ED]"
                >
                  <div className="group-data-[expanded=true]:hidden">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#6f6f7c] rounded-full">
                        <span className="text-sm text-[#d0d1d7]">
                          {getFirstsLetters(fakeUser.name)}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm truncate max-w-[7rem]">
                          {fakeUser.name}
                        </span>
                        <span className="text-xs opacity-70 truncate max-w-[8rem]">
                          {fakeUser.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#4D4C5F] text-2xl">
                    <FiLogOut />
                  </span>
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>
      <div className="ml-72 duration-200 group-data-[expanded=true]:ml-28">
        {children}
      </div>
    </div>
  );
}
