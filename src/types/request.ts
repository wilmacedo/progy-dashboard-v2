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

export interface Goal {
  id: number;
  name: string;
}

export interface Font {
  id: number;
  name: string;
  code: string;
  date: string;
  value: number;
  other_value: number | null;
}

export interface Mapp {
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
  fonts?: Font;
  goal_id: number;
  goals?: Goal;
  comments: string;
}

export interface Activity {
  id: number;
  name: string;
  responsible: string;
  date_start: string;
  date_end: string;
  value: string | null;
  state_id: number;
  states?: State;
  initiative_id: number;
  initiatives?: Initiative;
  planning_id: number;
  file: string | null;
  comments: string | null;
  created_at: string;
  updated_at: string;
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
