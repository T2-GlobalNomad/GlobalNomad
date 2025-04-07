'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import styles from './SubImage.module.css';
import { useActivityStore } from '@/stores/useActivityStore';
import useUploadImagesMutation from '@/hooks/query/useImageUrl';


export default function SubImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { activity, setActivity } = useActivityStore();
  const { mutate: uploadImages } = useUploadImagesMutation();
  const { subImageFiles, subImageUrls} = activity;

  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/'),
    );

    validFiles.forEach((file) => {
      // 파일 → 업로드
      const formData = new FormData();
      formData.append('image', file);

      uploadImages(formData, {
        onSuccess: (data: any) => {
          const newUrls = Array.isArray(data.subImages)
          ? data.subimages 
          : data.activityImageUrl 
          ? [data.activityImageUrl] 
          : [];


          setActivity({
            ...activity,
            subImageUrls: [...activity.subImageUrls, ...newUrls],
            subImageFiles: [...activity.subImageFiles, file],
          });
        },
        onError: () => {
          alert('서브 이미지 업로드 실패');
        },
      });
    });

    // 같은 파일 다시 업로드 가능하게 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';

    
  };

  const handleRemoveImage = (index: number) => {
    setActivity({
      subImageFiles: subImageFiles.filter((_, i) => i !== index),
      subImageUrls: activity.subImageUrls.filter((_, i) => i !== index),
    });
  };

  const previewUrls = subImageFiles.map((file) =>
    URL.createObjectURL(file)
  );

  return (
    <div>
      <p className={styles.title}>서브 이미지</p>
      <div className={styles.container}>
        {/* 업로드 버튼 */}
        <label htmlFor='subImageUpload' className={styles.uploadButton}>
          <Image
            src='/images/postImage.png'
            alt='upload'
            width={180}
            height={180}
            className={styles.buttonImg}
          />
          <div className={styles.buttonComponents}>
            <Plus strokeWidth={1} className={styles.plusSign} size={50} />
            <p className={styles.buttonText}>이미지 등록</p>
          </div>
        

        </label>
        {previewUrls.map((url, index) => (
            <div key={index} className={styles.imageItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={url}
                  alt={`sub-${index}`}
                  width={180}
                  height={180}
                  className={styles.previewImg}
                />
              </div>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveImage(index)}
              >
                <X className={styles.xIcon} size={16} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>

        {/* 이미지 프리뷰 */}
      <input
        ref={fileInputRef}
        type='file'
        id='subImageUpload'
        accept='image/*'
        multiple
        onChange={handleImageChange}
        className={styles.hiddenInput}
      />
      <p className={styles.imageAlert}>
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>
    </div>
  );
}
