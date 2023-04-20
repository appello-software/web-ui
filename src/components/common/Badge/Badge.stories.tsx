import type { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeColor } from '.';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Green: Story = {
  args: {
    color: BadgeColor.GREEN,
    children: 'Text',
  },
};

export const Gray: Story = {
  args: {
    color: BadgeColor.GRAY,
    children: 'Text',
  },
};

export const Blue: Story = {
  args: {
    color: BadgeColor.BLUE,
    children: 'Text',
  },
};

export const Red: Story = {
  args: {
    color: BadgeColor.RED,
    children: 'Text',
  },
};
