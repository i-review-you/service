"use client";
import React, { useState } from "react";
import Image from "next/image";
import Plus from "@/assets/puls.svg";
import MappingCategories from "./_categories";

export interface CategoryProps {
  id: number;
  name: string;
}

export default function Page() {
  const [inputVisible, setInputVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handlePlusClick = () => {
    setInputVisible((prev) => !prev);
  };
  const handleInpputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleAddCategory = () => {
    console.log("추가 완료");
    setNewCategoryName("");
    setInputVisible(false);
  };
  return (
    <div>
      <button className="flex mt-1 mb-3 ml-auto" onClick={handlePlusClick}>
        <Image src={Plus} alt="plus" className="self-end" />
      </button>
      <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto p-4 border rounded-[10px]">
        <MappingCategories categories={CATEGORY_SORT} />
        {inputVisible && (
          <div className="relative flex w-full">
            <input
              type="text"
              onChange={handleInpputChange}
              className="w-full py-2 pl-2 pr-12 border-b focus-[#17B16B] focus:outline-none focus:border-[#17B16B]"
              placeholder="새로운 카테고리를 입력해주세요"
            />
            <button className="absolute text-gray-300 transform -translate-y-1/2 top-1/2 right-4 font-sm hover:text-black hover:font-bold">
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const CATEGORY_SORT: CategoryProps[] = [
  { id: 1, name: "카테고리명 1" },
  { id: 2, name: "카테고리명 2" },
  { id: 3, name: "카테고리명 3" },
  { id: 4, name: "카테고리명 4" },
  { id: 5, name: "카테고리명 5" },
  { id: 6, name: "카테고리명 6" },
];
