import React, { useState } from 'react';
import Image from 'next/image';
import Good from '@/assets/good.svg';
import LinkImage from '@/assets/link.svg';
import Share from '@/assets/share.svg';
import Profile from '@/assets/default-profile.svg';
import EmptyStar from '@/assets/star.svg';
import FilledStar from '@/assets/filledStar.svg';

export default function Lists() {
  // 데이터 받아와야할부분
  const [rating, setRating] = useState(0);
  return (
    <div>
      {/* 게시글 보이는 곳 */}
      <div className="flex flex-col p-4 bg-white border rounded-[10px] gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex w-full gap-2">
              <Image src={Profile} alt="profile" />
              <h2 className="text-sm">User name</h2>
            </div>
          </div>
          <div className="flex">
            {Array(5).fill(0).map((_, index) => (
              <Image
                src={index < rating ? FilledStar : EmptyStar}
                alt="star"
                width={24} // 이미지 크기
                height={24}
                onClick={() => setRating(index + 1)}
                key={index}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        {/* 사진 케러셀 */}
        <div className="flex gap-1">
          <div className="w-24 h-24 bg-slate-400 shrink-0"></div>
          <div className="w-24 h-24 bg-slate-400 shrink-0"></div>
          <div className="w-24 h-24 bg-slate-400"></div>
        </div>
        {/* 리뷰제목 & 게시날짜 */}
        <div className="flex justify-between w-full">
          <h2 className="font-bold">리뷰 제목</h2>
          <p className="font-light">2024.00.00</p>
        </div>
        {/* 리뷰 내용 */}
        <div>
          <p>리뷰 내용이 노출되는 곳입니다...</p>
        </div>
        <div className="flex gap-1 mt-12">
          <p className="text-sm text-[#17B16B]">#태그</p>
          <p className="text-sm text-[#17B16B]">#태그</p>
          <p className="text-sm text-[#17B16B]">#태그</p>
          <p className="text-sm text-[#17B16B]">#태그</p>
        </div>
        <div className="flex items-center justify-between w-full gap-2 text-center">
          {/* 도움돼요 */}
          <div className="flex gap-1 text-sm text-gray-500">
            <Image src={ACTIONS[0].src} alt={ACTIONS[0].src} />
            <p>{ACTIONS[0].text}</p>
            <span>{ACTIONS[0].count}</span>
          </div>
          {/* 링크와 공유 */}
          <div className="flex gap-4 text-sm">
            {ACTIONS.slice(1).map((action, index) => (
              <div key={index} className="flex gap-1">
                <Image src={action.src} alt={action.src} />
                <p>{action.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ACTIONS = [
  { src: Good, text: '도움돼요', count: 20 },
  { src: LinkImage, text: '링크' },
  { src: Share, text: '공유' },
];
