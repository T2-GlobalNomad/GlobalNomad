'use client';

import { useRef} from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import styles from './SubImage.module.css';
import { useActivityStore } from '@/stores/useActivityStore';
import useSubImageUrl from '@/hooks/query/useSubImageUrl';


export default function SubImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { activity, setActivity } = useActivityStore();
  const { mutate: uploadSubImage } = useSubImageUrl();

  const { subImageFiles, subImageUrls} = activity; 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/'),
    );

    const totalImages = activity.subImageUrls.length + activity.subImageFiles.length;

    if(totalImages >= 4){
      alert('이미지는 최대 4개 까지만 등록할수있습니다.');
      return;
    }

    const remainingSlots = 4 - totalImages;
    const filesToUpload = validFiles.slice(0, remainingSlots);

    filesToUpload.forEach((file)=>{
        const formData = new FormData();
        formData.append('image', file);

        uploadSubImage(file, {
          onSuccess: (url: string) => {
            console.log("서브이미지업로드성공:", url)
            setActivity((prev) => ({
              ...prev,
              subImageUrls: [...prev.subImageUrls, { id: Date.now(), imageUrl: url }],
              // subImageFiles: [...prev.subImageFiles, file],
              subImageUrlsToAdd: [...prev.subImageUrlsToAdd, url], // 이거도 잊지 말기
            }));
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
    if (index < subImageUrls.length) {
      // 서버에서 가져온 이미지 삭제
      setActivity({
        subImageUrls: subImageUrls.filter((_, i) => i !== index),
      });
    } else {
      // 로컬에서 추가한 이미지 삭제
      const fileIndex = index - subImageUrls.length;
      setActivity({
        subImageFiles: subImageFiles.filter((_, i) => i !== fileIndex),
      });
    }
  };

 

  const previewUrls = [
    ...subImageUrls.map((img) => img.imageUrl),
    ...subImageFiles.map((file) => URL.createObjectURL(file)),
  ];

 
  return(
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
          {previewUrls.map((img, index) => (
              <div key={index} className={styles.imageItem}>
                <div className={styles.imageWrapper}>
                  <Image
                   src={img}
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
