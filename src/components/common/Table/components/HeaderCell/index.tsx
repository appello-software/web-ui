import { flexRender, Header } from '@tanstack/react-table';
import { RowData } from '@tanstack/table-core';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import { Icon } from '~/components/common/Icon';

import styles from '../../styles.module.scss';

interface HeaderCellProps<TData> {
  header: Header<TData, unknown>;
}

export const HeaderCell = <TData extends RowData>({
  header,
}: HeaderCellProps<TData>): ReactElement => {
  return (
    <th className={styles['head-cell']}>
      <div
        className="flex select-none items-center"
        {...(header.column.getCanSort()
          ? {
              onClick: header.column.getToggleSortingHandler(),
              role: 'button',
              tabIndex: 0,
            }
          : {})}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() && (
          <div className="ml-2 inline-flex flex-col">
            <Icon
              name="polygon"
              width={6}
              height={4}
              className={clsx(
                'rotate-180',
                'mb-[1px]',
                'transition',
                header.column.getIsSorted() === 'asc' ? 'text-gray-1' : 'text-gray-3',
              )}
            />
            <Icon
              name="polygon"
              width={6}
              height={4}
              className={clsx(
                'transition',
                header.column.getIsSorted() === 'desc' ? 'text-gray-1' : 'text-gray-3',
              )}
            />
          </div>
        )}
      </div>
    </th>
  );
};