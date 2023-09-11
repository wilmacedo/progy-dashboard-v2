import { Role } from '@/constants/roles';

interface TabConfig {
  name: string;
  path: string;
  excludeRoles: Role[];
}

export function allPaths() {
  return tabs.map(tab => tab.path);
}

export const tabs: TabConfig[] = [
  {
    name: 'Perfil',
    path: '/settings',
    excludeRoles: [],
  },
  {
    name: 'Membros',
    path: '/settings/members',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Notificações',
    path: '/settings/notifications',
    excludeRoles: [],
  },
];
