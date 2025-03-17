'use client';

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import styles from './style.module.css';

export default function PageController() {
  const options = [
    { id: 1, title: '전체' },
    { id: 2, title: '예약 완료' },
    { id: 3, title: '예약 취소' },
    { id: 4, title: '예약 승인' },
    { id: 5, title: '예약 거절' },
    { id: 6, title: '체험 완료' },
  ];
  const [value, setValue] = useState(options[0]);

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
