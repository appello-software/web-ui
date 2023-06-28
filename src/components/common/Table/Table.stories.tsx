import type { Meta } from '@storybook/react';
import { createColumnHelper, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react';

import { Table } from '.';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

export const Standard: React.FC = () => {
  return <Table columns={COLUMNS} data={data} />;
};

export const WithPagination: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const pageSize = 1;

  return (
    <Table
      columns={COLUMNS}
      data={data.slice(offset, offset + pageSize)}
      pageSize={pageSize}
      offset={offset}
      setOffset={setOffset}
      totalCount={data.length}
    />
  );
};

export const WithSorting: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return <Table columns={COLUMNS} data={data} sorting={sorting} setSorting={setSorting} />;
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
