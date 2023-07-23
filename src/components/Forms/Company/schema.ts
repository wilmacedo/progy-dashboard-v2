import { z } from 'zod';

export const companyFormSchema = z.object({
  companyName: z
    .string()
    .nonempty('O nome não pode estar vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo 30 caracteres'),
  companyCode: z
    .string()
    .nonempty('O CNPJ não pode estar vazio')
    .regex(
      /(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
      'O CNPJ não é válido',
    ),
  planningName: z
    .string()
    .nonempty('O nome do planejamento não pode estar vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo de 30 caracteres'),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
