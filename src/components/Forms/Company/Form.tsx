'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '..';
import { companyInputs } from './inputs';

interface CompanyFormProps {
  formController: UseFormReturn<FormSchema>;
}

export function CompanyForm({
  formController: { register },
}: CompanyFormProps) {
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

                <input
                  className={cn(
                    'px-2.5 py-2.5 border border-gray-100 rounded outline-blue-300 duration-200 text-sm',
                    'hover:bg-[#E7E9ED]',
                    'disabled:bg-[#E7E9ED] disabled:cursor-not-allowed',
                    'invalid:border-red-500 invalid:text-red-500',
                    'focus:invalid:outline-red-500 focus:invalid:text-red-500',
                    'w-full max-w-lg h-12',
                  )}
                  autoFocus={i === 0}
                  placeholder={input.placeholder}
                  {...register(input.type)}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
