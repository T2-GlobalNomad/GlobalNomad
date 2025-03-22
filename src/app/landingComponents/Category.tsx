'use client';

import React from 'react';
import Dropdown from '@/components/Dropdown';
import styles from './Category.module.css';

interface CategoryProps {
  categories: string[];
  selectedCategory: string | null;
  selectedSort: string | null;
  onCategoryClick: (category: string) => void;
  onSortChange: (value: string) => void;
}

export default function Category({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryClick,
  onSortChange,
}: CategoryProps) {
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
            className={`${styles.item} ${
              selectedCategory === category
                ? styles.selected
                : styles.deselected
            }`}
            onClick={() => onCategoryClick(category)}
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
}
