export interface Planning {
  id: number;
  name: string;
  institution_id: number;
  institution: {
    name: string;
  };
  initiatives?: number;
  doneInitiatives?: number;
  created_at: string;
}

export interface DashboardInfo {
  title: string;
  stagesPerInitiative: {
    percentage: number;
    value: 0;
    title: string;
    id: number;
  }[];
  statusPerActivity: {
    percentage: number;
    value: number;
    title: string;
    id: number;
  }[];
  costIndicator: number[];
  idp: number[];
  totalGoals: number;
  totalDelayed: number;
  totalInitiatives: number;
  totalInitiativesDone: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface User extends AuthUser {
  role_id?: number;
  institution_id: number;
  role?: string;
}
