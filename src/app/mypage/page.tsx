'use client';

import NotificationCard from '@/components/notification/NotificationCard';
import NotificationModal from '@/components/notification/NotificationModal';

export default function MyPage() {
  return (
    <>
      <NotificationModal />
      <NotificationCard />
    </>
  );
}
