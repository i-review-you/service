import LogoSmall from '@/assets/logo-small.svg';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

import FloatingButton from '../../components/layout/FloatingButton';

export default async function ReviewsLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get('token')?.value;
  const me = await fetch(`${process.env.API_ORIGIN}/me`, { headers: { authorization: `Bearer ${token}` } }).then(res => res.json());

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
          />
        </Link>
        <Link href={`/users/${me.username}`}>
          <img className="size-10" src={me.avatarUrl} alt="" />
        </Link>
      </header>
      <main className="grow">{children}</main>
      <FloatingButton />
    </div>
  );
}
