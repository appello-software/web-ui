import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '.';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    name: 'add',
  },
};
