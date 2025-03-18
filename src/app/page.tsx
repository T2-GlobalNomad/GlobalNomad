'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/api';
import { ActivitiesArray } from '@/lib/types';
import PopularActivities from './landingComponents/PopulorActivities';
import ActivitiesList from './landingComponents/ActivitiesList';
import Dropdown from '@/components/Dropdown';
// import Footer from '@/components/footer/Footer';
import styles from './LandingPage.module.css';

export default function Home() {
  const [selectedSort, setSelectedSort] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [activities, setActivities] = useState<ActivitiesArray>([]);
  const [popularActivities, setPopularActivities] = useState<ActivitiesArray>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(8);

  const sortOptions = [
    { id: 1, title: '최신순' },
    { id: 2, title: '낮은가격순' },
    { id: 3, title: '높은가격순' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateSize = () => {
        if (window.innerWidth <= 450) {
          setSize(4);
        } else if (window.innerWidth <= 768) {
          setSize(9);
        } else {
          setSize(8);
        }
      };

      updateSize(); // 초기 실행
      window.addEventListener('resize', updateSize);

      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // 체험 리스트 API호출
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/activities', {
          params: { method: 'offset', page: 1, size: size },
        });

        setActivities(response.data.activities);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [size]); // size가 변경될 때만 API 호출

  // 인기체험 API호출
  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const response = await axios.get('/activities', {
          params: { method: 'offset', page: 1, size: 9 },
        });

        setPopularActivities(response.data.activities);
      } catch (error) {
        console.error('인기 체험 데이터 가져오기 실패:', error);
      }
    };

    fetchPopularActivities();
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

      {/* 인기 체험 */}
      <PopularActivities activities={popularActivities} />

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
          options={sortOptions}
          selected={selectedSort}
          onChange={setSelectedSort}
        />
      </div>

      {/* 활동 목록 */}
      <ActivitiesList
        activities={activities}
        isLoading={isLoading}
        error={error}
      />

      {/* <Footer /> */}
    </>
  );
}
