import type { Meta, StoryObj } from '@storybook/react';
import MockedProfileCard from './ProfileCardMock';

const meta: Meta<typeof MockedProfileCard> = {
  title: 'components/ProfileCard',
  component: MockedProfileCard,
};
export default meta;

type Story = StoryObj<typeof MockedProfileCard>;

export const MyPgae: Story = {
  args: {
    activeTab: 'mypage',
  },
};

export const MyReservation: Story = {
  args: {
    activeTab: 'myreservation',
  },
};

export const MyActivities: Story = {
  args: {
    activeTab: 'myactivities',
  },
};

export const myNotification: Story = {
  args: {
    activeTab: 'mynotification',
  },
};
