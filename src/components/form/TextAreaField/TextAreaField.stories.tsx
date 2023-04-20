import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { TextAreaField } from '.';

const meta = {
  title: 'Components/Form/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextAreaField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { description: '' } });

  return <TextAreaField name="description" control={form.control} label="Description" />;
};

export const Standard = Template.bind({});
