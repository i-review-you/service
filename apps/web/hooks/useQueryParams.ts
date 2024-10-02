"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQueryParams = () => {
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

  return {
    showMyReview,
    selectedCategory,
    onChangeMyReview,
    onChangeCategory,
  };
};
