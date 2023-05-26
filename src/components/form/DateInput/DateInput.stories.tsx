import type { Meta } from '@storybook/react';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useController, useForm } from 'react-hook-form';

import { DateInput } from '.';

const meta = {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm<{ date: Date | null }>({ defaultValues: { date: null } });
  const controller = useController({ name: 'date', control: form.control });

  return <DateInput value={controller.field.value} onChange={controller.field.onChange} />;
};

export const WithRange: React.FC = () => {
  const form = useForm<{ dateRange: DateRange | null }>({ defaultValues: { dateRange: null } });
  const controller = useController({ name: 'dateRange', control: form.control });

  return (
    <DateInput mode="range" value={controller.field.value} onChange={controller.field.onChange} />
  );
};
