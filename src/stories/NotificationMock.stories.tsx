import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import MockedNotificationModal from './NotificationMock';

const meta: Meta<typeof MockedNotificationModal> = {
  title: 'components/notificationModal',
  component: MockedNotificationModal,
};
export default meta;

type Story = StoryObj<typeof MockedNotificationModal>;

const ModalWrapper = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      <MockedNotificationModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const notificationModal: Story = {
  render: () => <ModalWrapper />,
};
