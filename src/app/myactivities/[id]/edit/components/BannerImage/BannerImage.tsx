'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from 'lucide-react';
import styles from './postImage.module.css';
import Image from 'next/image';
import { useActivityStore } from '@/stores/useActivityStore';
import useBannerImageUrl from '@/hooks/query/useBannerImageUrl';
// import useUploadImagesMutation from '@/hooks/query/useImageUrl';
export default function BannerImage() {
  const { activity, setActivity } = useActivityStore();
  const { bannerImageFile, bannerImageUrl } = activity;

  const { mutate: uploadBanneImage } = useBannerImageUrl();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    // Zustand에 저장
    setActivity({ bannerImageFile: file });

    // 업로드 즉시 실행
    const formData = new FormData();
    formData.append('image', file);

    uploadBanneImage(formData, {
      onSuccess: (data: any) => {
        console.log('📦 서버 응답 전체:', data);
        setActivity({
          bannerImageUrl: data.bannerImageUrl,
        });
        console.log('✅ 업로드된 이미지 URL:', data.bannerImageUrl);
      },
      onError: () => {
        alert('이미지 업로드 실패');
      },
    });
  };

  const handleRemoveImage = () => {
    setActivity({ bannerImageFile: null, bannerImageUrl: '' });
  };

  const previewUrl = bannerImageFile
    ? URL.createObjectURL(bannerImageFile)
    : bannerImageUrl || null;

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
            <button className={styles.removeButton} onClick={handleRemoveImage}>
              <X className={styles.xIcon} strokeWidth={2} size={16} />
            </button>
          </div>
        )}
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
