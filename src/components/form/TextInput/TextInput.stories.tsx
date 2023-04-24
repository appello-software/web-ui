import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon } from '~/components/common/Icon';

import { TextInput } from '.';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const IconBefore: Story = {
  args: {
    iconBeforeElement: <Icon name="magnifier" />,
    placeholder: 'Placeholder',
  },
};

export const IconAfter: Story = {
  args: {
    iconAfterElement: <Icon name="document" />,
    placeholder: 'Placeholder',
  },
};
