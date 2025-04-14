// NotificationCard.tsx
import useNotifications from '@/hooks/query/useNotifications';
import useDeleteNotification from '@/hooks/mutation/useDeleteNotification';
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

function getStatusColor(content: string) {
  if (content.includes('승인')) return styles.confirmed;
  if (content.includes('거절')) return styles.declined;
  return content;
}

export default function NotificationCard() {
  const { data: notifications = [], isLoading } = useNotifications();
  const deleteNotification = useDeleteNotification();

  const handleDelete = (id: number) => {
    deleteNotification.mutate(id);
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <ul className={styles.wrapper}>
      {notifications.map((notification) => (
        <li className={styles.container} key={notification.id}>
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
          <Link href='/myreservation'>
            <p className={styles.content}>
              {highlightText(notification.content)}
            </p>
            <p className={styles.time}>{timeDiff(notification.createdAt)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
