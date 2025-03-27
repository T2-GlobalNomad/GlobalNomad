'use client';

import Image from 'next/image';
import styles from '@/components/modal/customModal.module.css';
import CustomButton from '@/components/CustomButton';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { Reservation } from '@/lib/types';
import StarRating from '../../../components/rating/StarRating';
import FormattedDate from '@/utils/formattedDate';

interface Props {
  isReviewData: Reservation | undefined;
  setShowModal: (value: boolean) => void;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
}

export default function WriteReviewModal({
  isReviewData,
  setShowModal,
  setShowToast,
}: Props) {
  const submitButton: React.CSSProperties = {
    width: '100%',
    height: '56px',
    fontWeight: '700',
    color: '#fff',
  };

  const [rating, setRating] = useState(1);
  const [isValue, setIsValue] = useState('');
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const { activity, date } = isReviewData ?? {};

  const handleWriteReview = () => {
    setShowModal(false);
  };

  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({ ...prev, [id]: '/images/no_thumbnail.png' }));
  };

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    setIsValue(value);
  };

  return (
    <>
      <div className={`${styles.contents} ${styles.review}`}>
        <div className={styles.head}>
          <p className={styles.title}>후기 작성</p>
          <Image
            className={styles.close}
            src='/images/close_modal.svg'
            width={40}
            height={40}
            alt='X'
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.thumbnail}>
            <Image
              src={
                imageSrcMap[activity?.id!] ||
                activity?.bannerImageUrl ||
                '/images/no_thumbnail.png'
              }
              alt='썸네일'
              fill
              sizes='100vw'
              style={{ objectFit: 'cover' }}
              priority
              onError={() => handleImageError(String(activity?.id))}
            />
          </div>
          <div className={styles.detail}>
            <div className={styles.top}>
              <p className={styles.title}>{activity?.title}</p>
              <p className={styles.date}>
                {FormattedDate(date!)}
                <span> · </span>
                {isReviewData?.startTime} - {isReviewData?.endTime}
                <span> · </span>
                {isReviewData?.headCount}명
              </p>
            </div>
            <p className={styles.bottom}>
              ₩{isReviewData?.totalPrice?.toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
        <StarRating totalStars={5} rating={rating} setRating={setRating} />
        <textarea
          className={styles.textarea}
          maxLength={300}
          placeholder='최대 글자수는 300자 입니다'
          onChange={handleValueChange}
        />
        <div className={styles.buttonContainer}>
          <CustomButton
            type='button'
            fontSize='sm'
            variant='black'
            style={submitButton}
            onClick={handleWriteReview}
            disabled={isValue === ''}
          >
            작성하기
          </CustomButton>
        </div>
      </div>
    </>
  );
}
