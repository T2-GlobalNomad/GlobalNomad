import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '다양한 체험들을 경험해보세요!',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Toaster position='bottom-center' />
    </div>
  );
}
