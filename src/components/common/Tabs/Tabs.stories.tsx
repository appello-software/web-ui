import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '.';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    items: [
      {
        title: 'Tab 1',
        element: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        element: 'Tab 2 content',
      },
      {
        title: 'Tab 3',
        element: 'Tab 3 content',
      },
    ],
  },
};
