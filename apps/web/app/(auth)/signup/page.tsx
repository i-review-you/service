import React from 'react';

export default function page() {
  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">이메일</h3>
        {/* 이메일부분 */}
        <div className="flex items-center gap-2">
          <input className="w-40 px-3 py-2 border rounded-md" placeholder="이메일" />
          <span>@</span>
          <input className="w-40 px-3 py-2 border rounded-md" />
        </div>
      </div>
    </div>
  );
}
