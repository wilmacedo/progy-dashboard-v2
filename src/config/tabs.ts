import { Role } from '@/constants/roles';
import { TabConfig } from '@/types/config';

export function allPaths() {
  return tabs.map(tab => tab.paths);
}

export const tabs: TabConfig[] = [
  {
    name: 'Perfil',
    paths: ['/settings'],
    excludeRoles: [],
  },
  {
    name: 'Membros',
    paths: ['/settings/members'],
    excludeRoles: [Role.USER],
  },
  {
    name: 'Notificações',
    paths: ['/settings/notifications'],
    excludeRoles: [],
  },
];
