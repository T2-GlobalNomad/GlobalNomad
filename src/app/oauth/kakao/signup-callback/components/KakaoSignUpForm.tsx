import CustomButton from '@/components/CustomButton';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import styles from './KaKaoSignUpForm.module.css';
import { kakaoSignUp } from '@/lib/auth-api';

type KakaoSignUpFormProps = {
  code: string;
  redirectUri: string;
};

type FormData = {
  nickname: string;
};

export default function KakaoSignUpForm({ code }: KakaoSignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await kakaoSignUp(code, data.nickname);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('회원가입 실패 상세:', errorData);
        return;
      }
      const result = await response.json();
      console.log('회원가입 성공:', result);
    } catch (error) {
      console.error('회원가입 API 호출 에러:', error);
    }
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label='닉네임'
          placeholder='닉네임을 입력해주세요'
          id='nickname'
          isErrored={!!errors.nickname}
          {...register('nickname', { required: '닉네임은 필수입니다.' })}
        />
        {errors.nickname && (
          <p className={styles.error}>{errors.nickname.message}</p>
        )}
      </div>
      <CustomButton type='submit' className={styles.btn} disabled={!isValid}>
        회원가입 완료
      </CustomButton>
    </form>
  );
}
