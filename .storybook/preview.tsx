import './styles.scss';
import type { Preview } from '@storybook/react';
import React, { ComponentType } from 'react';

export const decorators = [(Story: ComponentType) => <Story />];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        locales: 'en-US',
      },
    },
  },
};

export default preview;
