import { noop } from '@appello/common/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from '.';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    onChange: noop,
  },
};
