import { TableFacetedFilter } from '@/components/table/table-faceted-filter';
import { DataTableViewOptions } from '@/components/table/table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stage } from '@/types/request';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

interface InitiativeTableToolbarProps<Data> {
  table: Table<Data>;
  stages: Stage[];
}

export function InitiativeTableToolbar<Data>({
  table,
  stages,
}: InitiativeTableToolbarProps<Data>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  function mappedStages() {
    return stages.map(stage => ({
      label: stage.name,
      value: String(stage.id),
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
        {table.getColumn('stages') && (
          <TableFacetedFilter
            column={table.getColumn('stages')}
            title="Estágio"
            options={mappedStages()}
          />
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
