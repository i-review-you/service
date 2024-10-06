'use client';

import { usePathname } from "next/navigation";

export default function DynamicMyPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const backgroundClass = pathname?.startsWith('/my-page/category') ? '' : 'pt-40 bg-gray-100';

  return <main className={`h-full p-4 ${backgroundClass}`}>{children}</main>;
}
