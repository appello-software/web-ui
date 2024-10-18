import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';
import React from 'react';

import styles from '../../styles.module.scss';

type DraggableRowProps<TData> = {
  row: Row<TData>;
  rowId: string;
};

export const DraggableRow = <TData,>({ row, rowId }: DraggableRowProps<TData>) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: rowId,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };
  return (
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map(cell => {
        const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());

        if (cell.column.id === 'drag-handle') {
          return (
            <div
              className={clsx(styles['cell'], cell.column.columnDef.meta?.className)}
              key={cell.id}
              style={{ width: cell.column.getSize() }}
            >
              <div {...dragHandleProps}>{cellContent}</div>
            </div>
          );
        }
        return (
          <div
            className={clsx(styles['cell'], cell.column.columnDef.meta?.className)}
            key={cell.id}
            style={{ width: cell.column.getSize() }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </tr>
  );
};
