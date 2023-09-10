'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { codeMask } from '@/utils/code-mask';
import { ChangeEvent } from 'react';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { FormSchema } from './page';

export const companyFormSchema = z.object({
  companyName: z.string().nonempty().min(3).max(30),
  companyCode: z.string().nonempty().length(18).nonempty(),
  planningName: z.string().nonempty().min(3).max(30),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface CompanyFormProps {
  control: Control<FormSchema>;
}

export function CompanyForm({ control }: CompanyFormProps) {
  function handleMaskInput(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = codeMask(event.target.value);
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="company"
    >
      <AccordionItem value="company">
        <AccordionTrigger>Informar Organização</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="pt-7 pb-8 flex items-center border-b border-border last:border-b-0">
                <FormLabel className="mr-auto min-w-[20rem]">
                  <span className="font-semibold">Nome</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    Defina o nome da sua organização
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    className="max-w-lg"
                    autoFocus
                    placeholder="Organização S/A"
                    minLength={3}
                    maxLength={30}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyCode"
            render={({ field }) => (
              <FormItem className="pt-7 pb-8 flex items-center border-b border-border last:border-b-0">
                <FormLabel className="mr-auto min-w-[20rem]">
                  <span className="font-semibold">CNPJ</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    Defina o CNPJ da sua organização
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    className="max-w-lg"
                    placeholder="123.456.678/9123-45"
                    {...field}
                    onChange={event => {
                      handleMaskInput(event);
                      field.onChange(event);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="planning">
        <AccordionTrigger>Informar Planejamento Estratégico</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={control}
            name="planningName"
            render={({ field }) => (
              <FormItem className="pt-7 pb-8 flex items-center border-b border-border last:border-b-0">
                <FormLabel className="mr-auto min-w-[20rem]">
                  <span className="font-semibold">Nome</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    Defina o nome do seu planejamento
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    className="max-w-lg"
                    autoFocus
                    placeholder={`Ação estratégica ${new Date().getFullYear()}`}
                    minLength={3}
                    maxLength={30}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
