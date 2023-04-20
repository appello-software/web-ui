import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from '.';

const meta = {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};
