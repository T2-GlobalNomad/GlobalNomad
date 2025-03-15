'use client';

import PasswordInput from '@/components/Input/PasswordInput';
import styles from './SignUpForm.module.css';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import { signUp } from '@/lib/auth-api';
import { useRouter } from 'next/navigation';

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const password = watch('password');

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signUp(data);
      router.push('/signin');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div>
        <Input
          type='email'
          placeholder='이메일을 입력해 주세요'
          label='이메일'
          id='email'
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 양식이 틀렸어요',
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div>
        <Input
          type='text'
          placeholder='닉네임을 입력해 주세요'
          label='닉네임'
          id='nickname'
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            maxLength: {
              value: 10,
              message: '열 자 이하로 작성해주세요.',
            },
          })}
        />
        {errors.nickname && (
          <p className={styles.error}>{errors.nickname.message}</p>
        )}
      </div>
      <div>
        <PasswordInput
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: { value: 8, message: '8자 이상 입력하세요.' },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <div>
        <PasswordInput
          {...register('passwordConfirmation', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.passwordConfirmation && (
          <p className={styles.error}>{errors.passwordConfirmation.message}</p>
        )}
      </div>
      <CustomButton
        className={styles.btn}
        fontSize='md'
        type='submit'
        disabled={!isValid}
      >
        회원가입 하기
      </CustomButton>
    </form>
  );
}
