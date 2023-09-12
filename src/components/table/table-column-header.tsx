import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface TableColumnHeaderProps<Data, Value>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<Data, Value>;
  title: string;
}

export function TableColumnHeader<Data, Value>({
  column,
  title,
  className,
}: TableColumnHeaderProps<Data, Value>) {
  if (!column.getCanSort()) {
    return <div className={twMerge(className)}>{title}</div>;
  }

  return (
    <div className={twMerge('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-xs hover:text-foreground text-muted-foreground hover:bg-foreground/10 data-[state=open]:bg-foreground/10"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-3 w-3" />
            ) : (
              <ChevronsUpDown className="ml-2 h-3 w-3" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Esconder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
