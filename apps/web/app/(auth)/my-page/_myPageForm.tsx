'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import Profile from '@/assets/default-profile.svg';
import Share from '@/assets/share.svg';
import Image from 'next/image';
import Lists from './_lists';

export default function MyPageForm() {
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      {/* 소개글 */}
      <div className="flex flex-col p-4 bg-white border rounded-[10px] gap-14">
        <div className="flex justify-between ">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold">User name</h2>
              <p className="text-sm text-gray-300">user@email.com</p>
            </div>
            <p>안녕하세요. 소개글 입니다.</p>
          </div>
          <Image src={Profile} alt="profile" width={64} height={64} />
        </div>
        <div className="flex items-center justify-center w-full gap-2 text-center">
          <Link href="/usr/edit" className="w-full px-4 py-2 text-sm font-semibold border rounded-md">프로필 수정</Link>
          <Link href="/usr/edit" className="w-full px-4 py-2 text-sm font-semibold border rounded-md">카테고리 관리</Link>
          <Image src={Share} alt="share" className="flex-1 w-full px-4 py-2 font-semibold border rounded-md" />

        </div>
      </div>
      {/* 내 리뷰만 보기 */}
      <div className="flex flex-col p-4 bg-white border rounded-[10px] gap-14">
        <div className="flex justify-between ">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-sm">내 리뷰만 보기</label>
          </div>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-3 text-sm"
          >
            {CATEGORY_SORT.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* mapping 해야할 부분 */}
      <Lists />
    </div>
  );
}

const CATEGORY_SORT = [
  { value: '', label: '카테고리' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];
