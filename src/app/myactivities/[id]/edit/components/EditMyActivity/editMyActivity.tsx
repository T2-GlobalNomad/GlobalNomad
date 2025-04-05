'use client';

import CustomButton from '@/components/CustomButton';
import styles from './editMyActivity.module.css';
import useEditMyActivities from '@/hooks/useEditMyActivity';
import useFetchMyActivity from '@/hooks/useFetchMyActivity';
import { useActivityStore } from '@/stores/useActivityStore';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function EditMyActivity() {
  const router = useRouter();
  const { mutate: editMyActivity, isPending: editing } = useEditMyActivities(); // ✅ 여기로 옮기기
  const params = useParams () as {id : string};
  const activityId = Number(params.id);
  console.log('🆔 activityId:', activityId);
  const { data: activity, isLoading } = useFetchMyActivity(activityId);
  console.log("📦 activity 전체 응답", activity);
  const queryClient = useQueryClient(); 
  const status = 'ongoing'; 

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
      console.log("✅ schedules from API:", activity.schedules);
  
      setActivity({
        title: activity.title,
        category: activity.category,
        description: activity.description,
        address: activity.address,
        price: activity.price,
        bannerImageUrl: activity.bannerImageUrl,
        subImageUrls: activity.subImages?.map((img) => img.imageUrl) || [],
        schedules: activity.schedules?.map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })) || [],
      });
    }
  }, [activity]);
  console.log('🧩 activity:', activity);
  console.log('🎯 activity.schedule:', activity?.schedules);




  const handleSubmit = () => {
  const payload = {
    title: title || '제목 없음',
    category: category || '기타',
    description: description || '',
    address: address || '',
    price: price ?? 0,
    bannerImageUrl: bannerImageUrl || '',
    subImageUrlsToAdd: subImageUrls?.filter(Boolean) || [],
    subImageIdsToRemove: subImageIdsToRemove || [],
    scheduleIdsToRemove: scheduleIdsToRemove || [],
    schedulesToAdd: schedulesToAdd || [],
  };

    editMyActivity({activityId, payload}, {
      onSuccess: (data) => {
        console.log('🎯 최종 서버 응답 확인:', data.bannerImageUrl);
        queryClient.invalidateQueries({ queryKey: ['myActivities', status] });
        alert('수정 성공!');
        router.push('/myactivities');
      },
      onError: () => {
        alert('수정 실패!');
      },
    });
    console.log('🔥 payload 확인:', payload);

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
    </div>
  );
};
