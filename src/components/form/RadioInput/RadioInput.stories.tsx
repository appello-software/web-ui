import type { Meta, StoryObj } from '@storybook/react';

import { RadioInput } from '.';

const meta = {
  title: 'Components/Inputs/RadioInput',
  component: RadioInput,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    label: 'Label',
  },
};
