import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Tabs } from '.';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultTabs = [
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
];

export const Standard: Story = {
  args: {
    items: defaultTabs,
  },
};

export const WithCustomTabsHeadWrapper: Story = {
  args: {
    tabsHeadWrapper: <div className="test" />,
    items: defaultTabs,
  },
};
