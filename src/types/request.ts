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

export interface ChartRelation {
  percentage: number;
  value: number;
  title: string;
  id: number;
}

export interface DashboardInfo {
  title: string;
  stagesPerInitiative: ChartRelation[];
  statusPerActivity: ChartRelation[];
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

export interface Institution {
  id: number;
  name: string;
  code: string;
}

export interface Role {
  id: number;
  name: string;
}
