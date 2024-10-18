import { isNil } from '@appello/common';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  ColumnDef,
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

import { DraggableRow } from './components/DraggableTableRow';
import { HeaderCell } from './components/HeaderCell';
import styles from './styles.module.scss';

export interface DraggableTableProps<TData> {
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
  /**
   * Update data order after drag and drop
   */
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  /** Get item id */
  getRowId: (row: TData) => string;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

export const DraggableTable = <TData extends object>(
  props: DraggableTableProps<TData>,
): ReactElement => {
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
    getRowId,
    setData,
  } = useCombinedPropsWithKit({
    name: 'DraggableTable',
    props,
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data.map(getRowId), [data, getRowId]);

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
    getRowId,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData(data => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex); // this is just a splice util
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <div className={clsx(styles['table-wrapper'], className)}>
      {error && <p className={clsx('form__error', styles['table-error'])}>{error}</p>}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
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
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {' '}
              {table.getRowModel().rows.map(row => (
                <DraggableRow key={row.id} row={row} rowId={getRowId(row.original)} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>

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
