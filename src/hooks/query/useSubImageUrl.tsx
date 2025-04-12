// import { useMutation } from '@tanstack/react-query';
// import instance from '@/lib/api copy';
// import { useActivityStore } from '@/stores/useActivityStore';

// const uploadSubImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('image', file);
//   const res = await instance.post('/activities/image', formData);
//   return res.data.activityImageUrl;
// };

// const useSubImageUrl = () => {
//   return useMutation({
//     mutationFn: uploadSubImage,
//     onError: (error) => {
//       console.error('서브 이미지 업로드 실패:', error);
//     },
//   });
// };

// export default useSubImageUrl;

// 'use client';

// import { useMutation } from '@tanstack/react-query';
// import instance from '@/lib/api copy';
// import { useActivityStore } from '@/stores/useActivityStore';

// // API 요청
// const uploadSubImage = async (
//   formData: FormData,    // eslint-disable-line @typescript-eslint/no-unused-vars
// ): Promise<{ subImageUrls: string[] }> => {
//   const { subImageFiles } =
//     useActivityStore.getState().activity;

//   const subImageUrls: string[] = [];


//   // 서브 이미지들 순차 업로드 (하나씩)
//   for (const file of subImageFiles) {
//     const formData = new FormData();
//     formData.append('image', file);

//     const res = await instance.post('/activities/image', formData);
//     const imageUrl = res.data.activityImageUrl;

//     subImageUrls.push(imageUrl);
//   }

//   //  전역 상태에 저장
//   useActivityStore.getState().setActivity({

//     subImageUrls,
//   });

//   return { subImageUrls };
// };

// // React Query 훅
// const useSubImageUrl = () => {
//   return useMutation({
//     mutationFn: uploadSubImage,
//     onSuccess: (data) => {
//       console.log('업로드 완료 서브이미지지:', data);
//     },
//     onError: (error) => {
//       console.error('이미지 업로드 실패:', error);
//     },
//   });
// };

// export default useSubImageUrl;

'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api copy';

// ✅ 한 파일만 업로드하고, URL 반환
const uploadSubImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await instance.post('/activities/image', formData);
  return res.data.activityImageUrl;
};

// ✅ useMutation 훅
const useSubImageUrl = () => {
  return useMutation({
    mutationFn: uploadSubImage,
    onError: (error) => {
      console.error('서브 이미지 업로드 실패:', error);
    },
  });
};

export default useSubImageUrl;

