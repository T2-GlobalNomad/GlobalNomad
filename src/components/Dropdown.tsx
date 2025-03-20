'use client';

import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Dropdown.module.css';
import useClickOutside from '@/utils/useClickOutside';

type DropdownProps<T extends { value: string | number; label: string }> = {
  options: T[];
  selectedValue: T['value'] | null;
  onChange: (value: T['value']) => void;
  dropdownClassName?: string;
  toggleClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
};

export default function Dropdown<
  T extends { value: string | number; label: string },
>({
  options,
  selectedValue,
  onChange,
  dropdownClassName = '',
  toggleClassName = '',
  menuClassName = '',
  menuItemClassName = '',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: dropdownRef, setter: setIsOpen });

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  return (
    <div
      className={`${styles.dropdown} ${dropdownClassName}`}
      ref={dropdownRef}
    >
      <button
        className={`${styles.toggleBtn} ${toggleClassName}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption?.label ?? '선택'}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <ul className={`${styles.menu} ${menuClassName}`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.menuItem} ${menuItemClassName}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
