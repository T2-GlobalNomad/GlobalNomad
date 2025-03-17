import React, { useEffect, useState } from 'react';
import instance from '@/lib/api';
import { Notification } from '@/lib/types';
<<<<<<< HEAD
import CloseButton from '../CloseButton';
import NotificationCard from './NotificationCard';
import styles from './NotificationModal.module.css';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
=======
import NotificationCard from './NotificationCard';

export default function NotificationModal() {
>>>>>>> dd7202e0 (chore: 컨플릭트 해결)
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

<<<<<<< HEAD
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.totalCount}>알림 {totalCount.totalCount}개</p>
          <CloseButton onClick={onClose} className={styles.closeBtn} />
        </div>
        <div className={styles.notificationContainer}>
          <NotificationCard />
        </div>
      </div>
=======
  return (
    <div>
      <p>{totalCount.totalCount}</p>
      <NotificationCard />
>>>>>>> dd7202e0 (chore: 컨플릭트 해결)
    </div>
  );
}
