import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { DateField } from '.';

const meta = {
  title: 'Components/Form/DateField',
  component: DateField,
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { date: null } });

  return <DateField control={form.control} label="Date" name="date" />;
};

const TemplateWithRange: React.FC = () => {
  const form = useForm({ defaultValues: { date: null } });

  return <DateField control={form.control} label="Date" mode="range" name="date" />;
};

export const Standard = Template.bind({});
export const WithRange = TemplateWithRange.bind({});
