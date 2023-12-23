'use client';

import Options from '@/components/Options';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Planning } from '@/types/request';

interface OptionsMenuProps {
  planning: Planning;
}

export function OptionsMenu({ planning }: OptionsMenuProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (typeof planning.id === 'undefined') return;

    const url = `${window.location.origin}/project/${planning.id}`;

    navigator.clipboard.writeText(url);
    toast({
      title: 'Link copiado para a área de transferência',
    });
  };

  return (
    <Options>
      <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleCopy}>Compartilhar</DropdownMenuItem>
    </Options>
  );
}
