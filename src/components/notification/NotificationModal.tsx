import React from 'react';
import useNotifications from '@/hooks/query/useNotifications';
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
  const { data: notifications = [] } = useNotifications();
  const totalCount = notifications.length;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.totalCount}>알림 {totalCount}개</p>
          <CloseButton onClick={onClose} className={styles.closeBtn} />
        </div>
        <div className={styles.notificationContainer}>
          <NotificationCard />
        </div>
      </div>
    </div>
  );
}
