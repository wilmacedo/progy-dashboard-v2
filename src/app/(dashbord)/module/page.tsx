'use client';

import Button from '@/components/Button';
import { Selector } from '@/components/selector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { modules } from './config';

export default function Module() {
  const [selected, setSelected] = useState(-1);
  const router = useRouter();

  const handleSelect = (index: number) => {
    setSelected(prev => (prev === index ? -1 : index));
  };

  const handleContinue = () => {
    router.push(modules[selected].path);
  };

  return (
    <div>
      <div className="pb-4 border-b border-border">
        <h1 className="mb-6 font-semibold text-3xl">Criar novo módulo</h1>
        <span className="text-md text-muted-foreground">
          De o passo inicial para a criação de um novo módulo
        </span>
      </div>

      <div className="mt-8 w-ful flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-xl font-semibold">Crie um novo módulo</h1>
          <span className="text-sm text-muted-foreground">
            Selecione um tipo de módulo para começar
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {modules.map((module, index) => (
            <Selector
              key={index}
              isSelected={selected === index}
              onClick={() => handleSelect(index)}
              {...module}
            />
          ))}
        </div>

        <Button
          className="mt-8 w-[18.05rem]"
          disabled={selected === -1}
          onClick={handleContinue}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
