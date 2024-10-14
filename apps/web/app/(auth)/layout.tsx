import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-full bg-white">
      {children}
    </div>
  );
}
