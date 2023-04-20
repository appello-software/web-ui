import type { Meta } from '@storybook/react';
import React from 'react';
import { useController, useForm } from 'react-hook-form';

import { DateInput } from '.';

const meta = {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm({ defaultValues: { date: null } });
  const controller = useController({ name: 'date', control: form.control });

  return <DateInput value={controller.field.value} onChange={controller.field.onChange} />;
};
