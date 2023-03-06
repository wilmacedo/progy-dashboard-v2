import { User } from '@/types/user';

export interface FieldProp {
  label: string;
  description: string;
  type: 'text' | 'email' | 'password';
  disabled?: boolean;
  key: keyof User;
}

export const fields: FieldProp[] = [
  {
    label: 'Nome',
    description: '',
    type: 'text',
    key: 'name',
  },
  {
    label: 'E-mail',
    description: 'Ainda não é possível alterar o seu e-mail',
    type: 'email',
    disabled: true,
    key: 'email',
  },
  {
    label: 'Cargo',
    description: '',
    type: 'text',
    disabled: true,
    key: 'role_id',
  },
];
