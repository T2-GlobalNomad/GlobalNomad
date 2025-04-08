'use client';

import CustomButton from '@/components/CustomButton';
import styles from './PostActivity.module.css';
import usePostMyActivities from '@/hooks/query/usePostMyActivity';
import { useActivityStore } from '@/stores/useActivityStore';
import ModalType2 from '@/components/modal/ModalType2';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function PostActivity() {

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { mutate: postActivity, isPending: posting } = usePostMyActivities(); // ✅ 여기로 옮기기
  

  useEffect(() => {
    resetActivity(); // ✅ 컴포넌트 진입 시 초기화
  }, []); 



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
    resetActivity,
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
      subImageUrls: subImageUrls.map((img) => img.imageUrl),
      schedules,
    };

   


    postActivity(payload, {
      onSuccess: () => {
        setShowModal(true);
  
        router.push('/myactivities')

        
      },
      onError: () => {
        alert('등록 실패!');
      },
    });
    console.log('🔥 payload 확인:', payload);
  };

  const handleCloseModal = () => {
    resetActivity(); // 상태 초기화
    router.push('/myactivities'); // 이동
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
         등록하기
      </CustomButton>

      <ModalType2
        showModal={showModal}
        setShowModal={setShowModal}
        isModalMessage="체험 등록이 완료되었습니다"
        onConfirm={handleCloseModal}
      />
    </div>
  );
}
