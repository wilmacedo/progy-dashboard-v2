import roles, { Role } from '@/constants/roles';
import { LucideIcon, PackagePlus } from 'lucide-react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { IoIosList } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { STORAGE_PATH } from './index';
import { settingsPaths } from './settings-config';

interface RouteConfig {
  basePath: string;
  relativePaths?: string[];
  name: string;
  Icon: IconType | LucideIcon;
  bottom?: boolean;
}

export function isCurrentRoute(route: RouteConfig, pathname: string) {
  if (!route.relativePaths) return route.basePath === pathname;

  for (const path of route.relativePaths) {
    if (path.includes(':') && typeof path === 'string') {
      const [relative] = path.split(':');
      if (pathname.includes(relative)) return true;
    }
  }

  return route.relativePaths.includes(pathname);
}

export function getAllRoutes() {
  const basePaths = sidebarRoutes(Role.ADMINISTRATOR).map(
    path => path.basePath,
  );
  const relativePaths: string[] = [];
  sidebarRoutes(Role.ADMINISTRATOR)
    .filter(path => path.relativePaths)
    .forEach(path => {
      path.relativePaths?.forEach(relativePath =>
        relativePaths.push(relativePath),
      );
    });

  let paths = [...basePaths, ...relativePaths];
  paths = paths.filter((path, index) => paths.indexOf(path) === index);

  return paths;
}

export default function sidebarRoutes(role: string) {
  const defaults: RouteConfig[] = [
    // {
    //   basePath: '/management',
    //   name: 'Gerenciamento',
    //   relativePaths: ['/management', '/edition', '/entities'],
    //   Icon: IoCreateOutline,
    // },
    {
      basePath: '/settings',
      relativePaths: settingsPaths(),
      name: 'Configurações',
      Icon: IoSettingsOutline,
      bottom: true,
    },
  ];

  const users: RouteConfig[] = [
    {
      basePath: '/',
      relativePaths: ['/', '/project/:id'],
      name: 'Projeto',
      Icon: BsReverseLayoutTextWindowReverse,
    },
  ];

  const internals: RouteConfig[] = [
    {
      basePath: '/',
      relativePaths: ['/', '/project/:id'],
      name: 'Planejamentos',
      Icon: IoIosList,
    },
    {
      basePath: '/module',
      relativePaths: ['/module', '/module/planning'],
      name: 'Novo Módulo',
      Icon: PackagePlus,
    },
  ];

  const routes = [];
  let include = false;
  roles.high.forEach(r => {
    if (r.toString() === role) include = true;
  });
  include ? routes.push(...internals) : routes.push(...users);
  routes.push(...defaults);

  return routes;
}

export const SIDEBAR_DATA_KEY = `${STORAGE_PATH}/sidebar`;
