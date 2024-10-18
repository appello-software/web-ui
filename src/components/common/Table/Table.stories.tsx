import type { Meta } from '@storybook/react';
import { createColumnHelper, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react';

import { CommonTable } from './CommonTable';
import { RowDragHandleCell } from './components/RowDragHandleCell';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof CommonTable>;

export default meta;

export const Standard: React.FC = () => {
  return <CommonTable columns={COLUMNS} data={data} />;
};

export const DragAndDropTable: React.FC = () => {
  const [tableData, setTableData] = React.useState([...data]);

  return (
    <Table
      dragAndDrop
      columns={DRAG_AND_DROP_COLUMNS}
      data={tableData}
      getRowId={row => String(row.id)}
      setData={setTableData}
    />
  );
};

export const WithPagination: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const pageSize = 1;

  return (
    <CommonTable
      columns={COLUMNS}
      data={data.slice(offset, offset + pageSize)}
      offset={offset}
      pageSize={pageSize}
      setOffset={setOffset}
      totalCount={data.length}
    />
  );
};

export const WithSorting: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return <CommonTable columns={COLUMNS} data={data} setSorting={setSorting} sorting={sorting} />;
};

interface ExampleDataItem {
  id: number;
  fullName: string;
  email: string;
}

const columnHelper = createColumnHelper<ExampleDataItem>();

const COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Full Name',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
];

const DRAG_AND_DROP_COLUMNS = [
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
