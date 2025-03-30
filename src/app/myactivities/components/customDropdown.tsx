'use client';

import { useRef, useEffect } from 'react';
import styles from '@/components/Dropdown.module.css';

type DropdownProps<T> = {
  options: T[];
  onChange: (value: T) => void;
  dropdownClassName?: string;
  toggleClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  isOpen: boolean;
  setIsOpen: () => void;
};

export default function CustomDropdown<T extends string | number>({
  options,
  onChange,
  isOpen,
  setIsOpen,
  // 스타일 변경을 위한 props
  dropdownClassName,
  menuClassName,
  menuItemClassName,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div
      className={`${styles.dropdown} ${dropdownClassName}`}
      ref={dropdownRef}
    >
      {isOpen && (
        <ul className={`${styles.menu} ${menuClassName}`}>
          {options.map((option) => (
            <li
              key={option.toString()}
              className={`${styles.menuItem} ${menuItemClassName}`}
              onClick={() => {
                onChange(option);
                setIsOpen();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
