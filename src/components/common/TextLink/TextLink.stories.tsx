import type { Meta, StoryObj } from '@storybook/react';

import { TextLink } from '.';

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    children: 'Some link',
  },
};
