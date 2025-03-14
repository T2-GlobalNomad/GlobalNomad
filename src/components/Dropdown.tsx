  "use client";

  import { useState, useRef, useEffect, ReactNode } from "react";
  import { ChevronDown, ChevronUp } from "lucide-react"; // 리액트 아이콘(화살표)
  import styles from "./Dropdown.module.css";

  type DropdownProps<T> = {
    options: T[];
    selected: T | ReactNode;
    onChange: (value: T) => void;
    dropdownClassName?: string;
    toggleClassName?: string;
    menuClassName?: string;
    menuItemClassName?: string;
  };

  export default function Dropdown<T extends string | number>({
    options,
    selected,
    onChange,
    // 스타일 변경을 위한 props
    dropdownClassName,
    toggleClassName,
    menuClassName,
    menuItemClassName,
  }: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 바깥 클릭 시 닫기
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        className={`${styles.dropdown} ${dropdownClassName}`}
        ref={dropdownRef}
      >
        <button
          className={`${styles.toggleBtn} ${toggleClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          {/* 화살표 - 리액트아이콘 사용 */}
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <ul className={`${styles.menu} ${menuClassName}`}>
            {options.map((option) => (
              <li
                key={option.toString()}
                className={`${styles.menuItem} ${menuItemClassName}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
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
