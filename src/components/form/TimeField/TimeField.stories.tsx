import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { TimeField } from '.';

const meta = {
  title: 'Components/Form/TimeField',
  component: TimeField,
  tags: ['autodocs'],
} satisfies Meta<typeof TimeField>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm({ defaultValues: { time: null } });

  return <TimeField name="time" control={form.control} label="Choose a time" />;
};
