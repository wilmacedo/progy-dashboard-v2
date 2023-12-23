'use client';

import { TableColumnHeader } from '@/components/table/table-column-header';
import { TablePagination } from '@/components/table/table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Column, Table as TableType } from '@tanstack/react-table';

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
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <TableColumnHeader column={mockedColumn} title="Nome" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
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