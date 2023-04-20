import type { Meta, StoryObj } from '@storybook/react';

import { FieldErrorMessage } from '.';

const meta = {
  title: 'Components/Form/FieldErrorMessage',
  component: FieldErrorMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    error: { type: 'custom', message: 'This is an error' },
  },
};
