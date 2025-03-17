'use client';

import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Dropdown.module.css';
import useClickOutside from '@/utils/useClickOutside';

type DropdownProps<T> = {
  options: T[];
  selected: T | null;
  onChange: (value: T) => void;
  dropdownClassName?: string;
  toggleClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
};

export default function Dropdown<T extends { id: number; title: string }>({
  options,
  selected,
  onChange,
  dropdownClassName = '',
  toggleClassName = '',
  menuClassName = '',
  menuItemClassName = '',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: dropdownRef, setter: setIsOpen });

  return (
    <div
      className={`${styles.dropdown} ${dropdownClassName}`.trim()}
      ref={dropdownRef}
    >
      <button
        className={[styles.toggleBtn, toggleClassName]
          .filter(Boolean)
          .join(' ')}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected?.title ?? '필터'}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <ul className={[styles.menu, menuClassName].filter(Boolean).join(' ')}>
          {options.map((option) => (
            <li
              key={option.id}
              className={[styles.menuItem, menuItemClassName]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
