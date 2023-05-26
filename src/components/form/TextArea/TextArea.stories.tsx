import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { TextArea } from '.';

const meta = {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLength: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <TextArea
      value={value}
      onChange={e => setValue((e.target as HTMLTextAreaElement).value)}
      maxLength={150}
    />
  );
};
