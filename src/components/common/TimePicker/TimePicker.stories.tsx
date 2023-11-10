import { noop } from '@appello/common';
import type { Meta, StoryObj } from '@storybook/react';

import { TimePicker } from '.';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    value: '02:00:00',
    onChange: noop,
  },
};
