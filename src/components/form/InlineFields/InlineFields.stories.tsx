import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Field, TextInput } from '~/components';

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
        <Field label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolorum et excepturi impedit laborum minima nisi nostrum quam quasi voluptatum.">
          <TextInput />
        </Field>
        <Field label="Lorem ipsum" error={{ message: 'Some error', type: 'custom' }}>
          <TextInput error />
        </Field>
        <Field label="Lorem ipsum">
          <TextInput />
        </Field>
        <Field label="Lorem ipsum">
          <TextInput />
        </Field>
      </>
    ),
  },
};
