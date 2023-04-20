import type { Meta } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { PhotoField } from '.';

const meta = {
  title: 'Components/Form/PhotoField',
  component: PhotoField,
  tags: ['autodocs'],
} satisfies Meta<typeof PhotoField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { photo: null } });

  return (
    <PhotoField
      name="photo"
      control={form.control}
      label="Choose a photo"
      photoPlaceholder="/photo-placeholder.svg"
    />
  );
};

export const Standard = Template.bind({});
