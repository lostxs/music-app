"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shared/components/ui/table";
import { cn } from "~/shared/lib/utils";

interface PlaylistTracksDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PlaylistTracksDatatable<TData, TValue>({
  columns,
  data,
}: PlaylistTracksDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      className="rounded-sm border border-transparent outline-0"
      role="grid"
      aria-rowcount={data.length}
    >
      <TableHeader className="sticky top-16 z-2 m-[0_calc(var(--content-spacing)*-1)_calc(var(--content-spacing)-8px)] box-content h-9 border-b px-(--content-spacing) backdrop-blur-3xl">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            role="row"
            aria-rowindex={headerGroup.depth + 1}
            className="text-muted-foreground grid h-9 [grid-template-columns:[index]_var(--tracklist-index-column-width,16px)_[first]_minmax(120px,var(--col1,4fr))_[var1]_minmax(120px,var(--col2,2fr))] gap-4 px-4 text-sm"
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                role="columnheader"
                aria-colindex={header.index + 1}
                tabIndex={-1}
                className={cn(
                  header.index === 0 && "justify-self-center",
                  header.index === 1 && "justify-self-start",
                  header.index === 2 && "justify-self-end",
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            role="row"
            aria-rowindex={row.index + 1}
            className="hover:bg-foreground/5 relative grid h-(--row-height) [grid-template-columns:[index]_var(--tracklist-index-column-width,16px)_[first]_minmax(120px,var(--col1,4fr))_[var1]_minmax(120px,var(--col2,2fr))] gap-4 rounded-xs border border-transparent px-4"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                role="gridcell"
                aria-colindex={cell.column.getIndex() + 1}
                className={cn(
                  cell.column.getIndex() === 0 && "justify-self-center",
                  cell.column.getIndex() === 1 && "justify-self-start",
                  cell.column.getIndex() === 2 && "justify-self-end",
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
