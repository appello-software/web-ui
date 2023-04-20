import type { Meta, StoryObj } from '@storybook/react';

import { IconContainer } from '.';

const meta = {
  title: 'Components/IconContainer',
  component: IconContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof IconContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    name: 'add',
  },
};
