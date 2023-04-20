import { ApolloQueryResult } from '@apollo/client/core/types';
import { FetchMoreQueryOptions } from '@apollo/client/core/watchQueryOptions';
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

import { Pagination } from '~/components/common/Pagination';
import { useAppelloKit } from '~/ctx';

import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';

export interface TableProps<TData> {
  className?: string;
  data: TData[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];

  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;

  setOffset?: (offset: number) => void;
  offset?: number;
  totalCount?: number;

  error?: string;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  fetchMore?: (
    options: FetchMoreQueryOptions<any> & {
      updateQuery?: (
        previousQueryResult: any,
        options: {
          fetchMoreResult: any;
          variables: any;
        },
      ) => any;
    },
  ) => Promise<ApolloQueryResult<TData>>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const Table = <TData extends object>({
  className,
  data,
  columns,
  sorting,
  setSorting,
  fetchMore,
  totalCount,
  setOffset,
  error,
  offset,
}: TableProps<TData>): ReactElement => {
  const hasPagination =
    !isNil(offset) && !isNil(setOffset) && !isNil(totalCount) && !isNil(fetchMore);
  const hasSorting = !isNil(sorting) && !isNil(setSorting);
  const { pageSize } = useAppelloKit();

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
              {headerGroup.headers.map(header => (
                <HeaderCell key={header.id} header={header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={clsx(styles['cell'], cell.column.columnDef.meta?.className)}
                >
                  {flexRender(cell.column.columnDef.cell || '-', cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {hasPagination && totalCount > pageSize && (
        <Pagination
          fetchMore={fetchMore}
          offset={offset}
          setOffset={setOffset}
          totalCount={totalCount}
          itemsCount={data.length}
        />
      )}
    </div>
  );
};
