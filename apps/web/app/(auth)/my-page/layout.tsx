import React, { type ReactNode } from 'react';
import Header from '../../../components/layout/Header';

export const metadata = {
  title: 'I-Reivew-U :: 마이페이지',
  viewport: 'width=device-width, initial-scale=1.0',

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <Header />
      <main className="h-full p-4 pt-40 bg-gray-100">{children}</main>
    </div>
  );
}
