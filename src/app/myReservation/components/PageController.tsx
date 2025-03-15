'use client';

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import styles from './style.module.css';

export default function PageController() {
  const [value, setValue] = useState('전체');

  const options = [
    '전체',
    '예약 완료',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];
  return (
    <>
      <div className={styles.head}>
        <p className={styles.title}>예약 내역</p>
        <Dropdown
          options={options}
          selected={value}
          onChange={setValue}
        ></Dropdown>
      </div>
    </>
  );
}
