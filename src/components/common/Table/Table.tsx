import React, { ReactElement } from 'react';

import { CommonTable } from './CommonTable';
import { DraggableTable, DraggableTableProps } from './DraggableTable';
import { CommonTableProps } from './types';

export interface TableProps<TData> extends Omit<CommonTableProps<TData>, 'setData' | 'getRowId'> {
  /**
   * Enable drag and drop functionality
   */
  dragAndDrop?: boolean;
  /**
   * Update data order after drag and drop
   */
  setData?: DraggableTableProps<TData>['setData'];
  /** Get item id */
  getRowId?: DraggableTableProps<TData>['getRowId'];
}

export const Table = <TData extends object>(props: TableProps<TData>): ReactElement => {
  const { dragAndDrop, setData, getRowId, ...restProps } = props;

  if (dragAndDrop && setData && getRowId) {
    return <DraggableTable<TData> {...restProps} getRowId={getRowId} setData={setData} />;
  }

  return <CommonTable<TData> {...restProps} />;
};
