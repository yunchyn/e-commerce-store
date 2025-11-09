import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/store/SessionProvider';

export const metadata: Metadata = {
  title: '반응형 이커머스 스토어',
  description: '반응형 이커머스 스토어 포트폴리오 사이트 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
