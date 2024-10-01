import './globals.css';

import React, { type ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
      {/* <GoogleAnalytics gaId="필요함" /> */}
    </html>
  );
}
