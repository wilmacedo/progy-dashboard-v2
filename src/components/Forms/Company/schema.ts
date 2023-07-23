import { z } from 'zod';

export const companyFormSchema = z.object({
  companyName: z
    .string()
    .nonempty('O nome não pode estar vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo 30 caracteres'),
  companyCode: z.string().length(18).nonempty('O CNPJ não pode estar vazio'),
  planningName: z
    .string()
    .nonempty('O nome do planejamento não pode estar vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo de 30 caracteres'),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
