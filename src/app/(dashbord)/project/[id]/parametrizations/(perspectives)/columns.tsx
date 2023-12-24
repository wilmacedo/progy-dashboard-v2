'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TableRowActions } from '@/components/table/table-row-actions';
import { Perspective } from '@/types/request';
import { capitalize } from '@/utils/capitalize';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Perspective>[] = [
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
    id: 'actions',
    cell: ({ row }) => <TableRowActions section="perspectives" row={row} />,
  },
];
