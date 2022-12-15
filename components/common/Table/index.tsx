import { ApolloQueryResult } from '@apollo/client/core/types';
import { FetchMoreQueryOptions } from '@apollo/client/core/watchQueryOptions';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { OnChangeFn, RowData } from '@tanstack/table-core';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { ReactElement, useCallback, useState } from 'react';
import Paginate from 'react-paginate';

import { PAGE_SIZE } from '~/constants/pagination';

import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';

interface Props<TData> {
  className?: string;
  data: TData[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];

  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  setOffset: (offset: number) => void;
  offset: number;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  fetchMore: (
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

  totalCount: number;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const Table = <TData extends Record<string, unknown>>({
  className,
  data,
  columns,
  sorting,
  setSorting,
  fetchMore,
  totalCount,
  setOffset,
  offset,
}: Props<TData>): ReactElement => {
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    enableSorting: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const [isFetching, setFetching] = useState(false);

  const handlePageClick = useCallback(
    async (event: { selected: number }) => {
      const newOffset = (event.selected * PAGE_SIZE) % totalCount;
      setOffset(newOffset);

      try {
        setFetching(true);
        await fetchMore({
          variables: {
            pagination: {
              limit: PAGE_SIZE,
              offset: newOffset,
            },
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
      } finally {
        setFetching(false);
      }
    },
    [fetchMore, setOffset, totalCount],
  );

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className={clsx(styles['table-wrapper'], className)}>
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
      {isFetching && <div className="bg-white/50 absolute inset-0" />}
      {totalCount > PAGE_SIZE && (
        <div>
          <Paginate
            breakLabel="..."
            nextLabel={<Icon name="down-arrow" size={18} className="-rotate-90 inline" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            breakLinkClassName={styles['pagination__link']}
            breakClassName={styles['pagination__item']}
            pageCount={pageCount}
            forcePage={offset / PAGE_SIZE}
            previousLabel={<Icon name="down-arrow" size={18} className="rotate-90 inline" />}
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
          <p className="text-c2 text-gray-2 mt-3">
            Results: {offset + 1} - {!isFetching ? offset + data.length : '...'} of {totalCount}
          </p>
        </div>
      )}
    </div>
  );
};
