'use client';
import { useActionState } from 'react';
import { Button } from '@i-review-you/react-components';
import Input from '../../../components/ui/Input';

import { verifyEmail } from './actions';

export default function Form() {
  const [state, action, isPending] = useActionState(verifyEmail, null);

  return (
    <form className="grow w-full mt-8 flex flex-col justify-between" action={action}>
      <div className="px-3.5">
        <h1 className="text-[24px] font-bold">회원가입</h1>
        <div className="mt-9">
          <label className="font-bold">이메일</label>
          <Input
            name="email"
            inputMode="email"
            autoComplete="username"
            placeholder="이메일"
          />
        </div>
        <label className="mt-4 font-bold">비밀번호</label>
        <Input name="password" type="password" autoComplete="new-password" placeholder="비밀번호" />
      </div>
      <button
        type="submit"
        className="pt-4 block w-full text-center text-[20px] font-bold text-white bg-primary disabled:bg-gray-300"
        disabled={isPending}
        style={{
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        회원가입
      </button>
    </form>
  );
}
