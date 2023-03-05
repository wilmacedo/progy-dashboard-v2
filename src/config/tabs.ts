interface TabConfig {
  name: string;
  path: string;
  title: string;
  description: string;
}

export function getCurrentTab(pathname: string) {
  const index = tabs.findIndex(tab => tab.path === pathname);
  if (index === -1) return 0;

  return index;
}

export function allPaths() {
  return tabs.map(tab => tab.path);
}

export const tabs: TabConfig[] = [
  {
    name: 'Geral',
    path: '/settings/general',
    title: 'Informação pessoal',
    description: 'Atualize e revise sus informações pessoais aqui',
  },
  {
    name: 'Membros',
    path: '/settings/members',
    title: 'Membros',
    description: 'Gerencie os membros de cada institutição e planejamento aqui',
  },
];
