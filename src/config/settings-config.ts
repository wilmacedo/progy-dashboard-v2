import { Role } from '@/constants/roles';
import { TabConfig } from '@/types/config';

export const settingsTabs: TabConfig[] = [
  {
    name: 'Perfil',
    paths: ['/settings'],
    excludeRoles: [],
  },
  {
    name: 'Membros',
    paths: ['/settings/members'],
    excludeRoles: [Role.USER, Role.MANAGER],
  },
  {
    name: 'Notificações',
    paths: ['/settings/notifications'],
    excludeRoles: [],
  },
];

export function settingsPaths() {
  return settingsTabs.map(tab => tab.paths[0]);
}
