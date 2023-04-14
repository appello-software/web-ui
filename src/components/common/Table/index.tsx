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
import React, { ReactElement, useCallback, useState } from 'react';

import { Pagination } from '~/components/common/Pagination';
import { useAppelloKit } from '~/ctx';

import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';

interface Props<TData> {
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
}: Props<TData>): ReactElement => {
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

  const [isFetching, setFetching] = useState(false);

  const handlePageClick = useCallback(
    async (event: { selected: number }) => {
      if (!hasPagination) return;

      const newOffset = (event.selected * pageSize) % totalCount;
      setOffset(newOffset);

      try {
        setFetching(true);
        await fetchMore({
          variables: {
            pagination: {
              limit: pageSize,
              offset: newOffset,
            },
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
      } finally {
        setFetching(false);
      }
    },
    [fetchMore, hasPagination, pageSize, setOffset, totalCount],
  );

  const pageCount = hasPagination ? Math.ceil(totalCount / pageSize) : 0;

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
      {isFetching && <div className={styles['table-overlay']} />}
      {hasPagination && totalCount > pageSize && (
        <Pagination
          onPageChange={handlePageClick}
          pageSize={pageSize}
          offset={offset}
          pageCount={pageCount}
          totalCount={totalCount}
          itemsCount={data.length}
        />
      )}
    </div>
  );
};
