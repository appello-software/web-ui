import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { PasswordField } from '.';

const meta = {
  title: 'Components/Form/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { password: '' } });

  return <PasswordField name="password" control={form.control} label="Password" />;
};

export const Standard = Template.bind({});
