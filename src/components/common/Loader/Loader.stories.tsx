import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from '.';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    colorful: true,
  },
};
