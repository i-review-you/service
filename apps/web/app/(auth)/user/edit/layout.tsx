import React, { ReactNode } from 'react';
import Header from '../../../../components/layout/Header';

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main>{children}</main>
    </div>
  );
}
