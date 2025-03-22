'use client';

import React from 'react';
import Dropdown from '@/components/Dropdown';
import styles from './Category.module.css';

// 카테고리 및 정렬 옵션을 관리하는 컴포넌트
interface CategoryProps {
  categories: string[];
  selectedCategory: string | null;
  selectedSort: string | null;
  onCategoryClick: (category: string) => void;
  onSortChange: (value: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryClick,
  onSortChange,
}) => {
  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'most_reviewed', label: '리뷰많은순' },
    { value: 'price_asc', label: '낮은가격순' },
    { value: 'price_desc', label: '높은가격순' },
  ];

  return (
    <div className={styles.categoryContainer}>
      <ul className={styles.category}>
        {categories.map((category) => (
          <li
            key={category}
            className={styles.item}
            onClick={() => onCategoryClick(category)}
            style={{
              color:
                selectedCategory === category ? 'var(--white)' : 'var(--green)',
              backgroundColor:
                selectedCategory === category ? 'var(--green)' : 'var(--white)',
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
        onChange={onSortChange}
      />
    </div>
  );
};

export default Category;
