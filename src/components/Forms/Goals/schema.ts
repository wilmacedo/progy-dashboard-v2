import { z } from 'zod';

export const goalsSchema = z.object({
  perspectives: z.array(
    z
      .string()
      .min(3, 'A perspective deve ter no mínimo 3 caracteres')
      .max(30, 'A perspective deve ter no máximo 30 caracteres'),
  ),
  goals: z.array(
    z
      .string()
      .min(3, 'A perspective deve ter no mínimo 3 caracteres')
      .max(30, 'A perspective deve ter no máximo 30 caracteres'),
  ),
});

export type GoalFormData = z.infer<typeof goalsSchema>;
