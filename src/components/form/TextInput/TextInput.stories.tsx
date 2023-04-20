import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '.';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};
