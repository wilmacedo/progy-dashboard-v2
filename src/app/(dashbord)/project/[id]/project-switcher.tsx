'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Planning } from '@/types/request';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProjectSwitcherProps {
  active: Planning;
  list: Planning[];
}

export function ProjectSwitcher({ active, list }: ProjectSwitcherProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(planning: Planning) {
    setOpen(false);

    const paths = pathname.split('/');
    const tab = paths[3];

    router.push(
      `/project/${planning.id}/${typeof tab !== 'undefined' ? tab : '/'}`,
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-start h-18 justify-between font-normal"
        >
          <div className="w-80 md:w-96">
            <h3 className="font-semibold truncate">{active.name}</h3>
            <p className="text-xs w-72 truncate text-muted-foreground">
              {active.institution.name}
            </p>
          </div>
          <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Procurar planejamento" />
          <CommandEmpty>Nenhum planejamento encontrado.</CommandEmpty>
          <CommandGroup>
            {list.map(planning => (
              <CommandItem
                value={planning.name}
                key={planning.id}
                className="hover:bg-accent"
                onSelect={() => {
                  handleClick(planning);
                  // TODO: Change active project
                }}
              >
                <CheckIcon
                  className={twMerge(
                    'mr-2 h-4 w-4',
                    planning.id === active.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <span className="truncate">{planning.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
