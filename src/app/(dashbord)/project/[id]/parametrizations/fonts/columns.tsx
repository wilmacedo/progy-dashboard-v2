'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TableRowActions } from '@/components/table/table-row-actions';
import { Stage } from '@/types/request';
import { capitalize } from '@/utils/capitalize';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Stage>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Código MAPP" />
    ),
    cell: ({ row }) => <p className="truncate">{row.getValue('code')}</p>,
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
    accessorKey: 'other_value',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Valor de Contra-Partida" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('other_value');
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
    id: 'actions',
    cell: ({ row }) => <TableRowActions section="fonts" row={row} />,
  },
];
