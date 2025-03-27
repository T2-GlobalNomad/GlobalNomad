import { useState } from 'react';
import styles from './rating.module.css';

export default function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(1);

  return (
    <div className={styles.starContainer}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            onClick={() => setRating(starValue)}
            className={`${styles.star} ${
              starValue <= rating ? styles.filled : styles.empty
            }`}
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
          </svg>
        );
      })}
    </div>
  );
}
