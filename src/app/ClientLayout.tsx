'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import Nav from '@/components/nav/Nav';
import Footer from '@/components/footer/Footer';

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const signHideLayout = pathname === '/signin' || pathname === '/signup';
  const mainHideLayout = pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      {!signHideLayout && <Nav />}
      <div className={`${!signHideLayout && 'app'}`}>
        <div className={`${!mainHideLayout && 'layout'}`}>{children}</div>
      </div>
      {!signHideLayout && <Footer />}
      <ReactQueryDevtools initialIsOpen={false} /> {/* React Query DevTools */}
    </QueryClientProvider>
  );
}
