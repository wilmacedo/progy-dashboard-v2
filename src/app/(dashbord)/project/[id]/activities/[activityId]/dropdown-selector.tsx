'use client';

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
import { CheckIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListItem {
  id: number;
  name: string;
}

interface DropdownSelectorProps {
  children: ReactNode;
  placeholder: string;
  emptyText: string;
  selectedId: number;
  list: ListItem[];
  onSelect: (id: number) => void;
}

export function DropdownSelector({
  children,
  placeholder,
  emptyText,
  selectedId,
  list,
  onSelect,
}: DropdownSelectorProps) {
  const [open, setOpen] = useState(false);

  function handleSelectItem(item: ListItem) {
    setOpen(false);

    onSelect(item.id);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup className="overflow-y-auto max-h-52">
            {list.map(item => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => handleSelectItem(item)}
              >
                <div className="mr-2 h-4 w-4">
                  <CheckIcon
                    className={twMerge(
                      'h-4 w-4',
                      item.id === selectedId ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </div>
                <span className="truncate">{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
