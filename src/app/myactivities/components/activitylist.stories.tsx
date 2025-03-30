<<<<<<< HEAD
import type { Meta, StoryObj } from '@storybook/react';
import ActivityList from './activitylist'; // ✅ 대소문자 확인
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
=======
import type { Meta, StoryObj } from "@storybook/react";
import ActivityList from "./activitylist"; // ✅ 대소문자 확인
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>>>>>>> 11d5db1d (feat: 내 체험 조회 페이지 작업중)

const queryClient = new QueryClient();

const meta = {
<<<<<<< HEAD
  title: 'My Activities/ActivityList',
=======
  title: "My Activities/ActivityList",
>>>>>>> 11d5db1d (feat: 내 체험 조회 페이지 작업중)
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
