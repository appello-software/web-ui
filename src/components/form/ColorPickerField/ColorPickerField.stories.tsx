import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerField } from '.';

const meta = {
  title: 'Components/Form/ColorPickerField',
  component: ColorPickerField,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPickerField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { color: null } });

  return <ColorPickerField control={form.control} label="Color" name="color" />;
};

export const Standard = Template.bind({});
