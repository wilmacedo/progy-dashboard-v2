'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TableRowActions } from '@/components/table/table-row-actions';
import { Activity } from '@/types/request';
import { capitalize } from '@/utils/capitalize';
import { ColumnDef } from '@tanstack/react-table';

// Atividades concluídas (%)
// Valor executado se houver valor (R$) reduce

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: 'initiatives',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Iniciativa" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[300px] truncate">
        {capitalize((row.getValue('initiatives') as any).name)}
      </p>
    ),
    filterFn: (row, id, value) => {
      return value.includes(String((row.getValue(id) as any).id));
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <p className="max-w-[300px] truncate">
        {capitalize(row.getValue('name'))}
      </p>
    ),
  },
  {
    accessorKey: 'responsible',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Responsável" />
    ),
    cell: ({ row }) => (
      <span className="truncate">
        {capitalize(row.getValue('responsible'))}
      </span>
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <TableColumnHeader column={column} title="Valor" />,
    cell: ({ row }) => {
      const value = row.getValue('value');
      if (!value || isNaN(Number(value))) {
        return (
          <span className="text-muted-foreground opacity-50 text-sm">N/A</span>
        );
      }

      return (
        <span className="text-xs">
          {Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      );
    },
  },
  {
    accessorKey: 'states',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-fit px-1.5 py-1 text-xs bg-muted-foreground/10 text-muted-foreground rounded-lg">
          <span className="truncate">
            {capitalize((row.getValue('states') as any).name)}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(String((row.getValue(id) as any).id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <TableRowActions section="activities" row={row} />,
  },
];
