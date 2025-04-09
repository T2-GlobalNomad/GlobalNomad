'use client';

import CustomButton from '@/components/CustomButton';
import styles from './editMyActivity.module.css';
import useEditMyActivities from '@/hooks/useEditMyActivity';
import useFetchMyActivity from '@/hooks/useFetchMyActivity';
import { useActivityStore } from '@/stores/useActivityStore';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ModalType2 from '@/components/modal/ModalType2';

export default function EditMyActivity() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { mutate: editMyActivity, isPending: editing } = useEditMyActivities(); // ✅ 여기로 옮기기
  const { resetActivity } = useActivityStore();
  const params = useParams () as {id : string};
  const activityId = Number(params.id);
  console.log('🆔 activityId:', activityId);
  const hasInitialized = useRef(false);
  const { data: activity } = useFetchMyActivity(activityId);
  console.log("📦 activity 전체 응답", activity);
  
  const queryClient = useQueryClient(); 


// 전역 상태 가져오기
const activities = useActivityStore.getState().activity;

// 콘솔로 출력
console.log("📸 서브 이미지 URLs:", activities.subImageUrls);
console.log("🧾 서브 이미지 개수:", activities.subImageUrls.length);

console.log("📁 파일로 업로드된 이미지들:", activities.subImageFiles);
console.log("🧮 파일 이미지 개수:", activities.subImageFiles.length);

console.log("➕ 서버에 보낼 subImageUrlsToAdd:", activities.subImageUrlsToAdd);


  const {
    activity: {
      title,
      category,
      description,
      address,
      price,
      bannerImageUrl,
      subImageIdsToRemove,
      scheduleIdsToRemove,
      schedulesToAdd,
      subImageUrlsToAdd
 
    },
    setActivity, // 
  } = useActivityStore();


  useEffect(() => {
    if (activity && !hasInitialized.current) {
      hasInitialized.current = true;
      resetActivity(); // 초기 상태로 완전 리셋
      console.log("초기화완료!")

      setActivity(() => ({
        title: activity.title,
        category: activity.category,
        description: activity.description,
        address: activity.address,
        price: activity.price,
        bannerImageUrl: activity.bannerImageUrl,
        subImageUrls: activity.subImages?.map((img) => ({
          id: img.id,
          imageUrl: img.imageUrl,
        })) || [],
        subImageIdsToRemove: [],
        subImageUrlsToAdd: [],
        schedules: activity.schedules?.map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })) || [],
        schedulesToAdd: [], 
      }));
    }
  }, [activity]); // eslint-disable-line react-hooks/exhaustive-deps


  console.log('🧩 activity:', activity);





  const handleSubmit = () => {
    const payload = {
      title,
      category,
      description,
      address,
      price,
      bannerImageUrl,
      subImageUrlsToAdd: subImageUrlsToAdd.filter(Boolean),
      subImageIdsToRemove: subImageIdsToRemove,
      scheduleIdsToRemove,
      schedulesToAdd,
    };
    

    
    editMyActivity({activityId, payload}, {
      onSuccess: () => {
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
