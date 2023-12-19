export interface Planning {
  id: number;
  name: string;
  institution_id: number;
  institutions: {
    name: string;
  };
  initiatives?: number;
  doneInitiatives?: number;
  created_at: string;
}

export interface State {
  id: number;
  name: string;
}

export interface Initiative {
  id: number;
  name: string;
  code: string;
  responsible: string;
  unit_id: number;
  unit?: {
    id: number;
    name: string;
  };
  perspective_id: number;
  perspective?: {
    id: number;
    name: string;
  };
  stage_id: number;
  stage?: {
    id: number;
    name: string;
  };
  font_id: number;
  font?: {
    id: number;
    name: string;
  };
  goal_id: number;
  goal?: {
    id: number;
    name: string;
  };
  comments: string;
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
