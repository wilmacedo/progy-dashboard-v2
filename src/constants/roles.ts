export enum Role {
  USER = 'user',
  MANAGER = 'manager',
  SUBADMINISTRATOR = 'subadmin',
  ADMINISTRATOR = 'admin',
}

const high = [Role.ADMINISTRATOR, Role.SUBADMINISTRATOR, Role.MANAGER];
const low = [...high, Role.USER];

const roles = { high, low };

export const roleAlias = [
  {
    legacy: 'admin',
    current: Role.ADMINISTRATOR,
    name: 'Administrador',
  },
  {
    legacy: 'subadmin',
    current: Role.SUBADMINISTRATOR,
    name: 'Sub-Administrador',
  },
  {
    legacy: 'manager',
    current: Role.MANAGER,
    name: 'Gestor',
  },
  {
    legacy: 'user',
    current: Role.USER,
    name: 'Usuário',
  },
];

export function getRoleEnum(): [string, ...string[]] {
  const roleList = Object.values(Role).map(String);
  roleList.shift();

  return ['user', ...roleList];
}

export default roles;
