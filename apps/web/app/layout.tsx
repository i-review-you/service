import './globals.css';

import React, { type ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'I-Reivew-U',
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
      </head>
      <body className="h-full">{children}</body>
      {/* <GoogleAnalytics gaId="필요함" /> */}
    </html>
  );
}
