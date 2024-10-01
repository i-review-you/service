import React, { ReactNode } from 'react';
import Header from '../../components/layout/Header';
import FloatingButton from '../../components/layout/FloatingButton';

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main>{children}</main>
      <FloatingButton />
    </div>
  );
}
