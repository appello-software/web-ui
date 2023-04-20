import { noop } from '@appello/common/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { BrowserSelect } from '.';

const meta = {
  title: 'Components/BrowserSelect',
  component: BrowserSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof BrowserSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    onChange: noop,
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    value: 'option-2',
    children: 'Label',
  },
};
