import type { Meta } from '@storybook/react';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { SelectRefProps } from '~/components';

import { TimeField } from '.';

const meta = {
  title: 'Components/Form/TimeField',
  component: TimeField,
  tags: ['autodocs'],
} satisfies Meta<typeof TimeField>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm({ defaultValues: { time: null } });

  return <TimeField control={form.control} label="Choose a time" name="time" />;
};

export const ManualOpen: React.FC = () => {
  const form = useForm({ defaultValues: { time: null } });

  const ref = useRef<SelectRefProps<any>>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          ref.current?.focus();
          ref.current?.onMenuOpen();
        }}
      >
        Open popup
      </button>

      <TimeField control={form.control} label="Choose a time" name="time" ref={ref} />
    </>
  );
};
