export enum Role {
  USER = 1,
  MANAGER = 2,
  SUBADMINISTRATOR = 3,
  ADMINISTRATOR = 4,
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

export const getRoleByName = (name: string) => {
  const role = roleAlias.find(item => item.legacy === name);
  if (!role) {
    return Role.USER;
  }

  return role.current;
};

export default roles;
