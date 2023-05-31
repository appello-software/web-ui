import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { NewSelectOption } from '~/components/form/Select';

import { SelectField } from '.';

const meta = {
  title: 'Components/Form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectField>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm<{ select: string | null }>({
    defaultValues: {
      select: 'null',
    },
  });

  return (
    <SelectField
      name="select"
      control={form.control}
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
      isClearable
      label="Choose an option"
    />
  );
};

export const Creatable: React.FC = () => {
  const form = useForm<{ select: string | NewSelectOption | null }>({
    defaultValues: {
      select: null,
    },
  });

  return (
    <SelectField
      name="select"
      control={form.control}
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
      isClearable
      isCreatable
      label="Choose an option"
    />
  );
};

export const MultiCreatable: React.FC = () => {
  const form = useForm<{ select: (string | NewSelectOption)[] }>({
    defaultValues: {
      select: [],
    },
  });

  return (
    <SelectField
      name="select"
      control={form.control}
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
      isClearable
      isCreatable
      isMulti
      label="Choose an option"
    />
  );
};
