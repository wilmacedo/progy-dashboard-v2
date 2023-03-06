import { User } from '@/types/user';

interface FieldProp {
  label: string;
  description: string;
  key: keyof User;
}

export const fields: FieldProp[] = [
  {
    label: 'Nome',
    description: 'Altere seu nome',
    key: 'name',
  },
  {
    label: 'E-mail',
    description: 'Altere seu e-mail',
    key: 'email',
  },
];
