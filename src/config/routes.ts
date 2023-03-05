import roles from '@/constants/roles';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { IoIosList } from 'react-icons/io';
import { IoCreateOutline, IoSettingsOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { VscNewFile } from 'react-icons/vsc';
import { allPaths } from './tabs';

interface RouteConfig {
  basePath: string;
  relativePaths?: string[];
  name: string;
  Icon: IconType;
  bottom?: boolean;
}

export function isCurrentRoute(route: RouteConfig, pathname: string) {
  if (!route.relativePaths) return route.basePath === pathname;

  return route.relativePaths.includes(pathname);
}

export default function sidebarRoutes(roleId: number) {
  const defaults: RouteConfig[] = [
    {
      basePath: '/management',
      name: 'Gerenciamento',
      relativePaths: ['/management', '/edition', '/entities'],
      Icon: IoCreateOutline,
    },
    {
      basePath: '/settings/general',
      relativePaths: allPaths(),
      name: 'Configurações',
      Icon: IoSettingsOutline,
      bottom: true,
    },
  ];

  const users: RouteConfig[] = [
    {
      basePath: '/',
      name: 'Dashboard',
      Icon: BsReverseLayoutTextWindowReverse,
    },
  ];

  const internals: RouteConfig[] = [
    {
      basePath: '/',
      name: 'Planejamentos',
      Icon: IoIosList,
    },
    {
      basePath: '/parametrization',
      name: 'Nova Parametrização',
      Icon: VscNewFile,
    },
  ];

  const routes = [];
  roles.high.includes(roleId)
    ? routes.push(...internals)
    : routes.push(...users);
  routes.push(...defaults);

  return routes;
}
