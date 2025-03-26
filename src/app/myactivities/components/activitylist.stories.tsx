import type { Meta, StoryObj } from '@storybook/react';
import ActivityList from './activitylist'; // ✅ 대소문자 확인
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta = {
  title: 'My Activities/ActivityList',
  component: ActivityList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof ActivityList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
