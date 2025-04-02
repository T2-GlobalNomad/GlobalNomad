'use client';

import CustomButton from '@/components/CustomButton';
import styles from './PostActivity.module.css';
import usePostMyActivities from '@/hooks/query/usePostMyActivity';
import { useActivityStore } from '@/stores/useActivityStore';
import { useRouter } from 'next/navigation';

export default function PostActivity() {
  const router = useRouter();
  const { mutate: postActivity, isPending: posting } = usePostMyActivities(); // ✅ 여기로 옮기기

  const {
    activity: {
      title,
      category,
      description,
      address,
      price,
      bannerImageUrl,
      subImageUrls,
      date,
      startTime,
      endTime,
      schedules,
    },
  } = useActivityStore(); // ✅ 이것도 최상단에서 호출

  const handleSubmit = () => {
    const payload = {
      title,
      category,
      description,
      address,
      price,
      date,
      startTime,
      endTime,
      bannerImageUrl,
      subImageUrls: subImageUrls.filter(Boolean),
      schedules,
    };

    postActivity(payload, {
      onSuccess: () => {
        alert('등록 성공!');
        router.push('/myactivities');
      },
      onError: () => {
        alert('등록 실패!');
      },
    });
    console.log('🔥 payload 확인:', payload);
  };

  return (
    <div className={styles.container}>
      <p className={styles.postTitle}>내 체험 등록</p>
      <CustomButton
        onClick={handleSubmit}
        fontSize='md'
        className={`customButton-black ${styles.custombutton}`}
        disabled={posting}
      >
        {posting ? '등록 중...' : '등록하기'}
      </CustomButton>
    </div>
  );
}
