import { FormProps } from '../config';

export const goalsInputs: FormProps[] = [
  {
    title: 'Informar Perspectivas',
    inputs: [
      {
        name: 'Nome',
        description: 'Defina o nome de cada perspectiva',
        type: 'perspectives',
        placeholder: 'Perspectiva A',
      },
    ],
  },
  {
    title: 'Informar Objetivos',
    inputs: [
      {
        name: 'Nome',
        description: 'Defina o nome de cada objetivo',
        type: 'goals',
        placeholder: 'Objetivo A',
      },
    ],
  },
];
