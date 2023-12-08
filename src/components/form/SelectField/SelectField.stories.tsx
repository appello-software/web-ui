import type { Meta } from '@storybook/react';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { components, OptionProps } from 'react-select';

import { NewSelectOption, SelectOption } from '~/components/form/Select';

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
      isClearable
      control={form.control}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
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
      isClearable
      isCreatable
      control={form.control}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
    />
  );
};

export const Multi: React.FC = () => {
  const form = useForm<{ select: string[] }>({
    defaultValues: {
      select: [],
    },
  });

  return (
    <SelectField
      isClearable
      isMulti
      control={form.control}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
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
      isClearable
      isCreatable
      isMulti
      control={form.control}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
    />
  );
};

const UserOption: FC<OptionProps<SelectOption<string>, true>> = ({ children, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: 'flex' }}>
      <img alt="" src={props.data.photo} style={{ width: 20 }} />
      {children}
    </div>
  </components.Option>
);

export const CustomComponents: React.FC = () => {
  const form = useForm<{ select: string[] }>({
    defaultValues: {
      select: [],
    },
  });

  return (
    <SelectField
      isClearable
      isMulti
      components={{ Option: UserOption }}
      control={form.control}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1', photo: 'https://picsum.photos/188' },
        { label: 'Option 2', value: 'option-2', photo: 'https://picsum.photos/189' },
      ]}
    />
  );
};

export const MultiValueWithOptionDisabled: React.FC = () => {
  const form = useForm<{ select: string[] }>({
    defaultValues: {
      select: [],
    },
  });

  return (
    <SelectField
      isClearable
      isMulti
      control={form.control}
      isOptionDisabled={option => !option.photo}
      label="Choose an option"
      name="select"
      options={[
        { label: 'Option 1', value: 'option-1', photo: 'https://picsum.photos/188' },
        { label: 'Option 2', value: 'option-2' },
      ]}
    />
  );
};
