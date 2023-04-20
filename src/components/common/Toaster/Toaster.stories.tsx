import type { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { Toaster } from '.';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;

const Template: React.FC = () => {
  useEffect(() => {
    toast.success('Success message', { duration: 5000 });
    toast.error('Error message', { duration: 5000 });
  }, []);

  return <Toaster />;
};

export const Standard = Template.bind({});
