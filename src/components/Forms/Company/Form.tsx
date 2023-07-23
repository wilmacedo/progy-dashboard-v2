'use client';

import Input from '@/components/Input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { codeMask } from '@/utils/code-mask';
import { ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '..';
import { companyInputs } from './inputs';

interface CompanyFormProps {
  formController: UseFormReturn<FormSchema>;
}

export function CompanyForm({
  formController: { register },
}: CompanyFormProps) {
  const handleMaskInput = (
    event: ChangeEvent<HTMLInputElement>,
    canChange: boolean,
  ) => {
    if (!canChange) return;

    event.target.value = codeMask(event.target.value);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-0"
    >
      {companyInputs.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="mt-2 border border-gray-100 rounded-md text-sm"
        >
          <AccordionTrigger className="px-2 rounded-t-md bg-gray-200">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            {item.inputs.map((input, i) => (
              <div
                key={i}
                className="pt-7 pb-8 flex items-center border-b border-gray-100 last:border-b-0"
              >
                <div className="mr-auto min-w-[20rem]">
                  <span className="font-semibold">{input.name}</span>
                  <p className="text-sm text-gray-500">{input.description}</p>
                </div>

                <Input
                  {...register(input.type, {
                    onChange: event =>
                      handleMaskInput(event, input.type === 'companyCode'),
                  })}
                  autoFocus={i === 0}
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
