'use client';

import Button from '@/components/Button';
import { forms, FormSchema, formSchemas } from '@/components/Forms';
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

export default function Planning() {
  const [currentStep, setCurrentStep] = useState(0);
  const formController = useForm<FormSchema>({
    resolver: zodResolver(formSchemas[currentStep]),
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formController;

  const FormComponent = forms[currentStep];

  function back() {
    if (currentStep - 1 < 0) return;

    setCurrentStep(prev => prev - 1);
  }

  function createPlanning(data: any) {
    if (currentStep + 1 >= forms.length) {
      console.log(data);
      // TODO: Create planning
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
        <form onSubmit={handleSubmit(createPlanning)}>
          <FormComponent formController={formController} />

          <div className="absolute left-[-2rem] bottom-0 w-[calc(100%+5rem)]">
            <div className="py-4 px-24 flex justify-between border-t border-t-gray-100 bg-gray-200">
              <div className="flex gap-2 items-center opacity-80">
                <span className="text-sm">Salvo agora</span>
                <TooltipProvider>
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger>
                      <Info className="cursor-help" size={12} />
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
                  className="bg-transparent text-black font-semibold"
                  disabled={currentStep === 0}
                  onClick={back}
                >
                  Voltar
                </Button>
                <Button className="py-1.5" disabled={!isValid} type="submit">
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
