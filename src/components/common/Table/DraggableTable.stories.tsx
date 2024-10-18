import type { Meta } from '@storybook/react';
import { createColumnHelper, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react';

import { RowDragHandleCell } from './components/RowDragHandleCell';
import { DraggableTable } from './DraggableTable';

const meta = {
  title: 'Components/DraggableTable',
  component: DraggableTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DraggableTable>;

export default meta;

export const Standard: React.FC = () => {
  const [tableData, setTableData] = React.useState([...data]);

  return (
    <DraggableTable
      columns={COLUMNS}
      data={tableData}
      getRowId={row => String(row.id)}
      setData={setTableData}
    />
  );
};

export const WithPagination: React.FC = () => {
  const [tableData, setTableData] = React.useState(() => [...data]);
  const [offset, setOffset] = useState<number>(0);
  const pageSize = 1;

  return (
    <DraggableTable
      columns={COLUMNS}
      data={tableData.slice(offset, offset + pageSize)}
      getRowId={row => String(row.id)}
      offset={offset}
      pageSize={pageSize}
      setData={setTableData}
      setOffset={setOffset}
      totalCount={data.length}
    />
  );
};

export const WithSorting: React.FC = () => {
  const [tableData, setTableData] = React.useState([...data]);
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <DraggableTable
      columns={COLUMNS}
      data={tableData}
      getRowId={row => String(row.id)}
      setData={setTableData}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};

interface ExampleDataItem {
  id: number;
  fullName: string;
  email: string;
}

const columnHelper = createColumnHelper<ExampleDataItem>();

const COLUMNS = [
  columnHelper.display({
    id: 'drag-handle',
    header: 'Move',
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
    size: 60,
  }),
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Full Name',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
];

const data = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
  },
  {
    id: 2,
    fullName: 'Matt Smith',
    email: 'mattsmith@gmail.com',
  },
];
