import type { Meta, StoryObj } from '@storybook/react';

import Kebabdropdown from './kebabdropdown';

const meta = {
  component: Kebabdropdown,
} satisfies Meta<typeof Kebabdropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};