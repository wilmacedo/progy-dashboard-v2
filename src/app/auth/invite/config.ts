import { InviteData } from './page';

export enum ErrorType {
  EXPIRED,
  MISSING_DATA,
}

interface InviteField {
  label: string;
  type: 'text' | 'email' | 'password';
  field: keyof InviteData | 'name' | 'password';
  placeholder?: string;
  disabled?: boolean;
  id?: boolean;
}

export const fields: InviteField[] = [
  {
    label: 'Nome',
    type: 'text',
    field: 'name',
    placeholder: 'Digite seu nome',
  },
  {
    label: 'E-mail',
    type: 'email',
    field: 'email',
    disabled: true,
  },
  {
    label: 'Senha',
    type: 'password',
    field: 'password',
    placeholder: 'Digite sua senha',
  },
  {
    label: 'Instituição',
    type: 'text',
    field: 'institution_id',
    disabled: true,
    id: true,
  },
  {
    label: 'Cargo',
    type: 'text',
    field: 'role_id',
    disabled: true,
    id: true,
  },
];

export const errorMessages = [
  {
    type: ErrorType.EXPIRED,
    title: 'Oops, o convite expirou!',
    message:
      'O convite para se cadastrar no planejamento expirou. Entre em contato com o gerente para pedir um novo.',
  },
  {
    type: ErrorType.MISSING_DATA,
    title: 'Oops, algo deu errado!',
    message:
      'Parece que a URL está incompleta ou errada. Entre em contato com o gerente do planejamento.',
  },
];
