import Logo from './logo-small.svg';

import React from "react";
import Image from "next/image";
import { login } from './actions';

export default function Page() {
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <Image src={Logo} alt="로고" />
      <form action={login}>
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
        <button
          type="submit"
          className="mt-12 py-4 block w-full bg-gray-900 text-[20px] text-white text-center font-bold rounded-[10px]"
        >
          로그인
        </button>
      </form>
      <div className="flex justify-between">
        <a>비밀번호 초기화</a>
        <a>회원가입</a>
      </div>
    </div>
  );
}
