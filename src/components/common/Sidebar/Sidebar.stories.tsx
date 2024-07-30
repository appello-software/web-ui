import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon, SidebarProps } from '~/components';

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

const defaultSidebarProps: SidebarProps = {
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
    {
      title: 'Settings',
      icon: 'add',
      link: '/settings',
      items: [
        {
          title: 'General',
          link: '/settings/general',
        },
        {
          title: 'Profile',
          link: '/settings/profile',
        },
      ],
    },
  ],
  logo: '/white-logo.svg',
  smallLogo: '/small-logo.svg',
};

const defaultUser = {
  fullName: 'John Doe',
  email: 'johndoe@gmail.com',
  photoPlaceholder: '/photo-placeholder.svg',
};

export const LoggedOut: Story = {
  name: 'Sidebar when user logged out',
  args: defaultSidebarProps,
};

export const LoggedIn: Story = {
  name: 'Sidebar when user authorized',
  args: {
    ...defaultSidebarProps,
    user: defaultUser,
  },
};

export const WithUserRightElement: Story = {
  name: 'Sidebar with user right custom block',
  args: {
    ...defaultSidebarProps,
    user: defaultUser,
    userInfoRightElement: (
      <div
        style={{
          backgroundColor: 'hsl(var(--white-color) / 5%)',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'hsl(var(--white-color) / 40%)',
          borderRadius: 4,
        }}
      >
        <Icon name="bell" size={16} />
      </div>
    ),
  },
};

export const WithRightHeaderElement: Story = {
  name: 'Sidebar with header right custom block',
  args: {
    ...defaultSidebarProps,
    rightHeaderElement: (
      <div
        style={{
          backgroundColor: 'hsl(var(--white-color) / 5%)',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'hsl(var(--white-color) / 40%)',
          borderRadius: 4,
        }}
      >
        <Icon name="bell" size={16} />
      </div>
    ),
  },
};

export const WithNavRightContent: Story = {
  name: 'Sidebar with nav right content',
  args: {
    ...defaultSidebarProps,
    items: defaultSidebarProps.items.map(item => ({
      ...item,
      navRightContent: i => (
        <span
          style={{
            width: 15,
            height: 15,
            backgroundColor: 'red',
            color: 'white',
            borderRadius: 15,
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {i?.items?.length || 0}
        </span>
      ),
      items: item.items?.map(i => ({
        ...i,
        navRightContent: () => (
          <span
            style={{
              width: 15,
              height: 15,
              backgroundColor: 'red',
              color: 'white',
              borderRadius: 15,
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            1
          </span>
        ),
      })),
    })),
    rightHeaderElement: (
      <div
        style={{
          backgroundColor: 'hsl(var(--white-color) / 5%)',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'hsl(var(--white-color) / 40%)',
          borderRadius: 4,
        }}
      >
        <Icon name="bell" size={16} />
      </div>
    ),
  },
};

export const WithFooterTopElement: Story = {
  name: 'Sidebar footer with custom top element',
  args: {
    ...defaultSidebarProps,
    user: defaultUser,
    footerTopElement: (
      <div
        style={{
          marginBottom: 16,
          borderRadius: 4,
          background: '#fff',
          padding: 20,
        }}
      >
        FOOTER TOP ELEMENT
      </div>
    ),
  },
};

export const WithFooterBottomElement: Story = {
  name: 'Sidebar footer with custom bottom element',
  args: {
    ...defaultSidebarProps,
    user: defaultUser,
    footerBottomElement: (
      <div
        style={{
          marginTop: 16,
          borderRadius: 4,
          background: '#fff',
          padding: 20,
        }}
      >
        FOOTER TOP ELEMENT
      </div>
    ),
  },
};
