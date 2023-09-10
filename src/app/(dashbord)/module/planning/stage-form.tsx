import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { FormSchema } from './page';

export const stageFormSchema = z.object({
  stages: z.array(z.object({ name: z.string().min(3).max(30) })),
  status: z.array(z.object({ name: z.string().min(3).max(30) })),
});

export type StageFormValues = z.infer<typeof stageFormSchema>;

interface StageFormProps {
  control: Control<FormSchema>;
}

export function StageForm({ control }: StageFormProps) {
  const {
    fields: stageFields,
    remove: stageRemove,
    append: stageAppend,
  } = useFieldArray<FormSchema>({ control, name: 'stages' });

  const {
    fields: statusFields,
    remove: statusRemove,
    append: statusAppend,
  } = useFieldArray<FormSchema>({ control, name: 'status' });

  useEffect(() => {
    if (stageFields.length === 0) stageAppend({ name: '' });
    if (statusFields.length === 0) statusAppend({ name: '' });
  }, [stageFields, stageAppend, statusFields, statusAppend]);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="stages"
    >
      <AccordionItem value="stages">
        <AccordionTrigger>Informar Estágios de Execução</AccordionTrigger>
        <AccordionContent>
          {stageFields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`stages.${index}.name`}
              render={({ field }) => (
                <FormItem className="px-2 flex items-center last:border-b last:border-border">
                  <FormLabel
                    className={twMerge(
                      'mr-auto min-w-[20rem]',
                      index !== 0 && 'sr-only',
                    )}
                  >
                    <span className="font-semibold">Nome</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Defina o nome de cada estágio
                    </p>
                  </FormLabel>
                  <FormControl className={twMerge(index !== 0 && 'ml-auto')}>
                    <Input
                      className="max-w-sm"
                      placeholder="Estágio A"
                      minLength={3}
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={index === 0}
                    variant="ghost"
                    className="ml-2 text-primary"
                    onClick={() => stageRemove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </FormItem>
              )}
            />
          ))}
          <div className="mt-2 w-full inline-flex justify-end">
            <Button
              className="text-xs"
              variant="outline"
              size="sm"
              onClick={() => stageAppend({ name: '' })}
            >
              Adicionar
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="status">
        <AccordionTrigger>Informar Status</AccordionTrigger>
        <AccordionContent>
          {statusFields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`status.${index}.name`}
              render={({ field }) => (
                <FormItem className="px-2 flex items-center last:border-b last:border-border">
                  <FormLabel
                    className={twMerge(
                      'mr-auto min-w-[20rem]',
                      index !== 0 && 'sr-only',
                    )}
                  >
                    <span className="font-semibold">Nome</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Defina o nome de cada objetivo
                    </p>
                  </FormLabel>
                  <FormControl className={twMerge(index !== 0 && 'ml-auto')}>
                    <Input
                      className="max-w-sm"
                      placeholder="Status A"
                      minLength={3}
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={index === 0}
                    variant="ghost"
                    className="ml-2 text-primary"
                    onClick={() => statusRemove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </FormItem>
              )}
            />
          ))}
          <div className="mt-2 w-full inline-flex justify-end">
            <Button
              className="text-xs"
              variant="outline"
              size="sm"
              onClick={() => statusAppend({ name: '' })}
            >
              Adicionar
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
