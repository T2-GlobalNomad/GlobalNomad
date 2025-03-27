'use client';

import { useEffect, useState } from 'react';

export const useStatusFilter = () => {
  const [value, setValue] = useState<string | null>('전체');
  const [status, setStatus] = useState<string>('');

  // const options = [
  //   '전체',
  //   '예약 신청',
  //   '예약 취소',
  //   '예약 승인',
  //   '예약 거절',
  //   '체험 완료',
  // ];

  const options = [
    { value: '전체', label: '전체' },
    { value: '예약 신청', label: '예약 신청' },
    { value: '예약 취소', label: '예약 취소' },
    { value: '예약 승인', label: '예약 승인' },
    { value: '예약 거절', label: '예약 거절' },
    { value: '체험 완료', label: '체험 완료' },
  ];

  useEffect(() => {
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
};
