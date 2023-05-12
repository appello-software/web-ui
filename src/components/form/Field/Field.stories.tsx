import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextInput } from '~/components';

import { Field } from '.';

const meta = {
  title: 'Components/Form/Field',
  component: Field,
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    label: 'Field label',
    children: <TextInput />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Field label',
    children: <TextInput error />,
    error: { type: 'custom', message: 'This is an error' },
  },
};
