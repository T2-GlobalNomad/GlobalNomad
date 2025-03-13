'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/nav/Nav';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const signHideLayout = pathname === '/signin' || pathname === '/signup';
  const mainHideLayout = pathname === '/';

  return (
    <>
      {!signHideLayout && <Nav />}
      <div className={`${!signHideLayout && 'app'}`}>
        <div className={`${!mainHideLayout && 'layout'}`}>{children}</div>
      </div>
    </>
  );
}
