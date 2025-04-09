'use client';

import dynamic from 'next/dynamic';
import styles from '@/components/Input/Input.module.css';
import {
  components,
  OptionProps,
  SingleValue,
  StylesConfig,
  GroupBase,
} from 'react-select';
import Image from 'next/image';
import { useState } from 'react';

/**
 *  공용 SelectInput
 *
 *  react-select 라이브러리 사용
 * @example
 * <SelectInput />
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  onChange?: (value: string) => void;
  value?: string;
}

// SSR 문제 해결을 위해 클라이언트 전용으로 동적 임포트
const Select = dynamic(() => import('react-select'), { ssr: false });

const options: OptionType[] = [
  { value: '문화 · 예술', label: '문화 · 예술' },
  { value: '식음료', label: '식음료' },
  { value: '스포츠', label: '스포츠' },
  { value: '투어', label: '투어' },
  { value: '관광', label: '관광' },
  {value: '웰빙', label: '웰빙'}
];

const CustomSelect = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #79747E',
    borderRadius: '4px',
    padding: '7px 12px',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '8px 24px',
    borderRadius: '6px',
    backgroundColor: state.isFocused ? 'black' : 'white',
    color: state.isFocused ? 'white' : 'black',
  }),
} as StylesConfig<unknown, false, GroupBase<unknown>>;

const CustomOption = (
  props: OptionProps<unknown, false, GroupBase<unknown>>,
) => {
  return (
    <components.Option {...props}>
      {props.isSelected && (
        <Image
          src='/images/checkMark.svg'
          alt='선택됨'
          width={20}
          height={20}
          style={{ marginRight: 4 }}
        />
      )}
      {props.children}
    </components.Option>
  );
};

export default function SelectInput({ onChange }: SelectInputProps) {
  // 선택된 value값 저장, eslint설정으로 오류가 나오는데 나중에 쓸때 사라집니다.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setCurrentValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      <Select
        options={options}
        placeholder='카테고리'
        styles={CustomSelect}
        isClearable
        onChange={(newValue: unknown) => {
          const option = newValue as SingleValue<OptionType>;
          if (option) {
            handleSelect(option.value);
          } else {
            handleSelect('');
          }
        }}
        components={{ Option: CustomOption }}
        className={styles.selectInput}
      />
    </div>
  );
}
