import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Dropdown } from '.';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    items: [
      {
        label: 'Option 1',
        // eslint-disable-next-line no-console
        onSelect: () => console.log('Option 1 selected'),
      },
      {
        label: 'Option 2',
        items: [
          {
            label: 'Option 2.1',
            // eslint-disable-next-line no-console
            onSelect: () => console.log('Option 2.1 selected'),
          },
          {
            label: 'Option 2.2',
            // eslint-disable-next-line no-console
            onSelect: () => console.log('Option 2.2 selected'),
          },
        ],
      },
    ],
    children: ({ isOpen, onClick }) => (
      <button type="button" onClick={onClick}>
        {isOpen ? 'Close dropdown' : 'Open dropdown'}
      </button>
    ),
  },
};
