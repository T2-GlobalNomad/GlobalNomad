'use client';

import Image from 'next/image';
import styles from '@/components/modal/customModal.module.css';
import CustomButton from '@/components/CustomButton';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { Reservation } from '@/lib/types';
import StarRating from '../../../components/rating/StarRating';
import { formattedDate } from '@/utils/formattedDate';
import useUpdateReview from '@/hooks/mutation/useUpdateReview';

interface Props {
  reservationId: number | undefined;
  isReviewData: Reservation | undefined;
  setShowModal: (value: boolean) => void;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
}

export default function WriteReviewModal({
  reservationId,
  isReviewData,
  setShowModal,
  setShowToast,
}: Props) {
  const [rating, setRating] = useState(1);
  const [isValue, setIsValue] = useState('');
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const { activity, date } = isReviewData ?? {};

  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({ ...prev, [id]: '/images/no_thumbnail.png' }));
  };

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setIsValue(value);
  };

  const { mutate: writeReview } = useUpdateReview(setShowToast);

  function handleWriteReview() {
    setShowModal(false);

    if (reservationId) {
      try {
        writeReview({ id: reservationId, rating, isValue });
      } catch (error) {
        console.error(error);
      }
    }
  }

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
                (activity?.id && imageSrcMap[activity?.id]) ||
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
                <span>{formattedDate(date!)}</span>
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
            style={{ width: '100%', padding: '15px 0' }}
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
