import type { Metadata } from 'next';
import '@/styles/globals.css';
import ClientLayout from './ClientLayout';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '다양한 체험들을 경험해보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/images/logo_icon.svg' />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster position='bottom-center' />
      </body>
    </html>
  );
}
