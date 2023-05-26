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
    fullWidth: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    label: 'Button',
    fullWidth: false,
  },
};

export const Negative: Story = {
  args: {
    variant: ButtonVariant.NEGATIVE,
    label: 'Button',
    fullWidth: false,
  },
};

export const WithIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
    withIcon: 'add',
    fullWidth: false,
  },
};

export const WithIconAfter: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
    withIcon: 'add',
    iconAfter: true,
    fullWidth: false,
  },
};

export const OnlyIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    withIcon: 'add',
  },
};

export const WithCount: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    label: 'Button',
    count: 3,
    fullWidth: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Button',
    disabled: true,
    fullWidth: false,
  },
};

export const Loading: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    label: 'Some action',
    isLoading: true,
    fullWidth: false,
  },
};
