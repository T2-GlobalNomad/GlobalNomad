'use client';

import styles from './sliderArrows.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  onClick?: () => void;
}

export function SliderPrevArrow({ onClick }: SliderProps) {
  return (
    <div className={`${styles.arrow} ${styles.left}`} onClick={onClick}>
      <ChevronLeft size={24} color='#fff' />
    </div>
  );
}

export function SliderNextArrow({ onClick }: SliderProps) {
  return (
    <div className={`${styles.arrow} ${styles.right}`} onClick={onClick}>
      <ChevronRight size={24} color='#fff' />
    </div>
  );
}
