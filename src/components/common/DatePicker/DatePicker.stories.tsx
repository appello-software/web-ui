import { noop } from '@appello/common';
import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from '.';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    onChange: noop,
  },
};
