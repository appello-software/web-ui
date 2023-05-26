import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { RadioGroupField } from '.';

const meta = {
  title: 'Components/Form/RadioGroupField',
  component: RadioGroupField,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupField>;

export default meta;

export const Standard: React.FC = () => {
  const form = useForm<{ answer: boolean | null }>({
    defaultValues: {
      answer: null,
    },
  });

  return (
    <RadioGroupField
      name="answer"
      control={form.control}
      label="How much professional work experience do you have ?"
      items={[
        { label: 'less than 5 years', value: true },
        { label: 'more than 5 years', value: false },
      ]}
    />
  );
};
