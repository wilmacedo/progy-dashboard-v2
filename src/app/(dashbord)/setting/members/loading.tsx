'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TablePagination } from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Column, Table as TableType } from '@tanstack/react-table';
import { Send, SlidersHorizontal } from 'lucide-react';

export default function Loading() {
  const mockedColumn = {
    getCanSort: () => true,
    getIsSorted: () => false,
    toggleSorting: (flag: boolean) => {},
    toggleVisibility: (flag: boolean) => {},
  } as Column<string, string>;

  const mockedTable = {
    getState: () => {
      return {
        pagination: {
          pageIndex: 0,
        },
      };
    },
    getPageCount: () => 1,
    setPageIndex: (index: number) => {},
    previousPage: () => {},
    nextPage: () => {},
    getCanPreviousPage: () => false,
    getCanNextPage: () => false,
  } as TableType<string>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Membros</h2>
        <p className=" text-sm text-muted-foreground">
          Convide e gerencie os membros de cada institutição e planejamento aqui
        </p>
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filtrar por nome"
            disabled
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          disabled
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Visualizar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hidden h-8 lg:flex"
          disabled
        >
          <Send className="mr-2 h-4 w-4" />
          Convidar
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Nome" />
              </TableHead>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Email" />
              </TableHead>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Cargo" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-[1.5rem] w-full bg-border rounded-md animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-[1.5rem] w-full bg-border rounded-md animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-[1.5rem] w-full bg-border rounded-md animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={mockedTable} />
    </div>
  );
}
