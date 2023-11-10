import type { Meta } from '@storybook/react';
import React from 'react';

import { useAppelloKit } from '~/ctx';

import { Pagination } from '.';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

const Template: React.FC = () => {
  const [offset, setOffset] = React.useState(0);
  const { pageSize } = useAppelloKit();

  return (
    <Pagination
      itemsCount={pageSize}
      offset={offset}
      pageSize={pageSize}
      setOffset={setOffset}
      totalCount={1000}
    />
  );
};

export const Standard = Template.bind({});
