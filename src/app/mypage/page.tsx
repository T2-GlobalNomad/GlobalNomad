'use client';

import NotificationCard from '@/components/notification/NotificationCard';
import NotificationModal from '@/components/notification/NotificationModal';
import useMyActivities from '@/hooks/useMyActivities';

export default function MyPage() {
  return (
    <>
      <NotificationModal />
      <NotificationCard />
    </>
  );
}
