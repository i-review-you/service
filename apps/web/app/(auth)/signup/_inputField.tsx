'use client';

import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Link from 'next/link';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  return (
    <div className="flex flex-col w-full gap-8 px-4 pt-16">
      <h1 className="text-2xl font-bold">회원가입</h1>
      {/* 이메일부분 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">이메일</h3>
        <div className="flex items-center gap-2">
          <Input type="text" required name="email" className="w-full px-3 py-2 border rounded-md" placeholder="이메일" />
          <span>@</span>
          <select
            name="emailDomain"
            required
            className="flex flex-col w-full px-3 py-2 border rounded-md"
          >
            <option value="">도메인 선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="hotmail.com">hotmail.com</option>
          </select>
        </div>
        <Button
          size="medium"
          label="이메일 인증"
        />
      </div>
      {/* 이메일 인증 코드 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">이메일 인증 코드</h3>
        <form className="flex items-center gap-2">
          <div className="relative w-full">
            <Input type="text" required name="emailCode" className="relative w-full py-2 pl-3 pr-12 border rounded-md" placeholder="이메일로 받은 인증코드를 입력해주세요" />
            <Button
              size="small"
              label="확인"
              className="absolute font-bold transform -translate-y-1/2 right-4 top-1/2"
            />
          </div>
        </form>
        <div className="flex gap-1 px-4 text-sm">
          <p className="font-extralight">이메일을 받지 못하셨나요?</p>
          <button>이메일 재전송하기</button>
        </div>
      </div>
      {/* 유저네임 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">유저네임</h3>
        <form className="flex items-center gap-2">
          <div className="relative w-full">
            <Input type="text" required name="username" className="relative w-full py-2 pl-3 pr-20 border rounded-md" placeholder="유저네임" />
            <Button
              size="small"
              label="중복체크"
              className="absolute font-bold transform -translate-y-1/2 right-4 top-1/2"
            />
          </div>
        </form>
      </div>
      {/* 비밀번호 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">비밀번호</h3>
        <form className="flex items-center gap-2">
          <div className="flex flex-col w-full gap-2 ">
            <Input type="password" required name="password" className="relative w-full px-3 py-2 border rounded-md" placeholder="비밀번호" />
            <Input type="password" required name="passwordCheck" className="relative w-full px-3 py-2 border rounded-md" placeholder="비밀번호 확인" />
          </div>
        </form>
      </div>

      {/* 회원가입 */}
      <Button
        size="medium"
        label="회원가입"
        scheme="secondary"
      />
      <div className="flex justify-between pb-6">
        <Link className="text-lg font-base" href="/reset/password">비밀번호 초기화</Link>
        <Link className="text-lg font-base" href="/login">로그인</Link>
      </div>
    </div>
  );
}
