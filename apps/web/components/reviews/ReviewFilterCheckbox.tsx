"use client";

import { useQueryParams } from "../../hooks/useQueryParams";

export default function ReviewFilterCheckbox() {
  const { showMyReview, onChangeMyReview } = useQueryParams();

  return (
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
  );
}
