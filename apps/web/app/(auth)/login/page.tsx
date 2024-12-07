'use client';
import Logo from '@/assets/logo-small.svg';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@i-review-you/react-components';

import { login } from './actions';

export default function Page() {
  const [message, setMessage] = useState(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="px-8 flex flex-col justify-center flex-1 h-full gap-4">
      <Image src={Logo} alt="로고" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formElement = event.target as HTMLFormElement;
          const formData = new FormData(formElement);
          startTransition(async () => {
            const result = await login({
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            });
            console.log('gdgd', result);
            setMessage(result.message);
            (formElement.elements.namedItem('password') as HTMLInputElement).value = '';
          });
        }}
      >
        <input
          name="email"
          className="w-full px-3 py-3 border border-gray-100 rounded-[5px]"
          placeholder="이메일"
        />
        <input
          type="password"
          name="password"
          className="mt-2.5 w-full px-3 py-3 border border-gray-100 rounded-[5px]"
          placeholder="비밀번호"
        />
        {message && <p className="mt-3 text-[14px] text-red-500">{message}</p>}
        <Button
          type="submit"
          className="relative block w-full mt-12"
          scheme="secondary"
          disabled={isPending}
        >
          로그인
          {isPending && (
            <div className="absolute inset-0 bg-gray-100 rounded-[10px] flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                  strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </Button>
      </form>
      <div className="flex justify-between">
        <a>비밀번호 초기화</a>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}
