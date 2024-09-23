"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewFilter() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const [showMyReview, setShowMyReview] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const updateQueryParams = (updatedParams: { [key: string]: any }) => {
    const newParams = new URLSearchParams(currentSearchParams as any);

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "전체") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    const queryString = newParams.toString();
    router.push(queryString ? `/reviews?${queryString}` : "/reviews");
  };

  const onChangeMyReview = () => {
    const newShowMyReview = !showMyReview;
    setShowMyReview(newShowMyReview);
    updateQueryParams({ myReview: newShowMyReview ? "true" : undefined });
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    updateQueryParams({ category: selectedValue });
  };

  useEffect(() => {
    setShowMyReview(Boolean(currentSearchParams.get("myReview")));
    setSelectedCategory(currentSearchParams.get("category") || "전체");
  }, [currentSearchParams]);

  return (
    <div className="flex justify-between cursor-pointer rounded-lg border border-gay-200 p-4 mb-4">
      <label htmlFor="showMyReviews" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showMyReviews"
          name="showMyReviews"
          checked={showMyReview}
          onChange={onChangeMyReview}
          className="h-5 w-5"
        />
        <span>내 리뷰만 보기</span>
      </label>
      <div>
        <select value={selectedCategory} onChange={onChangeCategory}>
          <option>전체</option>
          <option>카테고리1</option>
          <option>카테고리2</option>
          <option>카테고리3</option>
        </select>
      </div>
    </div>
  );
}
