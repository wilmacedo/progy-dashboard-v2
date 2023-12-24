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

export interface Stage {
  id: number;
  name: string;
}

export interface Perspective {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  name: string;
}

export interface Initiative {
  id: number;
  name: string;
  code: string;
  responsible: string;
  unit_id: number;
  units?: Unit;
  perspective_id: number;
  perspectives?: Perspective;
  stage_id: number;
  stages?: Stage;
  font_id: number;
  fonts?: {
    id: number;
    name: string;
  };
  goal_id: number;
  goals?: {
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

export interface Notification {
  userId: number;
  activity: boolean;
}
