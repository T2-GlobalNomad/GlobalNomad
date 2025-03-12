<<<<<<< HEAD
import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';
=======
import type { StorybookConfig } from '@storybook/nextjs';
>>>>>>> c56fa985 (storybook dependencies downloaded)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
<<<<<<< HEAD
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  staticDirs: ['..\\public'],
=======
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ]
>>>>>>> c56fa985 (storybook dependencies downloaded)
};
export default config;
