'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TableRowActions } from '@/components/table/table-row-actions';
import { capitalize } from '@/utils/capitalize';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const perspectiveSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Perspective = z.infer<typeof perspectiveSchema>;

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
    cell: ({ row }) => <TableRowActions section="initiatives" row={row} />,
  },
];
