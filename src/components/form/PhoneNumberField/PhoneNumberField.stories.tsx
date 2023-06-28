import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { PhoneNumberField } from '.';

const meta = {
  title: 'Components/Form/PhoneNumberField',
  component: PhoneNumberField,
  tags: ['autodocs'],
} satisfies Meta<typeof PhoneNumberField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { phone: '' }, mode: 'onChange' });

  return <PhoneNumberField name="phone" control={form.control} label="Phone number" />;
};

export const Standard = Template.bind({});
