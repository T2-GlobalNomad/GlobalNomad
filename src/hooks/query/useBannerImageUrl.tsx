// import { useMutation } from '@tanstack/react-query';
// import instance from '@/lib/api copy';
// import { useActivityStore } from '@/stores/useActivityStore';

// const uploadBannerImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('image', file);
//   const res = await instance.post('/activities/image', formData);
//   return res.data.activityImageUrl;
// };

// const useBannerImageUrl = () => {
//   return useMutation({
//     mutationFn: uploadBannerImage,
//     onSuccess: (url) => {
//       useActivityStore.getState().setActivity((prev) => ({
//         ...prev,
//         bannerImageUrl: url,
//       }));
//     },
//     onError: (error) => {
//       console.error('배너 이미지 업로드 실패:', error);
//     },
//   });
// };

// export default useBannerImageUrl;


'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api copy';
import { useActivityStore } from '@/stores/useActivityStore';

// API 요청
const uploadBannerImage = async (
  formData: FormData,    // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<{ bannerImageUrl: string;}> => {
  const { bannerImageFile } =
    useActivityStore.getState().activity;



  // 배너 이미지 업로드
  let bannerImageUrl = '';
  if (bannerImageFile) {
    const formData = new FormData();
    formData.append('image', bannerImageFile);

    const res = await instance.post('/activities/image', formData);

    bannerImageUrl = res.data.activityImageUrl;
  }


  //  전역 상태에 저장
  useActivityStore.getState().setActivity({
    bannerImageUrl,
  });

  return { bannerImageUrl };
};

// React Query 훅
const useBannerImageUrl = () => {
  return useMutation({
    mutationFn: uploadBannerImage,
    onSuccess: (data) => {
      console.log('업로드 완료 배너이미지지:', data);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};

export default useBannerImageUrl;
