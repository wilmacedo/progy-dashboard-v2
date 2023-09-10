'use client';

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

export const goalsFormSchema = z.object({
  perspectives: z.array(
    z.object({
      name: z.string().min(3).max(30),
    }),
  ),
  goals: z.array(
    z.object({
      name: z.string().min(3).max(3),
    }),
  ),
});

export type GoalsFormValues = z.infer<typeof goalsFormSchema>;

interface GoalFormProps {
  control: Control<FormSchema>;
}

export function GoalForm({ control }: GoalFormProps) {
  const {
    fields: perspectiveFields,
    remove: perspectiveRemove,
    append: perspectiveAppend,
  } = useFieldArray<FormSchema>({ control, name: 'perspectives' });

  const {
    fields: goalsFields,
    remove: goalsRemove,
    append: goalsAppend,
  } = useFieldArray<FormSchema>({ control, name: 'goals' });

  useEffect(() => {
    if (perspectiveFields.length === 0) {
      perspectiveAppend({ name: '' });
    }
    if (goalsFields.length === 0) {
      goalsAppend({ name: '' });
    }
  }, [perspectiveFields, perspectiveAppend, goalsFields, goalsAppend]);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="perspectives"
    >
      <AccordionItem value="perspectives">
        <AccordionTrigger>Informar Perspectivas</AccordionTrigger>
        <AccordionContent>
          {perspectiveFields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`perspectives.${index}.name`}
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
                      Defina o nome de cada perspectiva
                    </p>
                  </FormLabel>
                  <FormControl className={twMerge(index !== 0 && 'ml-auto')}>
                    <Input
                      className="max-w-sm"
                      placeholder="Perspectiva A"
                      minLength={3}
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={index === 0}
                    variant="ghost"
                    className="ml-2 text-primary"
                    onClick={() => perspectiveRemove(index)}
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
              onClick={() => perspectiveAppend({ name: '' })}
            >
              Adicionar
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="goals">
        <AccordionTrigger>Informar Objetivos</AccordionTrigger>
        <AccordionContent>
          {goalsFields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`goals.${index}.name`}
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
                      placeholder="Objetivo A"
                      minLength={3}
                      maxLength={30}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={index === 0}
                    variant="ghost"
                    className="ml-2 text-primary"
                    onClick={() => goalsRemove(index)}
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
              onClick={() => goalsAppend({ name: '' })}
            >
              Adicionar
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
