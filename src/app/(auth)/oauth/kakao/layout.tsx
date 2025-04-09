'use client';

import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>;
}
