'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import styles from './postImage.module.css';
import Image from 'next/image';
import { useActivityStore } from '@/stores/useActivityStore';
import useUploadImagesMutation from '@/hooks/query/useImageUrl';

export default function BannerImage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const bannerImageFile = useActivityStore(
    (state) => state.activity.bannerImageFile,
  );
  const setActivity = useActivityStore((state) => state.setActivity);

  const { mutate: uploadImages } = useUploadImagesMutation();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    // Zustand에 저장
    setActivity({ bannerImageFile: file });

    // 업로드 즉시 실행
    const formData = new FormData();
    formData.append('image', file);

    uploadImages(formData, {
      onSuccess: (data: any) => {
        useActivityStore.getState().setActivity({
          bannerImageUrl: data.activityImageUrl,
        });
      },
      onError: () => {
        alert('이미지 업로드 실패');
      },
    });
  };

  const handleRemoveImage = () => {
    setActivity({ bannerImageFile: null, bannerImageUrl: '' });
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (bannerImageFile) {
      const objectUrl = URL.createObjectURL(bannerImageFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [bannerImageFile]);

  return (
    <div>
      <p className={styles.title}>배너 이미지</p>
      <div className={styles.container}>
        <label htmlFor='bannerImageUpload' className={styles.uploadButton}>
          <Image
            className={styles.buttonImg}
            src='/images/postImage.png'
            alt='postImageButton'
            width={180}
            height={180}
          />
          <div className={styles.buttonComponents}>
            <Plus strokeWidth={1} className={styles.plusSign} size={50} />
            <p className={styles.buttonText}>이미지 등록</p>
          </div>
        </label>

        <div className={styles.imagePreviewContainer}>
          {previewUrl && (
            <div className={styles.imageItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={previewUrl}
                  alt='BannerImage'
                  className={styles.previewImg}
                  width={180}
                  height={180}
                />
              </div>
              <button
                className={styles.removeButton}
                onClick={handleRemoveImage}
              >
                <X className={styles.xIcon} strokeWidth={2} size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        type='file'
        id='bannerImageUpload'
        accept='image/*'
        onChange={handleImageChange}
        className={styles.hiddenInput}
      />
    </div>
  );
}
