import React, { SetStateAction, useState } from 'react';
import styles from './rating.module.css';

interface Props {
  totalStars: number;
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
}

export default function StarRating({ totalStars, rating, setRating }: Props) {
  const [isInteracting, setIsInteracting] = useState(false);

  const handleSetRating = (index: number) => {
    setRating(index + 1);
  };

  const handleMouseDown = (index: number) => {
    setIsInteracting(true);
    handleSetRating(index);
  };

  const handleMouseMove = (index: number) => {
    if (isInteracting) handleSetRating(index);
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setIsInteracting(true);
    handleTouchMove(event);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isInteracting) return;

    const touchX = event.touches[0].clientX;
    const starElements = document.querySelectorAll(`.${styles.star}`);
    starElements.forEach((star, index) => {
      const { left, right } = star.getBoundingClientRect();
      if (touchX >= left && touchX <= right) {
        handleSetRating(index);
      }
    });
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  return (
    <div
      className={styles.starContainer}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            onMouseDown={() => handleMouseDown(index)}
            onMouseMove={() => handleMouseMove(index)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
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
