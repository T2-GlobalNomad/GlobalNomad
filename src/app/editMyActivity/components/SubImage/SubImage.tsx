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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
          setActivity({
            subImageUrls: [...activity.subImageUrls, data.activityImageUrl],
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

  useEffect(() => {
    const objectUrls = activity.subImageFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [activity.subImageFiles]);

  const handleRemoveImage = (index: number) => {
    setActivity({
      subImageUrls: activity.subImageUrls.filter((_, i) => i !== index),
    });
  };

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

        {/* 이미지 프리뷰 */}
        <div className={styles.imagePreviewContainer}>
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
      </div>

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
