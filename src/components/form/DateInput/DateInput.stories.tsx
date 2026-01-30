import { Nullable } from '@appello/common';
import type { Meta } from '@storybook/react';
import React, { useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { useController, useForm } from 'react-hook-form';

import { DateField } from '~/components';

import { DateInput, DateInputRefProps } from '.';

const meta = {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm<{ date: Nullable<Date> }>({ defaultValues: { date: null } });
  const controller = useController({ name: 'date', control: form.control });

  return <DateInput value={controller.field.value} onChange={controller.field.onChange} />;
};

export const WithRange: React.FC = () => {
  const form = useForm<{ dateRange: Nullable<DateRange> }>({ defaultValues: { dateRange: null } });
  const controller = useController({ name: 'dateRange', control: form.control });

  return (
    <DateInput mode="range" value={controller.field.value} onChange={controller.field.onChange} />
  );
};

export const ManualOpen: React.FC = () => {
  const form = useForm({ defaultValues: { time: null } });

  const ref = useRef<DateInputRefProps>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          ref.current?.setShowCalendar(true);
        }}
      >
        Open popup
      </button>

      <DateField control={form.control} label="Choose a time" name="time" ref={ref} />
    </>
  );
};
