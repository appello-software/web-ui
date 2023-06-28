import { isNil } from '@appello/common/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { OnChangeFn, RowData } from '@tanstack/table-core';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import { Pagination, PaginationProps } from '~/components/common/Pagination';
import { useCombinedPropsWithKit } from '~/hooks';

import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';

export interface TableProps<TData> {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Table data
   */
  data: TData[];
  /**
   * Table columns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  /**
   * Sorting state
   */
  sorting?: SortingState;
  /**
   * Sorting state setter
   */
  setSorting?: OnChangeFn<SortingState>;
  /**
   * Pagination offset
   */
  offset?: number;
  /**
   * Pagination offset setter
   * @param offset
   */
  setOffset?: (offset: number) => void;
  /**
   * Total items count for pagination
   */
  totalCount?: number;
  /**
   * Items count per page
   */
  pageSize?: number;
  /**
   * Error message
   */
  error?: string;
  /**
   * Triggering when page changed
   */
  onPageChange?: PaginationProps['onPageChange'];
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const Table = <TData extends object>(props: TableProps<TData>): ReactElement => {
  const {
    className,
    data,
    columns,
    sorting,
    setSorting,
    onPageChange,
    totalCount,
    setOffset,
    error,
    offset,
    pageSize,
  } = useCombinedPropsWithKit({
    name: 'Table',
    props,
  });

  const hasPagination =
    !isNil(offset) && !isNil(setOffset) && !isNil(totalCount) && !isNil(pageSize);

  const hasSorting = !isNil(sorting) && !isNil(setSorting);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    enableSorting: hasSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className={clsx(styles['table-wrapper'], className)}>
      {error && <p className={clsx('form__error', styles['table-error'])}>{error}</p>}
      <table className={styles['table']}>
        <thead className={styles['head']}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                header.column.columnDef.enableHiding ? null : (
                  <HeaderCell key={header.id} header={header} />
                ),
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell =>
                cell.column.columnDef.enableHiding ? null : (
                  <td
                    key={cell.id}
                    className={clsx(styles['cell'], cell.column.columnDef.meta?.className)}
                  >
                    {flexRender(cell.column.columnDef.cell || '-', cell.getContext())}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {hasPagination && totalCount > pageSize && (
        <Pagination
          onPageChange={onPageChange}
          offset={offset}
          setOffset={setOffset}
          totalCount={totalCount}
          itemsCount={data.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
