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
        className={styles['head-cell__body']}
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
          <div className={styles['head-cell__sort']}>
            <Icon
              name="polygon"
              width={6}
              height={4}
              className={clsx(styles['head-cell__sort-icon'], {
                [styles['head-cell__sort-icon--active']]: header.column.getIsSorted() === 'asc',
              })}
            />
            <Icon
              name="polygon"
              width={6}
              height={4}
              className={clsx(styles['head-cell__sort-icon'], {
                [styles['head-cell__sort-icon--active']]: header.column.getIsSorted() === 'desc',
              })}
            />
          </div>
        )}
      </div>
    </th>
  );
};
