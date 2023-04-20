import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Select } from '.';

const meta = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

export const Standard: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      options={[
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
      ]}
      value={value}
      isClearable
      onChange={setValue}
    />
  );
};
