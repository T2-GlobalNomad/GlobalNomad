// components/notification/DummyNotificationModal.tsx

import React from 'react';
import { FaCircle } from 'react-icons/fa';
import CloseButton from '@/components/CloseButton';
import styles from '@/components/notification/NotificationModal.module.css';
import cardStyles from '@/components/notification/NotificationCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const mockNotifications = [
  {
    id: 1,
    content:
      '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    content:
      '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    content:
      '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    content:
      '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었어요.',
    createdAt: new Date().toISOString(),
  },
];

const timeDiff = (dateString: string) => {
  return dayjs(dateString).fromNow();
};

const highlightText = (content: string) =>
  content.split(/(승인|거절)/g).map((text, i) => {
    if (text === '승인')
      return (
        <span key={i} className={cardStyles.confirmed}>
          {text}
        </span>
      );
    if (text === '거절')
      return (
        <span key={i} className={cardStyles.declined}>
          {text}
        </span>
      );
    return text;
  });

const getStatusColor = (content: string) => {
  if (content.includes('승인')) return cardStyles.confirmed;
  if (content.includes('거절')) return cardStyles.declined;
  return '';
};

export default function MockedNotificationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.totalCount}>알림 {mockNotifications.length}개</p>
          <CloseButton className={styles.closeBtn} onClick={onClose} />
        </div>
        <div className={styles.notificationContainer}>
          <ul className={cardStyles.wrapper}>
            {mockNotifications.map((notification) => (
              <li key={notification.id} className={cardStyles.container}>
                <div className={cardStyles.header}>
                  <FaCircle
                    className={`${cardStyles.faCircle} ${getStatusColor(
                      notification.content,
                    )}`}
                  />
                  <CloseButton
                    className={cardStyles.closeBtn}
                    onClick={() => {}}
                  />
                </div>
                <p className={cardStyles.content}>
                  {highlightText(notification.content)}
                </p>
                <p className={cardStyles.time}>
                  {timeDiff(notification.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
