'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import Nav from '@/components/nav/Nav';

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const signHideLayout = pathname === '/signin' || pathname === '/signup';
  const mainHideLayout = pathname === '/';

  // QueryClient가 리렌더링될 때마다 새로 생성되지 않도록 useState 사용

  return (
    <QueryClientProvider client={queryClient}>
      {!signHideLayout && <Nav />}
      <div className={`${!signHideLayout && 'app'}`}>
        <div className={`${!mainHideLayout && 'layout'}`}>{children}</div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} /> {/* React Query DevTools */}
    </QueryClientProvider>
  );
}
