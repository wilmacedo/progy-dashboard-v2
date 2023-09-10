'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CompanyForm,
  CompanyFormValues,
  companyFormSchema,
} from './company-form';
import { GoalForm, GoalsFormValues, goalsFormSchema } from './goal-form';
import { StageForm, StageFormValues, stageFormSchema } from './stage-form';

const formSchemas = [companyFormSchema, goalsFormSchema, stageFormSchema];
export type FormSchema = Partial<
  CompanyFormValues & GoalsFormValues & StageFormValues
>;
const forms = [CompanyForm, GoalForm, StageForm];

export default function Planning() {
  const [currentStep, setCurrentStep] = useState(0);
  const formController = useForm<FormSchema>({
    resolver: zodResolver(formSchemas[currentStep]),
  });
  const form = formController;

  const FormComponent = forms[currentStep];

  function back() {
    if (currentStep - 1 < 0) return;

    setCurrentStep(prev => prev - 1);
  }

  function createPlanning(data: any) {
    if (currentStep + 1 >= forms.length) {
      console.log(data);
      // TODO: Save current step data
      return;
    }

    setCurrentStep(prev => prev + 1);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 items-start">
        {new Array(forms.length).fill(0).map((_, index) => (
          <div key={index}>
            <div
              className={cn(
                'w-24 h-1 rounded-md transition-all duration-300',
                index <= currentStep ? 'bg-blue-300' : 'bg-gray-100',
              )}
              onClick={() => setCurrentStep(index)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 px-12 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createPlanning)}>
            <FormComponent control={form.control} />

            <div className="absolute left-[-3rem] bottom-0 w-[calc(100%+6rem)]">
              <div className="py-4 px-24 flex justify-between border-t border-t-border bg-accent">
                <div className="flex gap-2 items-center opacity-80">
                  <span className="text-sm text-muted-foreground">
                    Salvo agora
                  </span>
                  <TooltipProvider>
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger>
                        <Info
                          className="cursor-help text-muted-foreground"
                          size={12}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[15rem]">
                          Os campos são salvos automaticamente à cada passo.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentStep === 0}
                    onClick={back}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="py-1.5"
                    size="sm"
                    disabled={!form.formState.isValid}
                    type="submit"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
