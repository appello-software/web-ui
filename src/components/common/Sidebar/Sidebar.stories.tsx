import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from '.';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    items: [
      {
        title: 'Dashboard',
        icon: 'add',
        link: '/dashboard',
      },
      {
        title: 'Users',
        icon: 'add',
        link: '/users',
      },
    ],
    logo: '/white-logo.svg',
  },
};

export const LoggedIn: Story = {
  args: {
    ...LoggedOut.args,
    user: {
      fullName: 'John Doe',
      email: 'johndoe@gmail.com',
      photoPlaceholder: '/photo-placeholder.svg',
    },
  },
};
