import React, { type ReactNode } from "react";

export const metadata = {
  title: "I-Reivew-U :: 카테고리관리",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-full">{children}</div>
    </div>
  );
}
