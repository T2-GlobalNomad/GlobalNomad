import { ComponentProps } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  labelSize?: boolean;
  isErrored?: boolean;
  className?: string;
  labelClassName?: string;
}

/**
 * 공용 Input 컴포넌트
 *
 * @param {string} props.label - 입력 필드에 표시할 라벨 텍스트.
 * @param {boolean} props.labelSize - 입력 필드에 표시할 라벨 텍스트가 큰 사이즈.
 * @param {boolean} props.isErrored - 리액트 훅 품으로 사용할때 넘겨주면 border에 에러스타일 적용.
 * @param {string} props.className - input태그 스타일
 * @param {string} props.labelClassName - label태그 스타일
 * @param {...object} props - 그 외 추가적으로 전달받는 모든 속성.
 *
 * @example
 * // 기본
 * <Input
 *   id="email"
 *   type="text"
 *   placeholder="이메일을 입력해주세요"
 *   label="이메일"
 * />
 *
 * @example
 * // 라벨사이즈가 큰 경우
 * <Input
 *  id="email"
 *  type="text"
 *  placeholder="이메일을 입력해주세요"
 *  label="이메일"
 *  labelSize={true}
 * />
 *
 * @example
 * // react hook form 사용시 적용 예제
 * <Input
 *   type='email'
 *   placeholder='이메일을 입력해 주세요'
 *   label='이메일'
 *   id='email'
 *   isErrored={!!errors.email}
 *     ...register('email', {
 *     required: '이메일은 필수 입력입니다.',
 *     pattern: {
 *       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
 *       message: '이메일 양식이 틀렸어요',
 *     },
 *   })}
 * />
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */

export default function Input({
  type = 'text',
  placeholder = '이메일을 입력하세요',
  label = '이메일',
  labelSize = false,
  id = 'email',
  isErrored = false,
  className,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${
          labelSize === true ? styles.largeLabel : ''
        } ${labelClassName ?? ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.subContainer}>
        <input
          id={id}
          className={`${styles.input} ${isErrored ? styles.errorBorder : ''} ${
            className ?? ''
          }`}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
