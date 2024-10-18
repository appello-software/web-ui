import { isNil } from '@appello/common';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { RowData } from '@tanstack/table-core';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import { Pagination } from '~/components/common/Pagination';
import { useCombinedPropsWithKit } from '~/hooks';

import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';
import { CommonTableProps } from './types';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const CommonTable = <TData extends object>(props: CommonTableProps<TData>): ReactElement => {
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
    state: {
      ...(hasSorting ? { sorting } : {}),
    },
    enableSorting: hasSorting,
    getSortedRowModel: hasSorting ? getSortedRowModel() : undefined,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: hasSorting ? setSorting : undefined,
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
                  <HeaderCell header={header} key={header.id} />
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
                    className={clsx(styles['cell'], cell.column.columnDef.meta?.className)}
                    key={cell.id}
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
          itemsCount={data.length}
          offset={offset}
          pageSize={pageSize}
          setOffset={setOffset}
          totalCount={totalCount}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
