import { Role } from '@/constants/roles';

export interface TabConfig {
  name: string;
  paths: string[];
  basePath?: string;
  excludeRoles: Role[];
}
