import React, { type ReactNode } from 'react';

export const metadata = {
  title: 'I-Reivew-U :: 회원가입',
  viewport: 'width=device-width, initial-scale=1.0',

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <main className="">{children}</main>
    </div>
  );
}
