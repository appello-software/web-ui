import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { TextField } from '.';

const meta = {
  title: 'Components/Form/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { description: '' } });

  return <TextField name="description" control={form.control} label="Description" />;
};

export const Standard = Template.bind({});
