'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api copy';
import { useActivityStore } from '@/stores/useActivityStore';

// API 요청
const uploadActivityImages = async (
  formData: FormData,    // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<{ bannerImageUrl: string; subImageUrls: string[] }> => {
  const { bannerImageFile, subImageFiles } =
    useActivityStore.getState().activity;

  const subImageUrls: string[] = [];

  // 배너 이미지 업로드
  let bannerImageUrl = '';
  if (bannerImageFile) {
    const formData = new FormData();
    formData.append('image', bannerImageFile);

    const res = await instance.post('/activities/image', formData);

    bannerImageUrl = res.data.activityImageUrl;
  }

  // 서브 이미지들 순차 업로드 (하나씩)
  for (const file of subImageFiles) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await instance.post('/activities/image', formData);
    const imageUrl = res.data.activityImageUrl;

    subImageUrls.push(imageUrl);
  }

  //  전역 상태에 저장
  useActivityStore.getState().setActivity({
    bannerImageUrl,
    subImageUrls: subImageUrls.map((url, idx) => ({
      id: Date.now() + idx, // 임시 ID 생성
      imageUrl: url,
    })),
  });

  return { bannerImageUrl, subImageUrls };
};

// React Query 훅
const useUploadImagesMutation = () => {
  return useMutation({
    mutationFn: uploadActivityImages,
    onSuccess: (data) => {
      console.log('업로드 완료 통합합:', data);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};

export default useUploadImagesMutation;
