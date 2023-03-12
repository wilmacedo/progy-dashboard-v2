import { DashboardInfo, User } from '@/types/request';

export const STORAGE_PATH = '@progy';
export const AUTH_DATA_KEY = `${STORAGE_PATH}/auth`;

export const mockedUser: User = {
  id: -1,
  name: 'Desconhecido',
  email: 'desconhecido@gmail.com',
  institution_id: -1,
  role_id: -1,
};

export const mockedMetrics: DashboardInfo = {
  title: 'Desconhecido',
  costIndicator: [0, 0],
  idp: [0, 0],
  stagesPerInitiative: [],
  statusPerActivity: [],
  totalDelayed: 0,
  totalGoals: 0,
  totalInitiatives: 0,
  totalInitiativesDone: 0,
};
