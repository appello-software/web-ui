import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextInput } from '~/components';

import { InlineFields } from '.';

const meta = {
  title: 'Components/Form/InlineFields',
  component: InlineFields,
  tags: ['autodocs'],
} satisfies Meta<typeof InlineFields>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    children: (
      <>
        <TextInput />
        <TextInput />
      </>
    ),
  },
};
