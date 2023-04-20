import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonVariant } from '~/components';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    className: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    label: 'Button',
  },
};

export const Negative: Story = {
  args: {
    variant: ButtonVariant.NEGATIVE,
    label: 'Button',
  },
};
