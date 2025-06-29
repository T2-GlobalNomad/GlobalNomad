import { useState } from 'react';

export const useStatusFilter = () => {
  const [value, setValue] = useState<string | null>('전체');

  const options = [
    { value: '전체', label: '전체' },
    { value: '예약 신청', label: '예약 신청' },
    { value: '예약 취소', label: '예약 취소' },
    { value: '예약 승인', label: '예약 승인' },
    { value: '예약 거절', label: '예약 거절' },
    { value: '체험 완료', label: '체험 완료' },
  ];

  const statusMap: Record<string, string> = {
    전체: '',
    '예약 신청': 'pending',
    '예약 취소': 'canceled',
    '예약 승인': 'confirmed',
    '예약 거절': 'declined',
    '체험 완료': 'completed',
  };

  return { value, setValue, status: statusMap[value ?? ''] || '', options };
};
