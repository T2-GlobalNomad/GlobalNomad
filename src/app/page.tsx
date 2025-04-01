'use client';

import { useState, useEffect } from 'react';
import { ActivitiesArray } from '@/lib/types';
import axios from '@/lib/api';
import Search from './landingComponents/Search';
import PopularActivities from './landingComponents/PopulorActivities';
import ActivitiesList from './landingComponents/ActivitiesList';
import Pagination from './landingComponents/Pagination';
import Category from './landingComponents/Category';
// import Footer from '@/components/footer/Footer';
import styles from './landingComponents/LandingPage.module.css';

interface ActivitiesParams {
  method: string;
  page: number;
  size: number;
  sort: string | null;
  category?: string | null;
  keyword?: string | null;
}

export default function Home() {
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activities, setActivities] = useState<ActivitiesArray>([]);
  const [popularActivities, setPopularActivities] = useState<ActivitiesArray>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>(''); // 실제 검색에 사용되는 상태
  const [searchMode, setSearchMode] = useState(false);

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

  // 인기체험 API 호출
  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const response = await axios.get('/activities', {
          params: {
            method: 'offset',
            page: 1,
            size: 40,
            sort: 'most_reviewed',
          },
        });

        // 인기 체험 데이터를 평점 기준으로 내림차순 정렬 후 상위 9개만 선택
        const sortedActivities = response.data.activities
          .sort(
            (a: { rating?: number }, b: { rating?: number }) =>
              (b.rating ?? 0) - (a.rating ?? 0),
          )
          .slice(0, 9);

        setPopularActivities(sortedActivities);
      } catch (error) {
        console.error('인기 체험 데이터 가져오기 실패:', error);
      }
    };

    fetchPopularActivities();
  }, []);

  // 체험 리스트 API 호출
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

        if (keyword) {
          params['keyword'] = keyword; // 검색어 필터링 추가
        }

        const response = await axios.get('/activities', { params });

        setActivities(response.data.activities);
        setTotalPages(Math.ceil(response.data.totalCount / size)); // 전체 페이지 수 계산
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [size, currentPage, selectedSort, selectedCategory, keyword]);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 클릭 시 필터링
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    setKeyword(inputValue); // 검색어를 업데이트
    setSearchMode(inputValue !== ''); // 검색어가 비어있지 않으면 검색 모드 활성화
    setSelectedCategory(null); // 카테고리 필터 해제
    setCurrentPage(1); // 첫 페이지로 초기화
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
          <p className={styles.resultCount}>총 {activities.length}개의 결과</p>
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
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={handlePageChange}
      />

      {/* <Footer /> */}
    </>
  );
}
