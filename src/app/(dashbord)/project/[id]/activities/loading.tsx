'use client';

import { ContentNavbar } from '@/components/content-navbar';
import { TableColumnHeader } from '@/components/table/table-column-header';
import { TablePagination } from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tabs } from '@/config/project';
import { Column, Table as TableType } from '@tanstack/react-table';
import { ChevronsUpDown, PlusCircle, SlidersHorizontal } from 'lucide-react';

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
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <Button
          variant="outline"
          className="text-start h-18 justify-between font-normal"
        >
          <div className="w-80 md:w-96">
            <div className="mt-0.5 h-[1.25rem] w-80 bg-border rounded-md animate-pulse" />
            <div className="mt-0.5 h-[1rem] w-72 bg-border rounded-md animate-pulse" />
          </div>
          <ChevronsUpDown className="ml-4 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </div>

      <ContentNavbar tabs={tabs} />

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filtrar por nome"
            disabled
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Button
            disabled
            variant="outline"
            size="sm"
            className="h-8 border-dashed border-border hover:bg-border disabled:opacity-50"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Iniciativa
          </Button>
          <Button
            disabled
            variant="outline"
            size="sm"
            className="h-8 border-dashed border-border hover:bg-border disabled:opacity-50"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Estado
          </Button>
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
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Iniciativa" />
              </TableHead>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Nome" />
              </TableHead>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Responsável" />
              </TableHead>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Estado" />
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
