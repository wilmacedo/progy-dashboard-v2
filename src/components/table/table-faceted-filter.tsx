'use client';

import { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

interface TableFacetedFilter<Data, Value> {
  column?: Column<Data, Value>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
}

export function TableFacetedFilter<Data, Value>({
  column,
  title,
  options,
}: TableFacetedFilter<Data, Value>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const router = useRouter();
  const params = useSearchParams();

  function updateRoute(id: string, value: string) {
    console.log(params.toString());
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed border-border hover:bg-border"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selecionados
                  </Badge>
                ) : (
                  options
                    .filter(option => selectedValues.has(option.value))
                    .map(option => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        <span className="max-w-[8rem] truncate">
                          {option.label}
                        </span>
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      updateRoute(column?.id ?? '', option.value);

                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={twMerge(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-md border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={twMerge('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Limpar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
