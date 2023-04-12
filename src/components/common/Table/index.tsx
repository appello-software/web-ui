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
import Paginate from 'react-paginate';

import { Icon } from '~/components/common/Icon';
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
      {error && <p className="form__error mb-2">{error}</p>}
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
      {isFetching && <div className="absolute inset-0 bg-white/50" />}
      {hasPagination && totalCount > pageSize && (
        <div>
          <Paginate
            breakLabel="..."
            nextLabel={<Icon name="down-arrow" size={18} className="inline -rotate-90" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            breakLinkClassName={styles['pagination__link']}
            breakClassName={styles['pagination__item']}
            pageCount={pageCount}
            forcePage={offset / pageSize}
            previousLabel={<Icon name="down-arrow" size={18} className="inline rotate-90" />}
            containerClassName={clsx(styles['pagination'], 'mt-4')}
            marginPagesDisplayed={5}
            pageLinkClassName={styles['pagination__link']}
            pageClassName={styles['pagination__item']}
            disabledClassName={styles['pagination__item--disabled']}
            activeClassName={styles['pagination__item--active']}
            previousLinkClassName={clsx(
              styles['pagination__link'],
              styles['pagination__link--nav'],
            )}
            previousClassName={styles['pagination__item']}
            nextLinkClassName={clsx(styles['pagination__link'], styles['pagination__link--nav'])}
            nextClassName={styles['pagination__item']}
          />
          <p className="mt-3 text-c2 text-gray-2">
            Results: {offset + 1} - {!isFetching ? offset + data.length : '...'} of {totalCount}
          </p>
        </div>
      )}
    </div>
  );
};
