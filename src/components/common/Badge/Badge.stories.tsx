import type { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeColor } from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

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

export const Orange: Story = {
  args: {
    color: BadgeColor.ORANGE,
    children: 'Text',
  },
};

export const Pink: Story = {
  args: {
    color: BadgeColor.PINK,
    children: 'Text',
  },
};

export const Yellow: Story = {
  args: {
    color: BadgeColor.YELLOW,
    children: 'Text',
  },
};

export const GreenLight: Story = {
  args: {
    color: BadgeColor.GREEN_LIGHT,
    children: 'Text',
  },
};

export const CyanDark: Story = {
  args: {
    color: BadgeColor.CYAN_DARK,
    children: 'Text',
  },
};

export const CyanLight: Story = {
  args: {
    color: BadgeColor.CYAN_LIGHT,
    children: 'Text',
  },
};

export const Purple: Story = {
  args: {
    color: BadgeColor.PURPLE,
    children: 'Text',
  },
};

export const WithIcon: Story = {
  args: {
    color: BadgeColor.GREEN,
    children: 'Text',
    icon: 'document',
  },
};

export const Filled: Story = {
  args: {
    color: BadgeColor.GREEN,
    children: 'Text',
    filled: true,
  },
};

export default meta;
