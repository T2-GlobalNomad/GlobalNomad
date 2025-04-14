import CustomButton from '@/components/CustomButton';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import styles from './KaKaoSignUpForm.module.css';
import { useKakaoSignUpMutation } from '@/hooks/mutation/useAuth';

type FormData = {
  nickname: string;
};

export default function KakaoSignUpForm({ code }: { code: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const kakaoSignUpMutation = useKakaoSignUpMutation();

  const onSubmit = async (data: FormData) => {
    kakaoSignUpMutation.mutate({ code, nickname: data.nickname });
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
