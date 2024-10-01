"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewFilter() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const [showMyReview, setShowMyReview] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const updateQueryParams = (updatedParams: { [key: string]: any }) => {
    const newParams = new URLSearchParams(currentSearchParams as any);

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value === undefined || value === "") {
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
    updateQueryParams({ categoryId: selectedValue });
  };

  useEffect(() => {
    setShowMyReview(Boolean(currentSearchParams.get("myReview")));
    setSelectedCategory(currentSearchParams.get("categoryId") || "");
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
          <option value={""}>전체</option>
          <option value={"1"}>카테고리1</option>
          <option value={"2"}>카테고리2</option>
          <option value={"3"}>카테고리3</option>
        </select>
      </div>
    </div>
  );
}
