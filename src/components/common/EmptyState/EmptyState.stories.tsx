import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from '.';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    iconName: 'add',
    label: 'Add a new item',
  },
};
