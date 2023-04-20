import './styles.scss';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React, { ComponentType } from 'react';

export const decorators = [
  (Story: ComponentType) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

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
