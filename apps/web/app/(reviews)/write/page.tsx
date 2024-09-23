"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { createReviewAction } from "./action";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

type visibilityType = "private" | "followers";

function WriteVisibility() {
  const [visibility, setVisibility] = useState<visibilityType>("followers");

  return (
    <div className="flex gap-2 py-4 justify-center">
      <input name="visibility" type="text" hidden value={visibility} />
      <button
        type="button"
        onClick={() => setVisibility("followers")}
        className={`
          py-2 w-[150px] block bg-white text-center text-gray-500 border border-gary-200 rounded-[10px]
          ${visibility === "followers" && "bg-black text-white"}
        `}
      >
        공개
      </button>
      <button
        type="button"
        onClick={() => setVisibility("private")}
        className={`
          py-2 w-[150px] block bg-white text-center text-gray-500 border border-gary-200 rounded-[10px]
          ${visibility === "private" && "bg-black text-white"}
        `}
      >
        비공개
      </button>
    </div>
  );
}

function WriteRating() {
  const [starRating, setStarRating] = useState<number>(0);
  const MAX_RATING = 5;

  return (
    <div className="text-center pt-8">
      <h3 className="font-bold text-xl pb-2">만족스러우셨나요?</h3>
      <div className="relative inline-block">
        <input name="rating" hidden type="text" value={starRating} />
        <div className="flex">
          {Array.from({ length: MAX_RATING })
            .fill(0)
            .map((_, index) => (
              <OutlineStarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-6 text-main"
              />
            ))}
        </div>
        <div className="flex absolute top-0 left-0">
          {Array.from({ length: starRating })
            .fill(0)
            .map((_, index) => (
              <StarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-6 text-main"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const [state, formAction, isPending] = useFormState(createReviewAction, {});

  return (
    <form action={formAction}>
      <select
        name="category"
        className="w-full px-3 py-3 border border-gray-100 rounded-[5px] my-2"
      >
        <option value="전체">전체</option>
      </select>
      <input
        type="text"
        name="title"
        className="w-full px-3 py-3 border border-gray-100 rounded-[5px] my-2"
        placeholder="제목을 입력하세요"
      />
      <textarea
        name="content"
        className="w-full px-3 py-3 border border-gray-100 rounded-[5px] my-2"
        placeholder="리뷰를 작성해주세요"
      />
      <div>
        <input
          type="file"
          className="w-full px-3 py-3 border border-gray-100 rounded-[5px] my-2"
          placeholder="이미지 업로드"
        />
      </div>
      <input
        name="tag"
        type="text"
        className="w-full px-3 py-3 border border-gray-100 rounded-[5px] my-2"
        placeholder="태그"
      />
      <input
        name="link"
        type="text"
        className="w-full px-3 py-3 border border-gray-100 rounded-[5px]"
        placeholder="링크추가"
      />
      <WriteVisibility />
      <WriteRating />
      <button
        type="submit"
        disabled={isPending}
        className="text-center bg-black text-white font-bold w-full my-8 py-4 rounded-[5px]"
      >
        리뷰 작성
      </button>
    </form>
  );
}
