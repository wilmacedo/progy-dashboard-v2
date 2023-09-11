'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { roleAlias } from '@/constants/roles';
import { ColumnDef } from '@tanstack/react-table';
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
      const role =
        roleAlias.find(role => role.legacy === row.getValue('role'))?.name ??
        row.getValue('role');

      return <span className="truncate">{role}</span>;
    },
  },
];
