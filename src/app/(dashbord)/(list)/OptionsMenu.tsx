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
    const url = `${window.location.origin}/dashboard?id=${planning.id}`;

    navigator.clipboard.writeText(url);
    toast({
      description: 'Link copiado para a área de transferência',
    });
  };

  return (
    <Options>
      <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleCopy}>
        Copiar link de acesso
      </DropdownMenuItem>
    </Options>
  );
}
