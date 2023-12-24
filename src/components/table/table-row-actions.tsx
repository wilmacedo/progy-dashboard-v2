import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { TableShareItem } from './table-share-item';

interface TableRowActionsProps<Data> {
  section: string;
  row: Row<Data>;
}

export function TableRowActions<Data>({
  section,
  row,
}: TableRowActionsProps<Data>) {
  const data = (row as any).original;
  // TODO: Check if planning id is undefined and catch
  const url = '/project/' + data.planning_id + '/' + section + '/' + data.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted hover:bg-muted-foreground/10"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={url}>
          <DropdownMenuItem>Editar</DropdownMenuItem>
        </Link>
        <TableShareItem url={url} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
