'use client';

import PasswordInput from '@/components/Input/PasswordInput';
import styles from './SignUpForm.module.css';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signUpSchema,
  type SignUpFormValues,
} from '@/lib/schemas/auth-schemas';
import { useSignUpMutation } from '@/hooks/mutation/useAuth';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });
  const signUpMutation = useSignUpMutation();

  const onSubmit = async (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div>
        <Input
          type='email'
          placeholder='이메일을 입력해 주세요'
          label='이메일'
          id='email'
          isErrored={!!errors.email}
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div>
        <Input
          type='text'
          placeholder='닉네임을 입력해 주세요'
          label='닉네임'
          id='nickname'
          isErrored={!!errors.nickname}
          {...register('nickname')}
        />
        {errors.nickname && (
          <p className={styles.error}>{errors.nickname.message}</p>
        )}
      </div>
      <div>
        <PasswordInput
          isErrored={!!errors.password}
          label='비밀번호'
          id='password'
          {...register('password')}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <div>
        <PasswordInput
          isErrored={!!errors.passwordConfirmation}
          label='비밀번호 확인'
          id='passwordConfirmation'
          {...register('passwordConfirmation')}
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
