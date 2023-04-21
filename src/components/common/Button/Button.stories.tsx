import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonVariant } from '~/components';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
    className: 'sb-button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    label: 'Button',
    className: 'sb-button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
    withIcon: 'add',
    className: 'sb-button',
  },
};

export const OnlyIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    withIcon: 'add',
  },
};
