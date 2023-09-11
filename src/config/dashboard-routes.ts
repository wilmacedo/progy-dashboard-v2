import { TabConfig } from '@/components/content-navbar';
import { Role } from '@/constants/roles';

export const tabs: TabConfig[] = [
  { name: 'Visão Geral', path: '/', excludeRoles: [] },
  {
    name: 'Parametrizações',
    path: '/parametrization',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Iniciativas',
    path: '/initiatives',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Atividades',
    path: '/activities',
    excludeRoles: [Role.USER],
  },
];
