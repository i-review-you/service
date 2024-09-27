import "./globals.css";

import React, { type ReactNode } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
      {/*<GoogleAnalytics gaId="필요함" />*/}
    </html>
  );
}
