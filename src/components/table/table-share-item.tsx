'use client';

import { DropdownMenuItem } from '../ui/dropdown-menu';
import { toast } from '../ui/use-toast';

interface TableShareItemProps {
  url: string;
}

export function TableShareItem({ url }: TableShareItemProps) {
  url = window.location.origin + url;

  async function handleShare() {
    const canShare = navigator.canShare;
    if (!canShare || canShare()) {
      navigator.clipboard.writeText(url);

      toast({
        title: 'Link copiado para a área de transferência',
      });
      return;
    }

    const shareOptions = {
      title: 'Progy',
      text: 'Compartilhar acesso à edição',
      url,
    };

    try {
      await navigator.share(shareOptions);
    } catch (error) {
      toast({
        title: 'Oops! Houve um erro ao tentar compartilhar',
        variant: 'destructive',
      });
    }
  }

  return (
    <DropdownMenuItem onClick={handleShare}>Compartilhar</DropdownMenuItem>
  );
}
