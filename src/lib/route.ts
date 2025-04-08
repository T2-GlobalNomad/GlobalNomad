// src/app/api/auth/sign-in/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { SignInData, SignInResponse } from '@/lib/auth-types';
import { signIn } from '@/lib/auth-api';

export async function POST(request: Request) {
  try {
    const body: SignInData = await request.json();

    const { accessToken, refreshToken } = await signIn(body);

    // cookies()를 await를 사용해 동기 객체로 받기
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // HTTPS 환경에서만 전송
      path: '/',
      maxAge: 60 * 60 * 4, // 예: 4시간 유효
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 예: 7일 유효
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || '로그인 실패' },
      { status: 401 },
    );
  }
}
