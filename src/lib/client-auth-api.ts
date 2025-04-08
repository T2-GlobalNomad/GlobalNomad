import type { SignInData } from './auth-types';

export async function signInViaServerRoute(
  data: SignInData,
): Promise<{ success: boolean }> {
  const res = await fetch(
    'https://sp-globalnomad-api.vercel.app/12-2/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  return res.json();
}
