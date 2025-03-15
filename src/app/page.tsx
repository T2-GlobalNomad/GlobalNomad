'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/api';
import { ActivitiesArray } from '@/lib/types';
import ActivitiesList from './landingComponents/ActivitiesList';
import Dropdown from '@/components/Dropdown';
// import Footer from '@/components/footer/Footer';
import styles from './LandingPage.module.css';

export default function Home() {
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [activities, setActivities] = useState<ActivitiesArray>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/activities', {
          params: {
            method: 'offset',
            page: 1,
            size: 8,
          },
        });
        setActivities(response.data.activities);
        setIsLoading(false);
      } catch {
        setError('데이터를 가져오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <>
      <div className={styles.imgContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text1}>
            함께 배우면 즐거운
            <br /> 스트릿 댄스
          </p>
          <p className={styles.text2}>1월의 인기체험 BEST</p>
        </div>
      </div>

      {/* 카테고리 영역 */}
      <div className={styles.categoryContainer}>
        <ul className={styles.category}>
          <li className={styles.item}>문화•예술</li>
          <li className={styles.item}>식음료</li>
          <li className={styles.item}>스포츠</li>
          <li className={styles.item}>투어</li>
          <li className={styles.item}>관광</li>
          <li className={styles.item}>웰빙</li>
        </ul>

        <Dropdown
          options={['최신순', '낮은가격순', '높은가격순']}
          selected={selectedSort}
          onChange={setSelectedSort}
        />
      </div>

      {/* 활동 목록 영역 */}
      <ActivitiesList
        activities={activities}
        isLoading={isLoading}
        error={error}
      />
      {/* <Footer /> */}
    </>
  );
}
