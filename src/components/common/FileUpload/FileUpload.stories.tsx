import { noop } from '@appello/common';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { FileUpload } from '.';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    onUpload: noop,
    children: ({ onClick }) => (
      <button type="button" onClick={onClick}>
        Upload
      </button>
    ),
  },
};
