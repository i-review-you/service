import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-8 flex flex-col items-center min-h-screen bg-white">
      {children}
    </div>
  );
}
