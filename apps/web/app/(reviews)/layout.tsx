'use client';
import LogoSmall from '@/assets/logo-small.svg';

import React, { ReactNode } from 'react';
import FloatingButton from '../../components/layout/FloatingButton';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <header
        className="px-3.5 py-2 max-w-[768px] flex items-center justify-between bg-white border-b border-gray-200"
      >
        <Link href="/">
          <Image
            src={LogoSmall}
            alt="I Review U"
            width={131}
            height={100}
            objectFit="cover"
          />
        </Link>
        {!pathname.startsWith('/my-page') && (
          <Link href="/user">
            <UserCircleIcon className="size-10" />
          </Link>
        )}
      </header>
      <main>{children}</main>
      <FloatingButton />
    </div>
  );
}
