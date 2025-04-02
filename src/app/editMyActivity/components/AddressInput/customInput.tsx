import styles from './Input.module.css';


interface InputProps {
  label?: string | undefined;
  labelSize?: string;
  id: string;
  type: string;
  placeholder: string;
  isErrored?: boolean;
  className?: string;
  name?: string;
  value?:string | number;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>)=>void);
}

/**
 * 공용 Input 컴포넌트
 *
 * @param {string} props.label - 입력 필드에 표시할 라벨 텍스트
 * @param {string} props.labelSize - 입력 필드에 표시할 라벨 텍스트가 큰 사이즈
 * @param {string} props.id - 입력필드 고유 식별자
 * @param {string} props.type - 입력필드의 타입
 * @param {string} props.placeholder - 넣고자하는 플레이스 홀더 입력
 *  @param {...object} props - 그 외 추가적으로 전달받는 모든 속성.
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
 *  labelSize="large"
 * />
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */

export default function Input({
  type = 'text',
  placeholder = '이메일을 입력하세요',
  label= undefined,
  labelSize = '',
  id = 'email',
  isErrored = false,
  name='', 
  onChange,
  value,
  className,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${
          labelSize === 'large' ? styles.largeLabel : ''
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.subContainer}>
        <input
          id={id}
          className={`${styles.input} ${isErrored ? styles.errorBorder : ''} ${className || ''}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          {...props}
        />
      </div>
    </div>
  );
}
