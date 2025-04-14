'use client';

import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <motion.div
      className={styles.spinnerContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.spinner} />
      <p>로딩 중...</p>
    </motion.div>
  );
}
