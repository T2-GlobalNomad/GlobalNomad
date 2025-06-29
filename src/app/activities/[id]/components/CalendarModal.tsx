'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './CalendarModal.module.css';
import CustomModal from '@/components/modal/CustomModal';

interface CalendarModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
}

export function CalendarTabletModal({
  isOpen,
  setIsOpen,
  children,
}: CalendarModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.tabletModal}>
          <div className={styles.tabletModalHeader}>
            <p className={styles.tabletDateLabel}>날짜</p>
            <button type='button' onClick={() => setIsOpen(false)}>
              <div className={styles.tabletCloseButton}>
                <Image src='/images/btn_X_40px.svg' alt='plus' fill />
              </div>
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
}

export function CalendarMobileModal({
  isOpen,
  setIsOpen,
  children,
}: CalendarModalProps) {
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.mobileModal}
      >
        <div className={styles.mobileModalHeader}>
          <p className={styles.mobileDateLabel}>날짜</p>
          <button type='button' onClick={() => setIsOpen(false)}>
            <div className={styles.mobileCloseButton}>
              <Image src='/images/btn_X_40px.svg' alt='plus' fill />
            </div>
          </button>
        </div>
        {children}
      </CustomModal>
    </>
  );
}
