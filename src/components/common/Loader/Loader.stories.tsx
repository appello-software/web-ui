import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from '.';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Standard: Story = {
  args: {
    colorful: true,
  },
};

export const CustomClasses: Story = {
  args: {
    dotClassNames: 'loader-custom',
  },
};
