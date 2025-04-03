'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './CalendarModal.module.css';

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
          <p className={styles.dateLabel}>날짜</p>
          <button type='button' onClick={() => setIsOpen(false)}>
            <Image src='/images/plus.svg' alt='plus' width={13} height={13} />
          </button>
          {children}
        </div>
      )}
    </>
  );
}
