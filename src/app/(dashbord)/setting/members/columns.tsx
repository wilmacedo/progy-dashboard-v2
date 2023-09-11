'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { roleAlias } from '@/constants/roles';
import { ColumnDef } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const memberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
});

type Member = z.infer<typeof memberSchema>;

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="truncate">{row.getValue('email')}</span>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <TableColumnHeader column={column} title="Cargo" />,
    cell: ({ row }) => {
      const index = roleAlias.findIndex(
        role => role.legacy === row.getValue('role'),
      );

      return (
        <div
          data-role={String(index)}
          className={twMerge(
            'group w-fit px-1.5 py-1 text-xs bg-muted-foreground/10 text-muted-foreground rounded-lg',
            index === 0 && 'bg-primary/10 text-primary',
            index === 1 && 'bg-amber-500/10 text-amber-500',
            index === 2 && 'bg-emerald-500/10 text-emerald-500',
          )}
        >
          <span>{roleAlias[index].name}</span>
        </div>
      );
    },
  },
];
