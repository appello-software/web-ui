/* eslint-disable react/button-has-type */
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
};
