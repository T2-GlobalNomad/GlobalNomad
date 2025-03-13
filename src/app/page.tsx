'use client';

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';
// import Footer from '@/components/footer/Footer';
import styles from './LandingPage.module.css';

export default function Home() {
  const [selectedSort, setSelectedSort] = useState('최신순');

  return (
    <>
      <div className={styles.imgContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            함께 배우면 즐거운
            <br /> 스트릿 댄스
          </p>
          <p>1월의 인기체험 BEST</p>
        </div>
      </div>

      {/* main영역 */}
      <div className={styles.mainContainer}>
        <Dropdown
          options={['최신순', '낮은가격순', '높은가격순']}
          selected={selectedSort}
          onChange={setSelectedSort}
        />
      </div>
      {/* <Footer /> */}
    </>
  );
}
