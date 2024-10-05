import React from 'react';
import Header from '../../../components/layout/Header';
import DynamicMyPage from './ClientMyPage';

export const metadata = {
  title: 'I-Reivew-U :: 마이페이지',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <Header />
      <DynamicMyPage>{children}</DynamicMyPage>
    </div>
  );
}
