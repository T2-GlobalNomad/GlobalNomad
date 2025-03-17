'use client';

import { useEffect, useState } from 'react';

export function useStatusFilter() {
  const [value, setValue] = useState('전체');
  const [status, setStatus] = useState('');

  const options = [
    '전체',
    '예약 신청',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];

  useEffect(() => {
    if (value)
      switch (value) {
        case '전체':
          setStatus('');
          break;
        case '예약 신청':
          setStatus('pending');
          break;
        case '예약 취소':
          setStatus('canceled');
          break;
        case '예약 승인':
          setStatus('confirmed');
          break;
        case '예약 거절':
          setStatus('declined');
          break;
        case '체험 완료':
          setStatus('completed');
          break;
      }
  }, [value]);

  return { value, setValue, status, options };
}
