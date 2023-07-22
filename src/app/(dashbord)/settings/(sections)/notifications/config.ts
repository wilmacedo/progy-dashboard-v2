export interface NotificationFieldProp {
  name: string;
  description: string;
  key: string;
}

export const fields: NotificationFieldProp[] = [
  {
    name: 'Iniciativa',
    description: 'Atualize as preferências de notificação das iniciativas',
    key: 'activity',
  },
  {
    name: 'Atividade',
    description: 'Atualize as preferências de notificação das atividades',
    key: 'activity',
  },
];
