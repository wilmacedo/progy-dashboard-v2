'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TableRowActions } from '@/components/table/table-row-actions';
import { capitalize } from '@/utils/capitalize';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const initiativeSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  responsible: z.string(),
  unit_id: z.number(),
  units: z.object({
    name: z.string(),
  }),
  stage_id: z.number(),
  stages: z.object({
    name: z.string(),
  }),
  font_id: z.number(),
  fonts: z.object({
    name: z.string(),
  }),
});

type Initiative = z.infer<typeof initiativeSchema>;

export const columns: ColumnDef<Initiative>[] = [
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
      <TableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => <p className="truncate">{row.getValue('code')}</p>,
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
    accessorKey: 'units',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Unidade" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[300px] truncate">
        {capitalize((row.getValue('units') as any).name)}
      </p>
    ),
    filterFn: (row, id, value) => {
      return value.includes(String((row.getValue(id) as any).id));
    },
  },
  {
    accessorKey: 'stages',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Estágio" />
    ),
    cell: ({ row }) => (
      <div className="w-fit px-1.5 py-1 text-xs bg-muted-foreground/10 text-muted-foreground rounded-lg">
        <span className="truncate">
          {capitalize((row.getValue('stages') as any).name)}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(String((row.getValue(id) as any).id));
    },
  },
  {
    accessorKey: 'fonts',
    header: ({ column }) => <TableColumnHeader column={column} title="Fonte" />,
    cell: ({ row }) => (
      <p className="truncate">
        {capitalize((row.getValue('fonts') as any).name)}
      </p>
    ),
    filterFn: (row, id, value) => {
      return value.includes(String((row.getValue(id) as any).id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <TableRowActions section="initiatives" row={row} />,
  },
];
