import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '~': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};

export default config;
