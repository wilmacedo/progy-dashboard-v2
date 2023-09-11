'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableViewOptions } from '../table/table-view-options';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface MemberTableToolbarProps<Data> {
  table: Table<Data>;
}

export function MemberTableToolbar<Data>({
  table,
}: MemberTableToolbarProps<Data>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por nome"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
