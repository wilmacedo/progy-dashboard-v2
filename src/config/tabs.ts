export function getCurrentTab(pathname: string) {
  const index = tabs.findIndex(tab => tab.path === pathname);
  if (index === -1) return 0;

  return index;
}

export const tabs = [
  {
    name: 'Geral',
    path: '/settings/general',
  },
  {
    name: 'Usuários',
    path: '/settings/users',
  },
];
