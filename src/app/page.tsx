'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/api';
import { ActivitiesArray } from '@/lib/types';
import PopularActivities from './landingComponents/PopulorActivities';
import ActivitiesList from './landingComponents/ActivitiesList';
import Dropdown from '@/components/Dropdown';
import Pagination from './landingComponents/Pagination';
import styles from './landingComponents/LandingPage.module.css';

// params 타입 정의
interface ActivitiesParams {
  method: string;
  page: number;
  size: number;
  sort: string | null;
  category?: string | null;
}

export default function Home() {
  const [selectedSort, setSelectedSort] = useState<string | null>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivitiesArray>([]); // ActivitiesArray 타입을 사용
  const [popularActivities, setPopularActivities] = useState<ActivitiesArray>(
    [],
  ); // ActivitiesArray 타입을 사용
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'most_reviewed', label: '리뷰많은순' },
    { value: 'price_asc', label: '낮은가격순' },
    { value: 'price_desc', label: '높은가격순' },
  ];

  const categories = [
    '문화 · 예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
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
      setIsLoading(true);
      try {
        const params: ActivitiesParams = {
          method: 'offset',
          page: currentPage,
          size: size,
          sort: selectedSort,
        };

        if (selectedCategory) {
          params['category'] = selectedCategory; // 카테고리 필터링 추가
        }

        const response = await axios.get('/activities', { params });

        setActivities(response.data.activities); // ActivitiesArray 타입으로 받음
        setTotalPages(Math.ceil(response.data.totalCount / size)); // 전체 페이지 수 계산
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [size, currentPage, selectedSort, selectedCategory]);

  // 인기체험 API호출
  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const response = await axios.get('/activities', {
          params: { method: 'offset', page: 1, size: 9 },
        });

        setPopularActivities(response.data.activities); // ActivitiesArray 타입으로 받음
      } catch (error) {
        console.error('인기 체험 데이터 가져오기 실패:', error);
      }
    };

    fetchPopularActivities();
  }, []);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 클릭 시 필터링
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // 같은 카테고리 클릭 시 필터링 해제
    } else {
      setSelectedCategory(category); // 카테고리 선택 시 필터링
    }
  };

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
          {categories.map((category) => (
            <li
              key={category}
              className={styles.item}
              onClick={() => handleCategoryClick(category)}
              style={{
                color:
                  selectedCategory === category
                    ? 'var(--white)'
                    : 'var(--green)',
                backgroundColor:
                  selectedCategory === category
                    ? 'var(--green)'
                    : 'var(--white)',
                cursor: 'pointer',
              }}
            >
              {category}
            </li>
          ))}
        </ul>
        <Dropdown
          options={sortOptions}
          selectedValue={selectedSort}
          onChange={setSelectedSort}
        />
      </div>
      {/* 선택된 카테고리에 따른 타이틀 변경 */}
      <h2 className={styles.title}>
        {selectedCategory ? selectedCategory : '🛼 모든 체험'}
      </h2>

      {/* 체험 리스트 */}
      <ActivitiesList
        activities={activities}
        isLoading={isLoading}
        error={error}
      />
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={handlePageChange}
      />
    </>
  );
}
