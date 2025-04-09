'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/api';
import { ActivitiesArray } from '@/lib/types';
import Search from './landingComponents/Search';
import PopularActivities from './landingComponents/PopulorActivities';
import ActivitiesList from './landingComponents/ActivitiesList';
import Pagination from './landingComponents/Pagination';
import Category from './landingComponents/Category';
import styles from './landingComponents/LandingPage.module.css';

export default function Home() {
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>('latest');
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>(''); // 실제 검색에 사용되는 상태
  const [searchMode, setSearchMode] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

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

  // 인기 체험 데이터 가져오기
  const { data: popularActivities = [] } = useQuery<ActivitiesArray>({
    queryKey: ['popularActivities'],
    queryFn: async () => {
      const response = await axios.get('/activities', {
        params: {
          method: 'offset',
          page: 1,
          size: 40,
          sort: 'most_reviewed',
        },
      });
      return response.data.activities
        .sort(
          (a: { rating?: number }, b: { rating?: number }) =>
            (b.rating ?? 0) - (a.rating ?? 0),
        )
        .slice(0, 9);
    },
  });

  // 체험 리스트 데이터 가져오기
  const {
    data: activities = [],
    isLoading,
    error,
  } = useQuery<ActivitiesArray>({
    queryKey: [
      'activities',
      currentPage,
      size,
      selectedSort,
      selectedCategory,
      keyword,
    ],
    queryFn: async () => {
      const params: Record<string, string | number | null> = {
        method: 'offset',
        page: currentPage,
        size: size,
        sort: selectedSort,
      };

      if (selectedCategory) params['category'] = selectedCategory;
      if (keyword) params['keyword'] = keyword;

      const response = await axios.get('/activities', { params });
      setTotalCount(response.data.totalCount); // 총 데이터 수 저장
      return response.data.activities as ActivitiesArray;
    },
    placeholderData: [],
  });

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 클릭 시 필터링
  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setCurrentPage(1);
  };

  // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    setKeyword(inputValue);
    setSearchMode(inputValue !== '');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // 입력 필드 값 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Enter 키 입력 시 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 전체 페이지 수 계산 (올림 처리)
  const totalPages = Math.ceil(totalCount / size);

  return (
    <div className={styles.layout}>
      <div className={styles.imgContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text1}>
            함께 배우면 즐거운
            <br /> 스트릿 댄스
          </p>
          <p className={styles.text2}>1월의 인기체험 BEST</p>
        </div>

        <Search
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* 검색 모드일 때 or 아닐 때 */}
      {searchMode ? (
        <div className={styles.searchResult}>
          <h2 className={styles.title}>
            &quot;{keyword}&quot;
            <span>로 검색한 결과입니다.</span>
          </h2>
          <p className={styles.resultCount}>
            총 {(activities as ActivitiesArray).length}개의 결과
          </p>
        </div>
      ) : (
        <>
          <PopularActivities activities={popularActivities} />
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            onCategoryClick={handleCategoryClick}
            onSortChange={setSelectedSort}
            setPage={setCurrentPage}
          />
          <h2 className={styles.title}>
            {selectedCategory ? selectedCategory : '🛼 모든 체험'}
          </h2>
        </>
      )}

      <ActivitiesList
        activities={activities}
        isLoading={isLoading}
        error={error?.message || null}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={handlePageChange}
      />
    </div>
  );
}
