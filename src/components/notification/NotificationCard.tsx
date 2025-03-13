import { useEffect, useState } from 'react';
import instance from '@/lib/api';
import { Notifications } from '@/lib/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { FaCircle } from 'react-icons/fa';
import styles from './NotificationCard.module.css';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function timeAgo(dateString: string): string {
  return dayjs(dateString).fromNow();
}

function highlightText(content: string) {
  return content.split(/(승인|거절)/g).map((text, index) => {
    if (text === '승인')
      return (
        <span key={index} className={styles.confirmed}>
          {text}
        </span>
      );
    if (text === '거절')
      return (
        <span key={index} className={styles.declined}>
          {text}
        </span>
      );
    return text;
  });
}

export default function NotificationCard() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/my-notifications');
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('알림을 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p>{highlightText(notification.content)}</p>
              <p>{timeAgo(notification.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
