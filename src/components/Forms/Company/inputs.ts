import { FormProps } from '../config';

export const companyInputs: FormProps[] = [
  {
    title: 'Informar Organização',
    inputs: [
      {
        name: 'Nome',
        description: 'Aqui vai o nome da sua organização',
        type: 'companyName',
        placeholder: 'Organização S/A',
      },
      {
        name: 'CNPJ',
        description: 'Aqui vai o CNPJ da sua organização',
        type: 'companyCode',
        placeholder: '12.345.678/9123-45',
      },
    ],
  },
  {
    title: 'Informar Planejamento Estratégico',
    inputs: [
      {
        name: 'Nome',
        description: 'Aqui vai o nome do seu planejamento',
        type: 'planningName',
        placeholder: 'Ação estratégica 2023',
      },
    ],
  },
];
