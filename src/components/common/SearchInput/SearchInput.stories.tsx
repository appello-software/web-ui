import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { SearchInput } from '.';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;

export const Standard: React.FC = () => {
  const [value, setValue] = useState('');

  return <SearchInput defaultValue={value} onChange={setValue} />;
};
