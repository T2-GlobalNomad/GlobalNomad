import { Notifications } from '@/lib/types';
import { useEffect, useState } from 'react';
import instance from '@/lib/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어

dayjs.extend(relativeTime);
dayjs.locale('ko');

// 시간차이 계산
function timeDiff(dateString: string): string {
  return dayjs(dateString).fromNow();
}

export default function NotificationCard() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/my-notifications');
        const data = response.data;
        setNotifications(data.notifications);
      } catch (error: unknown) {
        throw new Error('알림을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div>로딩중...</div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <p>{notification.content}</p>
                <p>{timeDiff(notification.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
