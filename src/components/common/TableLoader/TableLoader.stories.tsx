import type { Meta, StoryObj } from '@storybook/react';

import { TableLoader } from '.';

const meta = {
  title: 'Components/TableLoader',
  component: TableLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof TableLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
