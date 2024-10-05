import React from 'react';
import Image from 'next/image';
import Plus from '@/assets/puls.svg';

export default function Page() {
  return (
    <div>
      <button className='flex mt-1 mb-3 ml-auto'>
        <Image src={Plus} alt='plus' className='self-end'/>
      </button>
         <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto p-4 border rounded-[10px]">
           {CATEGORY_SORT.map((category) => (
        <div key={category.id} className={`flex items-center justify-between py-2 ${category.id===CATEGORY_SORT.length ? "border-none" : "border-b border-b-gray-300"}`}>
          <p>{category.name}</p>
          <p className='text-gray-300'>{">"}</p>
        </div>
      ))}
    </div>
    </div>
  );
}


const CATEGORY_SORT = [
  { id: 1, name: '카테고리명 1' },
  { id: 2, name: '카테고리명 2' },
  { id: 3, name: '카테고리명 3' },
  { id: 4, name: '카테고리명 4' },
  { id: 5, name: '카테고리명 5' },
  { id: 6, name: '카테고리명 6' },
];
