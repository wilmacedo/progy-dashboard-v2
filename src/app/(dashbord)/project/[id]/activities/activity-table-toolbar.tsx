'use client';

import { TableFacetedFilter } from '@/components/table/table-faceted-filter';
import { DataTableViewOptions } from '@/components/table/table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Initiative, State } from '@/types/request';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

interface ActivityTableToolbarProps<Data> {
  table: Table<Data>;
  states: State[];
  initiatives: Initiative[];
}

export function ActivityTableToolbar<Data>({
  table,
  states,
  initiatives,
}: ActivityTableToolbarProps<Data>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  function mappedStates() {
    return states.map(state => ({
      label: state.name,
      value: String(state.id),
    }));
  }

  function mappedInitiatives() {
    return initiatives.map(initiative => ({
      label: initiative.name,
      value: String(initiative.id),
    }));
  }

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
        {table.getColumn('initiatives') && (
          <TableFacetedFilter
            column={table.getColumn('initiatives')}
            title="Iniciativa"
            options={mappedInitiatives()}
          />
        )}
        {table.getColumn('states') && (
          <TableFacetedFilter
            column={table.getColumn('states')}
            title="Estado"
            options={mappedStates()}
          />
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
