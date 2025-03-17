import React, { useEffect, useState } from 'react';
import instance from '@/lib/api';
import { Notification } from '@/lib/types';
import NotificationCard from './NotificationCard';

export default function NotificationModal() {
  const [totalCount, setTotalCount] = useState<Notification>({});

  useEffect(() => {
    const fetchNotificationsCount = async () => {
      try {
        const response = await instance.get('/my-notifications');
        setTotalCount(response.data);
      } catch (error) {
        console.error('알림 개수를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchNotificationsCount();
  }, []);

  return (
    <div>
      <p>{totalCount.totalCount}</p>
      <NotificationCard />
    </div>
  );
}
