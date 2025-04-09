import { z } from 'zod';

// 로그인 스키마
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.')
    .trim(),
  password: z
    .string()
    .min(1, '비밀번호는 필수 입력입니다.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .trim(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

// 회원가입 스키마
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일은 필수 입력입니다.')
      .email('이메일 형식으로 작성해 주세요.')
      .trim(),
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.')
      .regex(
        /^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/,
        '닉네임에는 특수문자를 포함할 수 없습니다.',
      )
      .trim(),
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .trim(),
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
