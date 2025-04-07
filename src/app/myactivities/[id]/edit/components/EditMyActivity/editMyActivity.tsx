'use client';

import CustomButton from '@/components/CustomButton';
import styles from './editMyActivity.module.css';
import useEditMyActivities from '@/hooks/useEditMyActivity';
import useFetchMyActivity from '@/hooks/useFetchMyActivity';
import { useActivityStore } from '@/stores/useActivityStore';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ModalType2 from '@/components/modal/ModalType2';

export default function EditMyActivity() {
  const router = useRouter();
   const [showModal, setShowModal] = useState(false);
  const { mutate: editMyActivity, isPending: editing } = useEditMyActivities(); // ✅ 여기로 옮기기
  
  const params = useParams () as {id : string};
  const activityId = Number(params.id);
  console.log('🆔 activityId:', activityId);
  
  const { data: activity, isLoading } = useFetchMyActivity(activityId);
  console.log("📦 activity 전체 응답", activity);
  
  const queryClient = useQueryClient(); 

  const {
    activity: {
      title,
      category,
      description,
      address,
      price,
      bannerImageUrl,
      subImageUrls,
      subImageIdsToRemove,
      scheduleIdsToRemove,
      schedulesToAdd,
    },
    setActivity, // ✅ 이렇게 activity 바깥에서 꺼내야 함!
  } = useActivityStore();


  useEffect(() => {
    if (activity) {
      setActivity({
        title: activity.title,
        category: activity.category,
        description: activity.description,
        address: activity.address,
        price: activity.price,
        bannerImageUrl: activity.bannerImageUrl,
        subImageUrls: activity.subImages?.map((img) => img.imageUrl) || [],
        subImageIdsToRemove: [],
        scheduleIdsToRemove: [],
        schedules: activity.schedules?.map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })) || [],
        schedulesToAdd: [], 
      });
    }
  }, [activity]);


  console.log('🧩 activity:', activity);
  console.log('🎯 activity.schedule:', activity?.schedules);




  const handleSubmit = () => {
    const payload = {
      title,
      category,
      description,
      address,
      price,
      bannerImageUrl,
      subImageUrlsToAdd: subImageUrls.filter(Boolean),
      subImageIdsToRemove,
      scheduleIdsToRemove,
      schedulesToAdd,
    };

    editMyActivity({activityId, payload}, {
      onSuccess: (data) => {
        console.log('🎯 최종 서버 응답 확인:', data.bannerImageUrl);
        queryClient.invalidateQueries({ queryKey: ['myActivities'], exact: false });
        queryClient.refetchQueries({ queryKey: ['myActivities'], exact: false });
        
        setShowModal(true);
     
      },
      onError: () => {
        alert('수정 실패!');
        console.log('🔥 payload 확인:', payload);
      },
    });
    console.log('🔥 payload 확인:', payload);


 

  };

  const handleCloseModal = () => {
    router.push('/myactivities'); // 이동
  };

  return (
    <div className={styles.container}>
      <p className={styles.postTitle}>내 체험 수정</p>
      <CustomButton
        onClick={handleSubmit}
        fontSize='md'
        className={`customButton-black ${styles.custombutton}`}
        disabled={editing}
      >
        {editing ? '수정 중...' : '수정하기'}
      </CustomButton>

       <ModalType2
              showModal={showModal}
              setShowModal={setShowModal}
              isModalMessage="체험 수정이 완료되었습니다"
              onConfirm={handleCloseModal}
            />
    </div>
  );
};
