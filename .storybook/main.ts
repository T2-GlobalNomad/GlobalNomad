import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/image': path.resolve(__dirname, 'mocks/NextImage.tsx'),
    };

    return config;
  },
};

export default config;
