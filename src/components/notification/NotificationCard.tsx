import { useEffect, useState } from 'react';
import instance from '@/lib/api';
import { Notifications } from '@/lib/types';
import CloseButton from '@/components/CloseButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { FaCircle } from 'react-icons/fa';
import Link from 'next/link';
import styles from './NotificationCard.module.css';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function timeDiff(dateString: string): string {
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

// 승인/거절 따라 점 색상 표시
function getStatusColor(content: string) {
  if (content.includes('승인')) {
    return styles.confirmed;
  }
  if (content.includes('거절')) {
    return styles.declined;
  }
  return content;
}

export default function NotificationCard() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 알림 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/my-notifications');
        setNotifications(response.data.notifications);
        console.log('알림 데이터: ', response.data.notifications);
      } catch (error) {
        console.error('알림을 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // 알림 삭제
  const handleDelete = async (id: number) => {
    try {
      const updatedNotification = notifications.filter(
        (notification) => notification.id !== id,
      );
      await instance.delete(`/my-notifications/${id}`);
      setNotifications(updatedNotification);
    } catch (error) {
      console.error('알림을 삭제하는 데 실패했습니다.', error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>알림 로딩중...</div>
      ) : (
        <ul className={styles.wrapper}>
          {notifications.map((notification) => (
            <li className={styles.container} key={notification.id}>
              <Link href='/myreservation'>
                <div className={styles.header}>
                  <FaCircle
                    className={`${styles.faCircle} ${getStatusColor(
                      notification.content,
                    )}`}
                  />
                  <CloseButton
                    className={styles.closeBtn}
                    onClick={() => handleDelete(notification.id)}
                  />
                </div>
                <p className={styles.content}>
                  {highlightText(notification.content)}
                </p>
                <p className={styles.time}>
                  {timeDiff(notification.createdAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
